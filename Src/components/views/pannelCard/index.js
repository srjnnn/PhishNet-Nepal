import { loadTemplate } from "../../../utils/loadtemplate.js";

class pannelCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = null;
    this._data = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../../Public/templates/views/pannelCard.html");
    this.render();
    this.updateContent();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  set data(value) {
    this._data = value;
    this.updateContent();
  }

  get data() {
    return this._data;
  }

  updateContent() {
    if (!this.shadowRoot) return;
    const heading = this.shadowRoot.querySelector(".heading");
    const platform = this.shadowRoot.querySelector(".platform-tag");
    const dateLabel = this.shadowRoot.querySelector(".date label");
    const dateTime = this.shadowRoot.querySelector(".date time");

    if (this._data) {
      if (heading && this._data.heading) heading.textContent = this._data.heading;
      if (platform && this._data.platform) platform.textContent = `Platform: ${this._data.platform}`;
      if (dateLabel) dateLabel.textContent = "Posted on :";
      if (dateTime && this._data.date) dateTime.innerHTML = this._data.date.split("T")[0];
    }
  }
}

customElements.define("pannel-card", pannelCard);
export default pannelCard;