import { loadTemplate } from "../../../utils/loadtemplate.js";

class sideBar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode :'open'})
        this.templateContent = null;
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/sidebar.html")
        this.render();
        this.addEventListeners();
    }

    render(){
        this.shadowRoot.innerHTML = this.templateContent;
    }
    addEventListeners(){
        // all the event listners will be triggered
    }
}
const sidebar = customElements.define('side-bar',sideBar);
export default sidebar;