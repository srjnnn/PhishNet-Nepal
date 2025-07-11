import { loadTemplate } from "../../../utils/loadtemplate.js";

class feedBack extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
        this.templateContent = null;

    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/feedbackpage.html");
        this.render();
        this.addEventListeners();
    }
    render(){
        // render the template here
        this.shadowRoot.innerHTML=this.templateContent;
    }
    addEventListners(){
        // event listners are triggered here
    } 
}

const feedback = customElements.define("my-feedbacks",feedBack);
export default feedback;