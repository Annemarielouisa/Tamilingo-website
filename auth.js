// Front-end only demo: accounts are saved in this browser's localStorage.
// They do not sync between devices and are not truly secure.

function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v === null ? fallback : v;
  } catch (e) { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

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

function getSession() { return read("tamilSession", null); }   // the signed-in email

function signOut() {
  try { localStorage.removeItem("tamilSession"); } catch (e) {}
  location.href = "signin.html";
}

function showAlert(msg, type) {
  const a = document.getElementById("alert");
  if (!a) return;
  a.textContent = msg;
  a.className = "alert " + (type || "");
  a.hidden = false;
}

async function createUser(profile, password) {
  const users = read("tamilUsers", {});
  const key = profile.email.toLowerCase();
  if (users[key]) return false;
  users[key] = { ...profile, email: key, hash: await hashPw(key + password) };
  write("tamilUsers", users);
  return true;
}

function finishSignup(ok) {
  if (!ok) return showAlert("That email is already registered. Please sign in.");
  showAlert("Account created! Taking you to sign in...", "ok");
  setTimeout(() => (location.href = "signin.html"), 1200);
}

// ---------- Register page (FR-02) ----------
const regForm = document.getElementById("register-form");
if (regForm) {
  setupValidation(regForm, ["fullName", "empId", "email", "mobile", "dept", "password", "confirm"], async () => {
    const f = regForm.elements;
    finishSignup(await createUser({
      name: f.fullName.value.trim(), empId: f.empId.value.trim(),
      mobile: f.mobile.value.trim(), dept: f.dept.value, email: f.email.value.trim()
    }, f.password.value));
  });
}

// ---------- Sign-up page (FR-03) ----------
const upForm = document.getElementById("signup-form");
if (upForm) {
  setupValidation(upForm, ["email", "password", "terms"], async () => {
    const f = upForm.elements;
    const email = f.email.value.trim();
    finishSignup(await createUser({ name: email.split("@")[0], email }, f.password.value));
  });
}

// ---------- Sign-in page (FR-04) ----------
const inForm = document.getElementById("signin-form");
if (inForm) {
  const pw = inForm.elements.password;
  const eye = document.getElementById("toggle-pw");
  eye.addEventListener("click", () => {
    const show = pw.type === "password";
    pw.type = show ? "text" : "password";
    eye.textContent = show ? "Hide" : "Show";
    eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });

  inForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = inForm.elements.email.value.trim().toLowerCase();
    if (!RX.email.test(email) || !RX.pw.test(pw.value)) {
      return showAlert("Enter a valid email and a password with 8+ characters, upper and lower case, a number and a symbol.");
    }
    const user = read("tamilUsers", {})[email];
    if (!user || user.hash !== await hashPw(email + pw.value)) {
      return showAlert("Wrong email or password.");
    }
    write("tamilSession", email);
    location.href = "home.html";
  });
}