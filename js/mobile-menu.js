export const MobileMenu = (() => {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("navbar");

  if (!btn || !nav) {
    throw new Error("Mobile menu: required DOM elements not found");
  }

  const CLOSING_CLASS = "closing-class";

  const isOpen = () => !nav.classList.contains(CLOSING_CLASS);

  const open = () => {
    nav.classList.remove(CLOSING_CLASS);
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    nav.classList.add(CLOSING_CLASS);
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  const toggle = () => {
    if (isOpen()) close();
    else open();
  };

  const handleButtonClick = () => toggle();

  const handleNavClick = (event) => {
    const link = event.target.closest("a[href]");
    if (link) {
      close();
      event.stopPropagation();
    }
  };

  const handleKeydown = (event) => {
    if (event.key == "Escape" && isOpen()) {
      close();
      btn.focus();
    }
  };

  const init = () => {
    btn.addEventListener("click", handleButtonClick);
    nav.addEventListener("click", handleNavClick);
    document.addEventListener("keydown", handleKeydown);

    btn.setAttribute("aria-expanded", isOpen() ? "true" : "false");
    btn.setAttribute("aria-label", "Toggle navigation menu");
    nav.setAttribute("role", "navigation");

    console.log("MobileMenu initialized");
  };

  return {
    init,
  };
})();
