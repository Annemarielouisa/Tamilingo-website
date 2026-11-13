(function () {
  const root = document.getElementById("calculator");
  if (!root) return;

  root.innerHTML = '<div class="calc-display" id="calc-out" aria-live="polite">0</div><div class="calc-grid" id="calc-keys"></div>';
  const out = root.querySelector("#calc-out");
  const grid = root.querySelector("#calc-keys");

  let cur = "0", prev = null, op = null, fresh = false;

  const keys = ["C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
  keys.forEach((k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = k;
    if (k === "C") b.className = "wide";
    b.addEventListener("click", () => press(k));
    grid.appendChild(b);
  });

  function compute() {
    const a = prev, b = parseFloat(cur);
    let r;
    if (op === "+") r = a + b;
    else if (op === "-") r = a - b;
    else if (op === "*") r = a * b;
    else r = b === 0 ? NaN : a / b;            // zero-division protection
    cur = Number.isFinite(r) ? String(+r.toFixed(8)) : "Error";
  }

  function press(k) {
    if (cur === "Error" && k !== "C") { cur = "0"; prev = null; op = null; fresh = false; }

    if (k === "C") {
      cur = "0"; prev = null; op = null; fresh = false;
    } else if (/\d/.test(k)) {
      cur = (cur === "0" || fresh) ? k : cur + k;
      fresh = false;
    } else if (k === ".") {
      if (fresh) { cur = "0."; fresh = false; }
      else if (!cur.includes(".")) cur += ".";
    } else if (k === "=") {
      if (op !== null && !fresh) compute();
      prev = null; op = null; fresh = true;
    } else {                                    // + - * /
      if (op !== null && !fresh) compute();
      if (cur === "Error") { prev = null; op = null; }
      else { prev = parseFloat(cur); op = k; }
      fresh = true;
    }
    out.textContent = cur;
  }
})();