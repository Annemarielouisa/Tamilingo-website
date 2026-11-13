(function () {
  const replies = [
    [/\b(hi|hello|hey|vanakkam)\b/, "Vanakkam! Ask me about vowels, consonants, numbers, words or sentences."],
    [/vowel/,       "Tamil has 12 vowels. Open the Dashboard and pick Vowels."],
    [/consonant/,   "Tamil has 18 consonants. Pick Consonants on the Dashboard."],
    [/number/,      "Learn Tamil numbers 1 to 10 under Numbers."],
    [/sentence/,    "Sentences has four groups: Greetings, Family, Daily and Questions."],
    [/word/,        "Words are grouped: Relations, Animals, Food, Greetings, Home and Nature."],
    [/quiz|test/,   "Switch to Quiz mode on the Dashboard. Questions follow the order of the cards."],
    [/sign ?in|log ?in/, "Use the Sign in page with your email and password."],
    [/sign ?up|register|account/, "Create an account on the Sign up or Register page."],
    [/theme|dark|light/, "Use the Dark/Light button in the header. I remember your choice."],
    [/calculator|calc/,  "The calculator is on the Dashboard, in the right column."],
    [/thank/,       "You're welcome! Nandri!"]
  ];

  function reply(text) {
    const t = text.toLowerCase();
    for (const [rx, answer] of replies) if (rx.test(t)) return answer;
    return "I didn't get that. Try: vowels, consonants, numbers, words, sentences, quiz, theme or sign in.";
  }

  const fab = document.createElement("button");
  fab.id = "chat-fab";
  fab.type = "button";
  fab.textContent = "Chat";
  fab.setAttribute("aria-label", "Open chat");

  const panel = document.createElement("div");
  panel.id = "chat-panel";
  panel.hidden = true;
  panel.innerHTML =
    '<div id="chat-head"><span>Tamil helper</span><button type="button" id="chat-close" aria-label="Close chat">X</button></div>' +
    '<div id="chat-log" aria-live="polite"></div>' +
    '<form id="chat-form"><input id="chat-input" placeholder="Type a message" autocomplete="off"><button type="submit">Send</button></form>';

  document.body.append(panel, fab);

  const log = panel.querySelector("#chat-log");
  const input = panel.querySelector("#chat-input");

  function add(cls, text) {
    const d = document.createElement("div");
    d.className = cls;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }

  add("bot-msg", "Vanakkam! How can I help you learn Tamil?");

  fab.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) input.focus();
  });
  panel.querySelector("#chat-close").addEventListener("click", () => (panel.hidden = true));

  panel.querySelector("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    add("user-msg", v);
    input.value = "";
    setTimeout(() => add("bot-msg", reply(v)), 400);
  });
})();