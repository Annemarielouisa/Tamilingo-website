(function () {
  const KEY = "tamilTheme";
  let theme = null;
  try { theme = localStorage.getItem(KEY); } catch (e) {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;   // applied before the page paints

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const label = () => (btn.textContent = theme === "dark" ? "Light" : "Dark");
    label();
    btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem(KEY, theme); } catch (e) {}
      label();
    });
  });
})();