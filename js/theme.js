export const Theme = (() => {
  // DOM Elements
  const themeToggleBtn = document.querySelector("#themeToggle");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const init = () => {
    if (!themeToggleBtn) {
      throw new Error("Toggle theme button not found");
    }

    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  };

  return {
    init,
  };
})();
