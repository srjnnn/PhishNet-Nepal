import { loadTemplate } from "../../../utils/loadtemplate.js";

class draftEmail extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null;
    }
    
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/DraftEmail.html");
        this.render();
        this.addEventListeners();

    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
    }
    addEventListeners(){
        // add the event listners to the followign apps
    }
}
const DraftEmail = customElements.define("draft-email",draftEmail);
export default DraftEmail;