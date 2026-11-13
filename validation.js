// ---------- Regex rules from the checklist ----------
const RX = {
  name:   /^[a-zA-Z\s]{2,50}$/,
  empId:  /^[A-Z0-9]{6,12}$/i,
  email:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobile: /^[6-9]\d{9}$/,
  pw:     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
};

// Each rule: ok(element, form) -> true/false, plus the error message
const RULES = {
  fullName: { ok: (el) => RX.name.test(el.value.trim()),   msg: "Use letters and spaces only (2-50 characters)." },
  empId:    { ok: (el) => RX.empId.test(el.value.trim()),  msg: "Enter 6-12 letters or digits." },
  email:    { ok: (el) => RX.email.test(el.value.trim()),  msg: "Enter a valid email address." },
  mobile:   { ok: (el) => RX.mobile.test(el.value.trim()), msg: "Enter 10 digits starting with 6, 7, 8 or 9." },
  dept:     { ok: (el) => el.value !== "",                 msg: "Please select your division." },
  password: { ok: (el) => RX.pw.test(el.value),            msg: "Min 8 characters with uppercase, lowercase, number and one of @$!%*?&." },
  confirm:  { ok: (el, form) => el.value !== "" && el.value === form.elements.password.value, msg: "Passwords do not match." },
  terms:    { ok: (el) => el.checked,                      msg: "You must accept the Terms of Service." }
};

// Validates on blur, while typing (after first visit) and on submit.
// The submit button stays disabled until every field is valid.
function setupValidation(form, names, onValid) {
  const btn = form.querySelector('button[type="submit"]');
  const touched = {};

  function spanFor(el) {
    const label = el.closest("label");
    let span = label.querySelector(".error-msg");
    if (!span) {
      span = document.createElement("span");
      span.className = "error-msg";
      label.appendChild(span);
    }
    return span;
  }

  function check(name, show) {
    const el = form.elements[name];
    const rule = RULES[name];
    const ok = rule.ok(el, form);
    if (show) {
      spanFor(el).textContent = ok ? "" : rule.msg;
      el.classList.toggle("invalid", !ok);
      el.classList.toggle("valid", ok);
    }
    return ok;
  }

  function updateButton() {
    btn.disabled = !names.every((n) => check(n, false));
  }

  names.forEach((name) => {
    const el = form.elements[name];
    spanFor(el);
    const live = () => {
      if (touched[name]) check(name, true);
      if (name === "password" && touched.confirm) check("confirm", true);
      updateButton();
    };
    el.addEventListener("blur", () => { touched[name] = true; check(name, true); updateButton(); });
    el.addEventListener("input", live);
    el.addEventListener("change", () => { touched[name] = true; live(); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allOk = names.map((n) => check(n, true)).every(Boolean);
    if (allOk) onValid();
  });

  updateButton();
}