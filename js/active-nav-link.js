export const activeNavLink = (() => {
  // DOM Elements
  const navLinks = document.querySelectorAll("header .nav-link");
  const sections = document.querySelectorAll("section");

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") == `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, options);

  const init = () => {
    sections.forEach((section) => {
      observer.observe(section);
    });
  };

  return { init };
})();
