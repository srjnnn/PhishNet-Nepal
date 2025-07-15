import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";

class phishingLogs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
    this.data = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/pages/attemptsLogs.html");
    this.render();
    this.fetchAndAppendCards(); 
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  async fetchAndAppendCards() {
    try {
        // make the loading component till
        const loading = document.createElement("my-loading");
        this.shadowRoot.append(loading);
        
      const response = await apiRequest(apiRoutes.attemptsLogs.data, "GET");
         this.loadingRemove();
      if (response?.data && Array.isArray(response.data)) {
        this.data = response.data;

     
        this.data.forEach(log => {
          const card = document.createElement("my-card");
          card.data = {
            Platform: log.Platform || "Unknown",
            Link: log.Link || "#",
            Date: log.Date || "N/A"
          };
          this.appendCard(card);
        });
      } else {
        Common.addErrorPopup(this.shadowRoot,"Error fetching data")
        console.warn("No data received from API or wrong format");
      }
    } catch (err) {
        this.loadingRemove()
        Common.addErrorPopup(this.shadowRoot,"Error fetching data")
    }
  }

  appendCard(card) {
    const cardDiv = this.shadowRoot.querySelector(".card-wrapper");
    if (cardDiv) {
      cardDiv.appendChild(card);
    } else {
      console.warn(".card-wrapper not found in template");
    }
  }
  loadingRemove(){
 const loading = this.shadowRoot.querySelector("my-loading");
if (loading) loading.remove();
}
}

customElements.define("phishing-logs", phishingLogs);
export default phishingLogs;
