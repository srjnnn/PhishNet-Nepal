import { loadTemplate } from "../../../utils/loadtemplate.js";

class loading extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/loading.html")
        this.render();
        this.addEventListeners();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;

    }
}
const Loading = customElements.define("my-loading",loading);
export default Loading;