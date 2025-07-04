import { loadTemplate } from "../../../utils/loadtemplate.js";

class successPopup extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.templateContent = ""
        this.data = null;
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/success.html")
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
        this.updateContent();
    }

    set data(value){
  this._data = value;
  this.updateContent();
 }

 get data(){
  return this._data;
 }
  updateContent(){
    const text = this.shadowRoot.querySelector("#res");
    if (text) {
      text.textContent = this.data;
    }
  }
}
const SuccessPopup = customElements.define("success-popup",errorPopup);
export default SuccessPopup;