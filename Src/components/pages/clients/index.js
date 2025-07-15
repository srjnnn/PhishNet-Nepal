import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";


class clients extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null
    }

    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/Clients.html");
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
        this.addEventListeners();
    }
    addEventListeners(){
        
    }
}
const Clients = customElements.define("my-clients",clients);
export default Clients;