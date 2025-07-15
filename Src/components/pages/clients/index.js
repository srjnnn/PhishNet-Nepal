import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";
import Common from "../../../utils/common.js"; 

class clients extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
    this.data = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/pages/Clients.html");
    this.render();
    this.fetchAndAppendClients();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  async fetchAndAppendClients() {
    // Show loading spinner
    const loader = document.createElement("my-loading");
    this.shadowRoot.append(loader);

    try {
      const response = await apiRequest(apiRoutes.clients.data, "GET");

      // Remove loader
      loader.remove();

      if (response?.data && Array.isArray(response.data)) {
        this.data = response.data;
        this.populateTable(this.data);
      } else {
        Common.addErrorPopup(this.shadowRoot, "Failed to load client data.");
        console.warn("Invalid data format from API.");
      }
    } catch (error) {
      loader.remove();
      Common.addErrorPopup(this.shadowRoot, "Something went wrong ");
      console.error("Fetch error:", error);
    }
  }

  populateTable(data) {
    const tbody = this.shadowRoot.querySelector("#contact-body");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((client, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}.</td>
        <td>${client.name || "N/A"}</td>
        <td>${client.email || "N/A"}</td>
        <td>${client.contact || "N/A"}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

customElements.define("my-clients", clients);
export default clients;

