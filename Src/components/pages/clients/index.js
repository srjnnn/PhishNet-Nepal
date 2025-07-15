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
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  async fetchAndAppendClients() {
    // Show loading spinner
    const loader = document.createElement("my-loading");
    loader.data = "Fetching clients data ......"
    this.shadowRoot.append(loader);

    try {

      const response = await apiRequest(apiRoutes.users.data, "GET");


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
        <td>
       <img src="../../Public/assets/mdi_edit.png" class="icon-button edit-icon" style="margin-right:10px; cursor:pointer;" title="Edit">
       <img src="../../Public/assets/delete.png" class="icon-button delete-icon" title="Delete" style="cursor:pointer">
       </td>

      `;
    tr.querySelector('.edit-icon').addEventListener('click', () => this.openEditClient(client));
    tr.querySelector('.delete-icon').addEventListener('click', () => this.deleteClient(client));
      tbody.appendChild(tr);
    });
  }
  addEventListeners(){
    const addButton = this.shadowRoot.querySelector('.add-button');
    addButton.addEventListener("click", ()=>{
      const addPage = document.createElement("clients-details");
      addPage.addEventListener("client-added", ()=>{
        this.fetchAndAppendClients();
      })
      this.shadowRoot.append(addPage);
    })
  }
  openEditClient(client) {
  // Remove any existing form
  this.shadowRoot.querySelectorAll("clients-details").forEach(el => el.remove());
  // Create and show the form with data
  const editForm = document.createElement("clients-details");
  editForm.data = client; // Pass client data to the form
  editForm.addEventListener("client-added", () => this.fetchAndAppendClients());
  this.shadowRoot.append(editForm);
}
async deleteClient(client) {
  if (!confirm(`Delete client "${client.name}"?`)) return;
  // Show loader if you want
  const loader = document.createElement("my-loading");
  loader.data = "Deleting client...";
  this.shadowRoot.append(loader);
  try {
    await apiRequest(`${apiRoutes.users.data}/${client.id}`, "DELETE");
    loader.remove();
    Common.addSuccessPopup(this.shadowRoot, `Deletion of ${client.name} was successful`)
    setTimeout(() => {
      this.fetchAndAppendClients();
    }, 3000);
  } catch (err) {
    loader.remove();
    Common.addErrorPopup(this.shadowRoot, "Failed to delete client.");
  }
}
}

customElements.define("my-clients", clients);
export default clients;

