import { loadTemplate } from "../../../utils/loadtemplate.js";
class homePage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.templateContent = null;
    }
    async connectedCallback(){
       
        this.templateContent=await loadTemplate("../../Public/templates/pages/homepage.html")
         this.render();
    }
    render(){
      this.shadowRoot.innerHTML = this.templateContent;
    //   create and add the sidebar
      const sidebar =  document.createElement('side-bar');
      const sidebarDiv = this.shadowRoot.querySelector('#sidebar');
      sidebarDiv.appendChild(sidebar);
    }
    addEventListeners(){
        // event listners to the homepage will be triggered here
    }
}
const homepage = customElements.define('home-page',homePage);
export default homepage;