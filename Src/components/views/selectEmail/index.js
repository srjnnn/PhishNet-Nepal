import { loadTemplate } from "../../../utils/loadtemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";
import Common from "../../../utils/common.js";

class selectEmail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
    this.selectedEmails = [];
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/views/selectEmail.html");
    this.render();
    await this.fetchEmails();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  async fetchEmails() {
    const list = this.shadowRoot.querySelector(".email-list");
    if (!list) return;
    // Show loader
    const loader = document.createElement("my-loading");
    loader.data = "Fetching emails...";
    this.shadowRoot.append(loader);

    try {
      const response = await apiRequest(apiRoutes.users.data, "GET");
      loader.remove();
      if (response && Array.isArray(response.data)) {
        response.data.forEach(user => {
          const div = document.createElement("div");
          div.innerHTML = `
            <label>
              <input type="checkbox" value="${user.email}">
              ${user.email}
            </label>
          `;
          list.appendChild(div);
        });
      } else {
        Common.addErrorPopup(this.shadowRoot, "No Emails Found");
        list.innerHTML = "<div>No emails found.</div>";
      }
    } catch (err) {
      loader.remove();
      Common.addErrorPopup(this.shadowRoot, "No Emails Found");

      list.innerHTML = "<div>Failed to load emails.</div>";
    }
  }

  addEventListeners() {
    // Cancel
    const cancelBtn = this.shadowRoot.querySelector(".cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.remove());
    }

    // Confirm
    const confirmBtn = this.shadowRoot.querySelector(".confirm-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        const checked = Array.from(this.shadowRoot.querySelectorAll('input[type="checkbox"]:checked'))
          .map(cb => cb.value);
        if (checked.length === 0) {
          Common.addErrorPopup(this.shadowRoot, "Select at least one email.");
          return;
        }
        // Dispatch event with selected emails
        this.dispatchEvent(new CustomEvent("emails-selected", {
          detail: { emails: checked },
          bubbles: true
        }));
        this.remove();
      });
    }
  }
}

const SelectEmail = customElements.define("select-email", selectEmail);
export default SelectEmail;