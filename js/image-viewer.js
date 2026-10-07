export const imageViewer = (() => {
  const showImageViewer = (imageSrc, imageAlt) => {
    if (document.querySelector(".image-viewer")) return;

    const html = `
        <div
          class="image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="${imageAlt || "Image preview"}"
        >
          <button
            type="button"
            class="image-viewer-close-btn"
            aria-label="Close image view"
          >
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
          <img alt="${imageAlt}" src="${imageSrc}" />
        </div>`;

    document.body.insertAdjacentHTML("beforeend", html);

    document.body.classList.add("no-scroll");

    const viewer = document.querySelector(".image-viewer");
    const closeBtn = viewer.querySelector(".image-viewer-close-btn");

    // Close Handler & Cleanup
    const closeViewer = () => {
      document.body.classList.remove("no-scroll");

      viewer.remove();
      document.removeEventListener("keydown", handleKeyDown);
    };

    // Close on Escape Key
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeViewer();
    };

    // Event Listeners for closing
    closeBtn.addEventListener("click", closeViewer);
    viewer.addEventListener("click", (e) => {
      if (e.target === viewer) closeViewer(); // Close when clicking backdrop
    });
    document.addEventListener("keydown", handleKeyDown);
  };

  const init = () => {
    const imagesBtns = document.querySelectorAll(".project-image-wrapper");

    imagesBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const img = btn.querySelector(".project-image-wrapper img");
        const src = img?.src || btn.dataset.src;
        const alt = img?.alt || btn.dataset.alt || "";

        if (src) showImageViewer(src, alt);
      });
    });

    console.log("Image viewer initialized");
  };

  return { init };
})();
