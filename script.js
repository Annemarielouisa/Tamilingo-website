// ================= SETTINGS =================
// Put your email here to open the visitor's email app with the feedback filled in.
// Leave it empty ("") to only save feedback in this browser.
const FEEDBACK_EMAIL = "";

// ================= STATE =================
let setName = "vowels";
let subName = "all";
let mode = "cards";
let index = 0;       // flashcard position (always in order)
let quizPos = 0;     // quiz position (also in order)
let score = 0;
let asked = 0;
let quizItem = null;
let currentUser = null;
let authMode = "login";

const $ = (sel) => document.querySelector(sel);

// ================= HELPERS =================
function currentSet() {
  const data = content[setName];
  if (Array.isArray(data)) return data;
  if (subName !== "all" && data[subName]) return data[subName];
  return Object.values(data).flat();   // "All" keeps the original order
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

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function setTamilText(el, text) {
  el.textContent = text;
  el.classList.toggle("long", text.length > 10);
}

// ================= STORAGE (browser only) =================
function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v === null ? fallback : v;
  } catch (e) {
    return fallback;
  }
}

function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

function progressKey() { return "tamilProgress_" + (currentUser || "guest"); }

function saveProgress() {
  write(progressKey(), { setName, subName, score, asked });
}

function loadProgress() {
  setName = "vowels"; subName = "all"; score = 0; asked = 0;
  const saved = read(progressKey(), null);
  if (saved) {
    score = Number(saved.score) || 0;
    asked = Number(saved.asked) || 0;
    if (content[saved.setName]) {
      setName = saved.setName;
      const data = content[setName];
      if (!Array.isArray(data) && data[saved.subName]) subName = saved.subName;
    }
  }
}

// ================= PAGES =================
document.querySelectorAll("#pages button").forEach((btn) => {
  btn.addEventListener("click", () => {
    setActive("#pages", btn);
    ["learn", "account", "feedback"].forEach((p) => {
      $("#page-" + p).hidden = btn.dataset.page !== p;
    });
  });
});

// ================= SUB-TOPICS =================
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

// ================= FLASHCARDS =================
function showCard() {
  const set = currentSet();
  const item = set[index];
  setTamilText($("#tamil"), item.tamil);
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

// ================= QUIZ =================
function newQuestion() {
  const set = currentSet();
  quizItem = set[quizPos % set.length];   // questions follow the order
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

// ================= TOPICS & MODES =================
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

// ================= SIGN UP / LOG IN =================
// NOTE: front-end only demo. Accounts live in this browser's localStorage,
// so they do not sync between devices and are not truly secure.
async function hashPw(text) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    let h = 0;
    for (const c of text) h = (h * 31 + c.charCodeAt(0)) | 0;
    return "x" + h;
  }
}

function showAuthMsg(text, type) {
  const m = $("#auth-msg");
  m.textContent = text;
  m.className = "msg " + (type || "");
}

document.querySelectorAll("#auth-tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    authMode = btn.dataset.auth;
    setActive("#auth-tabs", btn);
    $("#confirm-wrap").hidden = authMode !== "signup";
    $("#confirm").required = authMode === "signup";
    $("#password").autocomplete = authMode === "signup" ? "new-password" : "current-password";
    $("#auth-submit").textContent = authMode === "signup" ? "Create account" : "Log in";
    showAuthMsg("");
  });
});

$("#auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const u = $("#username").value.trim().toLowerCase();
  const p = $("#password").value;
  const users = read("tamilUsers", {});

  if (u.length < 3) return showAuthMsg("Username needs at least 3 characters.", "error");
  if (p.length < 6) return showAuthMsg("Password needs at least 6 characters.", "error");

  if (authMode === "signup") {
    if (p !== $("#confirm").value) return showAuthMsg("Passwords don't match.", "error");
    if (users[u]) return showAuthMsg("That username is taken. Try another or log in.", "error");
    users[u] = { hash: await hashPw(u + p) };
    write("tamilUsers", users);
  } else {
    if (!users[u] || users[u].hash !== await hashPw(u + p)) {
      return showAuthMsg("Wrong username or password.", "error");
    }
  }
  $("#auth-form").reset();
  showAuthMsg("");
  logIn(u);
});

function logIn(u) {
  saveProgress();                 // save guest work first
  currentUser = u;
  write("tamilSession", u);
  applyUser();
}

$("#logout").addEventListener("click", () => {
  saveProgress();
  currentUser = null;
  try { localStorage.removeItem("tamilSession"); } catch (e) {}
  applyUser();
});

function applyUser() {
  loadProgress();
  $("#auth-out").hidden = !!currentUser;
  $("#auth-in").hidden = !currentUser;
  $("#welcome").textContent = currentUser ? "Welcome, " + currentUser + "!" : "";
  $("#greeting").textContent = currentUser
    ? "Welcome back, " + currentUser + "."
    : "Pick a topic, then flip cards or take a quiz.";
  $("#fb-name").value = currentUser || "";

  index = 0; quizPos = 0; quizItem = null;
  setActive("#topics", $('#topics button[data-set="' + setName + '"]'));
  renderSubtopics();
  updateScore();
  showCard();
  if (mode === "quiz") newQuestion();
}

// ================= FEEDBACK FORM =================
$("#feedback-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    name: $("#fb-name").value.trim(),
    email: $("#fb-email").value.trim(),
    rating: $("#fb-rating").value,
    message: $("#fb-message").value.trim(),
    user: currentUser,
    date: new Date().toISOString()
  };
  if (!entry.message) return;

  const all = read("tamilFeedback", []);
  all.push(entry);
  write("tamilFeedback", all);

  const m = $("#fb-msg");
  m.textContent = "Thank you! Your feedback was saved.";
  m.className = "msg ok";
  $("#fb-message").value = "";

  if (FEEDBACK_EMAIL) {
    const body = "Name: " + entry.name + "\nEmail: " + entry.email +
                 "\nRating: " + entry.rating + "/5\n\n" + entry.message;
    window.location.href = "mailto:" + FEEDBACK_EMAIL +
      "?subject=" + encodeURIComponent("Learn Tamil feedback") +
      "&body=" + encodeURIComponent(body);
  }
});

// ================= START =================
currentUser = read("tamilSession", null);
applyUser();