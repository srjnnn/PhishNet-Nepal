import { loadTemplate } from "../../../utils/loadtemplate.js";
class homePage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.templateContent = null;
    }
    async connectedCallback(){
        this.render();
        this.templateContent=await loadTemplate("../../Public/templates/pages/homepage.html")
    }
    render(){
      this.shadowRoot.innerHTML = this.templateContent;
    }
}
const homepage = customElements.define('home-page',homePage);
export default homepage;