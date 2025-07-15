import { loadTemplate } from "../../../utils/loadtemplate.js";
import Common from "../../../utils/common.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";

class clientsDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
    this.data = null;
  }
 set data(value) {
  this._data = value;
  if (this.shadowRoot) {
    // Pre-fill form fields if data exists
    const name = this.shadowRoot.querySelector("#client-name");
    const email = this.shadowRoot.querySelector("#client-email");
    const contact = this.shadowRoot.querySelector("#client-contact");
    if (name && value.name) name.value = value.name;
    if (email && value.email) email.value = value.email;
    if (contact && value.contact) contact.value = value.contact;
  }
}
get data() {
  return this._data;
}
  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/views/addClientsDetails.html");
    this.render();
    if (this.data) this.data = this.data; // triggers setter to pre-fill
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
    const form = this.shadowRoot.querySelector(".add-client-form");
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

      const name = this.shadowRoot.querySelector("#client-name").value.trim();
      const email = this.shadowRoot.querySelector("#client-email").value.trim();
      const contact = this.shadowRoot.querySelector("#client-contact").value.trim();

      // Basic validation
      if (!name || !email || !contact) {
        Common.addErrorPopup(this.shadowRoot, "All fields are required.");
        return;
      }

      // Show loading
      const loader = Common.loadingTemplate("Saving client details...");
      this.shadowRoot.append(loader);

      try {
        const payload = { name, email, contact };
        let response;
        // Logic to identify whether edit or new
        if (this.data && this.data.id) {
      // Edit mode
      response = await apiRequest(`${apiRoutes.users.data}/${this.data.id}`, "PUT", payload);
    } else {
      // Add mode
      response = await apiRequest(apiRoutes.users.data, "POST", payload);
    }


        loader.remove();

        if (response && response.status === 200) {
          Common.addSuccessPopup(this.shadowRoot, "Client details saved!");
          form.reset();
          setTimeout(() => {this.dispatchEvent(new CustomEvent("client-added", { bubbles: true }));
          this.remove();       
        }, 3000);
          // trigger the connected callback of the parent page
        } else {
          Common.addErrorPopup(this.shadowRoot,"Failed to save client.");
        }
      } catch (err) {
        loader.remove();
        Common.addErrorPopup(this.shadowRoot,"Failed to save client.");
      }
    });
  }
  addDragListeners() {
  const container = this.shadowRoot.querySelector('.add-client-container');
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
    // Move the container
    container.style.position = "fixed";
    container.style.left = `${e.clientX - offsetX}px`;
    container.style.top = `${e.clientY - offsetY}px`;
    container.style.margin = "0";
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
}
}

const ClientsDetails = customElements.define("clients-details", clientsDetails);
export default ClientsDetails;