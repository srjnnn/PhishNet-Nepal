import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
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
                Common.addErrorPopup(this.shadowRoot,"Fields cannot be empty")
                return;
            }else{
             this.payload.email = email.value;
             this.payload.password=pass.value;
             this.login()
            }

        })
    }
    login(){
            apiRequest(apiRoutes.login.loginUser,"POST",this.payload)
           .then((response)=>{
            // add the popup based on the response 
            console.log(response)
            Common.addSuccessPopup(this.shadowRoot,"Login Successful")
           })
           .catch((error=>{
            // add the popup
            switch (error.status){
                case 400:
                    Common.addErrorPopup(this.shadowRoot,"Check your input")
                    break
                case 401 : 
                   Common.addErrorPopup(this.shadowRoot,"Invalid crediantials")
                   break;
                case 500:
                    Common.addErrorPopup(this.shadowRoot,"Server Error")
                    break
            }

           }))
    }
}
const loginpage = customElements.define('login-page',loginPage);
export default loginpage;