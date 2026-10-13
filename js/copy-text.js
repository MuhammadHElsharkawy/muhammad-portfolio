const COPY_ICON = `
  <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`;

const CHECK_ICON = `
  <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

class CopyText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const textToCopy = this.getAttribute("text") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          max-width: 100%;
        }

        .copy-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font: inherit;
          color: #334155;
          /* Dashed underline distinguishes it from standard links */
          text-decoration: underline dashed #64748b;
          text-underline-offset: 5px;
          cursor: pointer;
          overflow-wrap: break-word;
          word-break: break-all;
          text-align: left;
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }

        .copy-trigger:hover,
        .copy-trigger:focus-visible {
          color: #2563eb;
          text-decoration-color: #2563eb;
        }

        .copy-trigger.copied {
          color: #16a34a;
          text-decoration-color: #16a34a;
        }

        .copy-icon {
          width: 0.9em;
          height: 0.9em;
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .copy-trigger:hover .copy-icon {
          opacity: 1;
        }

        /* Tooltip behavior */
        .tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background-color: #0f172a;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Show 'Click to copy' on hover/focus */
        :host(:hover) .tooltip,
        .copy-trigger:focus-visible + .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .tooltip.copied-state {
          background-color: #16a34a;
        }
      </style>

      <button type="button" class="copy-trigger" aria-label="Copy ${textToCopy} to clipboard">
        <span>${textToCopy}</span>
        <span class="icon-wrapper">${COPY_ICON}</span>
      </button>
      <div class="tooltip" role="status" aria-live="polite">Click to copy</div>
    `;

    const btn = this.shadowRoot.querySelector(".copy-trigger");
    const iconWrapper = this.shadowRoot.querySelector(".icon-wrapper");
    const tooltip = this.shadowRoot.querySelector(".tooltip");

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);

        btn.classList.add("copied");
        iconWrapper.innerHTML = CHECK_ICON;
        tooltip.textContent = "Copied!";
        tooltip.classList.add("copied-state");

        setTimeout(() => {
          btn.classList.remove("copied");
          iconWrapper.innerHTML = COPY_ICON;
          tooltip.textContent = "Click to copy";
          tooltip.classList.remove("copied-state");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    });
  }
}

customElements.define("copy-text", CopyText);
