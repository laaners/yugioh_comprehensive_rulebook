class SectionHeader extends HTMLElement {
  static get observedAttributes() {
    return ["level"];
  }

  constructor() {
    super();
    this._level = 1; // Default level
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "level") {
      this._level = newValue;
      this.render();
    }
  }

  render() {
    const id = this.getAttribute("id");
    const level = this.getAttribute("level");
    this.innerHTML = `
        <div style="display:flex; align-items: center; margin: 0; margin-top: 1.5rem;">
            <h${level} style="margin: 0;">${this.textContent}</h${level}>
            <a href="#${id}" style="margin-left: 1rem;">
                <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>
            </a>
        </div>
        <hr>
    `;
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Attach event listener to <a> tag
    const link = this.querySelector("a");
    if (link) {
      link.addEventListener("click", (event) => {
        const href = event.currentTarget.getAttribute("href");
        const fullUrl = `${window.location.origin}${window.location.pathname}${href}`;
        navigator.clipboard
          .writeText(fullUrl)
          .then(() => {
            console.log("Link copied to clipboard");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      });
    }
  }
}

customElements.define("section-header", SectionHeader);
