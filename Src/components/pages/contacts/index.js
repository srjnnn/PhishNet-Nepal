import { loadTemplate } from "../../../utils/loadtemplate.js";

class contact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/pages/contacts.html");
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  addEventListeners() {
    // Add event listeners for about page actions if needed
  }
}

const ContactsPage =customElements.define("contacts-page", contact);
export default contact; 