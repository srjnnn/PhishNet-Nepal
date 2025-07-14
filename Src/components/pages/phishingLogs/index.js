import { loadTemplate } from "../../../utils/loadtemplate.js";

class phishingLogs extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/attemptsLogs.html")
        this.render();
        this.addEventListeners();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;

    }
    addEventListeners(){
        // call the apis to create and append the cards 
        

        const cards = document.createElement('my-card');
        

    }
}
const PhishingLogs = customElements.define("phishing-logs",phishingLogs);
export default PhishingLogs;