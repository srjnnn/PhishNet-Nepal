import { loadTemplate } from "../../../utils/loadtemplate.js";

class loading extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null;
        this.data = null;
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/loading.html")
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
    const text = this.shadowRoot.querySelector(".loading-text");
    if (text) {
      text.textContent = this.data;
    }
  }
}
const Loading = customElements.define("my-loading",loading);
export default Loading;