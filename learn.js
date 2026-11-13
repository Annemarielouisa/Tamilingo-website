// ---------- State ----------
let setName = "vowels";
let subName = "all";
let mode = "cards";
let index = 0;        // flashcard position (always in order)
let quizPos = 0;      // quiz question position (also in order)
let score = 0;
let asked = 0;
let quizItem = null;

const $ = (sel) => document.querySelector(sel);
const user = getSession();   // email, or null for a guest

// ---------- Helpers ----------
function currentSet() {
  const data = content[setName];
  if (Array.isArray(data)) return data;
  if (subName !== "all" && data[subName]) return data[subName];
  return Object.values(data).flat();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setActive(groupSelector, button) {
  document.querySelectorAll(groupSelector + " button").forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function setTamilText(el, text) {
  el.textContent = text;
  el.classList.toggle("long", text.length > 10);
}

// ---------- Saved progress (per user) ----------
const progressKey = () => "tamilProgress_" + (user || "guest");

function saveProgress() { write(progressKey(), { setName, subName, score, asked }); }

function loadProgress() {
  const saved = read(progressKey(), null);
  if (!saved) return;
  score = Number(saved.score) || 0;
  asked = Number(saved.asked) || 0;
  if (content[saved.setName]) {
    setName = saved.setName;
    const data = content[setName];
    if (!Array.isArray(data) && data[saved.subName]) subName = saved.subName;
  }
}

// ---------- Header: user label + hamburger ----------
(function () {
  const link = $("#auth-link");
  if (user) {
    const profile = read("tamilUsers", {})[user];
    $("#user-label").textContent = "Hi, " + (profile ? profile.name : user);
    link.textContent = "Sign out";
    link.href = "#";
    link.addEventListener("click", (e) => { e.preventDefault(); signOut(); });
  }
  const menu = $("#menu-btn");
  menu.addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
})();

// ---------- Sub-topics ----------
function renderSubtopics() {
  const nav = $("#subtopics");
  const data = content[setName];
  nav.innerHTML = "";
  if (Array.isArray(data)) { nav.hidden = true; return; }

  nav.hidden = false;
  ["all", ...Object.keys(data)].forEach((key) => {
    const btn = document.createElement("button");
    btn.textContent = cap(key);
    if (key === subName) btn.classList.add("active");
    btn.addEventListener("click", () => {
      subName = key;
      index = 0; quizPos = 0; quizItem = null;
      setActive("#subtopics", btn);
      showCard();
      if (mode === "quiz") newQuestion();
      saveProgress();
    });
    nav.appendChild(btn);
  });
}

// ---------- Flashcards ----------
function showCard() {
  const set = currentSet();
  setTamilText($("#tamil"), set[index].tamil);
  $("#answer").textContent = "";
  $("#counter").textContent = "Card " + (index + 1) + " of " + set.length;
}

$("#flip").addEventListener("click", () => {
  const item = currentSet()[index];
  $("#answer").textContent = item.sound + "  -  " + item.answer;
});
$("#next").addEventListener("click", () => {
  index = (index + 1) % currentSet().length;
  showCard();
});
$("#prev").addEventListener("click", () => {
  const len = currentSet().length;
  index = (index - 1 + len) % len;
  showCard();
});

// ---------- Quiz ----------
function newQuestion() {
  const set = currentSet();
  quizItem = set[quizPos % set.length];      // questions follow the order
  quizPos++;

  const wrong = shuffle(set.filter((i) => i.answer !== quizItem.answer)).slice(0, 3);
  const choices = shuffle([quizItem, ...wrong]);   // only the answer buttons are shuffled

  setTamilText($("#quiz-tamil"), quizItem.tamil);
  $("#feedback").textContent = "";
  $("#quiz-next").hidden = true;

  const box = $("#options");
  box.innerHTML = "";
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice.answer;
    btn.addEventListener("click", () => checkAnswer(btn, choice));
    box.appendChild(btn);
  });
}

function checkAnswer(btn, choice) {
  asked++;
  if (choice.answer === quizItem.answer) {
    score++;
    btn.classList.add("right");
    $("#feedback").textContent = "Correct!";
  } else {
    btn.classList.add("wrong");
    $("#feedback").textContent = "Not quite. It was: " + quizItem.answer;
    document.querySelectorAll("#options button").forEach((b) => {
      if (b.textContent === quizItem.answer) b.classList.add("right");
    });
  }
  document.querySelectorAll("#options button").forEach((b) => (b.disabled = true));
  $("#quiz-next").hidden = false;
  updateScore();
  saveProgress();
}

function updateScore() {
  $("#score").textContent = "Score: " + score + " / " + asked;
  $("#stats").textContent = "Quiz score: " + score + " / " + asked;
}

$("#quiz-next").addEventListener("click", newQuestion);
$("#reset").addEventListener("click", () => {
  score = 0; asked = 0;
  updateScore();
  saveProgress();
});

// ---------- Topics and modes ----------
document.querySelectorAll("#topics button").forEach((btn) => {
  btn.addEventListener("click", () => {
    setName = btn.dataset.set;
    subName = "all";
    index = 0; quizPos = 0; quizItem = null;
    setActive("#topics", btn);
    renderSubtopics();
    showCard();
    if (mode === "quiz") newQuestion();
    saveProgress();
    $("#sidebar").classList.remove("open");   // close the mobile drawer
    $("#menu-btn").setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("#modes button").forEach((btn) => {
  btn.addEventListener("click", () => {
    mode = btn.dataset.mode;
    setActive("#modes", btn);
    $("#cards-view").hidden = mode !== "cards";
    $("#quiz-view").hidden = mode !== "quiz";
    if (mode === "quiz") { quizPos = 0; newQuestion(); }
  });
});

// ---------- Start ----------
loadProgress();
setActive("#topics", $('#topics button[data-set="' + setName + '"]'));
renderSubtopics();
updateScore();
showCard();