import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";


class draftEmail extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null;
    }
    
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/DraftEmail.html");
        this.render();
        this.addEventListeners();

    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
    }
  addEventListeners() {
    const sendBtn = this.shadowRoot.querySelector("button[type='submit']");
    if (!sendBtn) return;

    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Get subject and body
      const subject = this.shadowRoot.querySelector('input[type="text"]').value.trim();
      const body = this.shadowRoot.querySelector('textarea').value.trim();
      if (!subject || !body) {
        Common.addErrorPopup(this.shadowRoot, "Subject or body is required")
        return;
      }
      // Show selectEmail popup
      const popup = document.createElement("select-email");
      popup.addEventListener("emails-selected", async (event) => {
        const emails = event.detail.emails;
        // Send email to backend
        const loader = document.createElement("my-loading");
        loader.data = "Sending emails...";
        this.shadowRoot.append(loader);
        try {
          const payload = { subject, body, emails };
          console.log(payload)
          const response = await apiRequest(apiRoutes.sendEmail.data, "POST", payload);
          loader.remove();
          if (response && response.status === 200) {
            Common.addSuccessPopup(this.shadowRoot,"Email Sent Successfully")
            setTimeout(() => {
                this.connectedCallback();
            }, 3000);
          } else {
            alert("Failed to send emails.");
            Common.addErrorPopup(this.shadowRoot, "Failed to send email")
          }
        } catch (err) {
          loader.remove();
            Common.addErrorPopup(this.shadowRoot, "Failed to send email")
        }
      });
      document.body.appendChild(popup);
    });
  }
}
const DraftEmail = customElements.define("draft-email",draftEmail);
export default DraftEmail;