import { loadTemplate } from "../../../utils/loadtemplate.js";

class loginPage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.templateContent = null;
    }
    async connectedCallback(){
        this.templateContent=await loadTemplate("../../Public/templates/pages/loginPage.html");
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
    }
}
const loginpage = customElements.define('login-page',loginPage);
export default loginpage;