import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";

class loginPage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.templateContent = null;
        this.payload = {};
    }
    async connectedCallback(){
        this.templateContent=await loadTemplate("../../Public/templates/pages/loginPage.html");
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
        this.addEventListeners()
    }
    // made the event listners
    addEventListeners(){
        const email = this.shadowRoot.querySelector("#email")
        const pass = this.shadowRoot.querySelector('#pass')
        const lgnButton = this.shadowRoot.querySelector("#lgn-btn");
        lgnButton.addEventListener("click",()=>{
            if(email.value ==="" || pass.value===""){
                // summon the popup stating the {content cannot be empty}
                alert("the fields cannot be empty")
                return;
            }else{
             this.payload.email = email.value;
             this.payload.password=pass.value;
             this.login()
            }

        })
    }
    login(){
        console.log(this.payload)
            apiRequest(apiRoutes.login.loginUser,"POST",this.payload)
           .then((response)=>{
            // add the popup based on the response 
            alert(response)
           })
           .catch((error=>{
            // add the popup
            alert(error.message)
            console.log(error)
           }))
    }
}
const loginpage = customElements.define('login-page',loginPage);
export default loginpage;