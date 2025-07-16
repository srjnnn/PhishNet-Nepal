import { loadTemplate } from "../../../utils/loadtemplate.js";
import Common from "../../../utils/common.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";

class addPannels extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/views/addPannels.html");
    this.render();
    this.addEventListeners();
    this.addDragListeners();

    // Show drag hint for 2.5 seconds
    const hint = this.shadowRoot.querySelector("#drag-hint");
    if (hint) {
      setTimeout(() => hint.classList.add("hide"), 2500);
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector(".add-pannel-form");
    if (!form) return;

    // Cancel button logic
    const cancelBtn = this.shadowRoot.querySelector(".cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.remove();
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const heading = this.shadowRoot.querySelector("#blog-heading").value.trim();
      const platform = this.shadowRoot.querySelector("#blog-platform").value.trim();
      const link = this.shadowRoot.querySelector("#blog-link").value.trim();

      if (!heading || !platform || !link) {
        Common.addErrorPopup(this.shadowRoot, "All fields are required.");
        return;
      }

      // Show loading
      const loader = Common.loadingTemplate("Saving blog...");
      this.shadowRoot.append(loader);

      try {
        const payload = { heading, platform, link };
        const response = await apiRequest(apiRoutes.pannelCards.data, "POST", payload);

        loader.remove();

        if (response && response.status === 200) {
          Common.addSuccessPopup(this.shadowRoot, "Blog saved!");
          form.reset();
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("blog-added", { bubbles: true }));
            this.remove();
          }, 1200);
        } else {
          Common.addErrorPopup(this.shadowRoot,"Failed to save blog.");
        }
      } catch (err) {
        loader.remove();
        Common.addErrorPopup(this.shadowRoot,"Failed to save blog.");
      }
    });
  }

  addDragListeners() {
    const container = this.shadowRoot.querySelector('.add-pannel-container');
    const handle = this.shadowRoot.querySelector('#drag-handle');
    if (!container || !handle) return;

    let isDragging = false, offsetX = 0, offsetY = 0;

    handle.style.cursor = "move";

    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      container.style.position = "fixed";
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
      container.style.margin = "0";
      container.style.transform = "none";
      container.style.zIndex = "1000";
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }
}

const AddPannels = customElements.define("add-pannels", addPannels);
export default AddPannels;