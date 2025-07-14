import { loadTemplate } from "../../../utils/loadtemplate.js";

class card extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null
    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/clientsCard.html")
        this.render();
        this.addEventListeners();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;

    }
    addEventListeners(){
        // get and set the date
        

        const cards = document.createElement('my-card');
        

    }
}
const Card = customElements.define("my-card",card);
export default Card;