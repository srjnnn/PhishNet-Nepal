import { loadTemplate } from "../../../utils/loadtemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";
import Common from "../../../utils/common.js";

class pannel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/pages/pannel.html");
    this.render();
    await this.fetchAndAppendPannelData();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

async fetchAndAppendPannelData() {
  const container = this.shadowRoot.querySelector(".pannel-contents");
  if (!container) return;

  // Show loader
  const loader = document.createElement("my-loading");
  loader.data = "Fetching pannel data...";
  container.appendChild(loader);

  try {
    const response = await apiRequest(apiRoutes.pannelCards.data, "GET");
    loader.remove();

    if (response && Array.isArray(response.data) && response.data.length > 0) {
      response.data.forEach(item => {
        const card = document.createElement("pannel-card");
        card.data = {
          heading: item.heading || "N/A",
          platform: item.platform || "Unknown",
          date: item.date || "",
          link: item.link
        };
        // Add click event for redirection
        card.addEventListener("click", () => {
          if (item.link) {
            window.open(item.link, "_blank");
          }
        });
        container.appendChild(card);
      });
    } else {
      Common.addErrorPopup(this.shadowRoot, "No data found.");
      container.innerHTML = "<div>No data found.</div>";
    }
  } catch (err) {
    loader.remove();
    Common.addErrorPopup(this.shadowRoot, "Failed to load data.");
    container.innerHTML = "<div>Failed to load data.</div>";
  }
}
addEventListeners() {
  const addBtn = this.shadowRoot.querySelector('.add-blog-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      // Remove any existing addPannels form
      this.shadowRoot.querySelectorAll("add-pannels").forEach(el => el.remove());
      const addBlog = document.createElement("add-pannels");
      addBlog.addEventListener("blog-added", () => this.connectedCallback());
      this.shadowRoot.append(addBlog);
    });
  }
}

}

const Pannel = customElements.define("my-pannel", pannel);
export default pannel;