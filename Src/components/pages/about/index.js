import { loadTemplate } from "../../../utils/loadtemplate.js";

class aboutPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/pages/about.html");
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

const AboutPage =customElements.define("about-page", aboutPage);
export default AboutPage; 