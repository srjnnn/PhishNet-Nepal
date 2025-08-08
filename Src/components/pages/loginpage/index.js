import "../../views/index.js"
import Common from "../../../utils/common.js";
import { apiRoutes } from "../../../globalConstants.js";
import LocalDB from "../../../services/localdb.js";
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
        const apiEndpoint = this.shadowRoot.querySelector('.f-pas');
        apiEndpoint.addEventListener('click',()=>{
          window.location.href="https://api.srijankharel.com.np";
        })
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
login() {
    const loading = `
      <style>
        .loader-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.55);
  z-index: 9999;
  flex-direction: column;
  font-family: Arial, sans-serif;
  user-select: none;
}

        .loader {
          width: 5rem;
          height: 5rem;
          border: 0.6rem solid rgba(0, 0, 0, 0.15);
          border-top-color: #6a6fc5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }
        .loading-text {
          font-size: 1.4rem;
          color: #333;
          font-weight: 600;
          letter-spacing: 0.05rem;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="loader-page">
        <div class="loader"></div>
        <div class="loading-text">Loading, please wait…</div>
      </div>
    `;

    // First check if already added
    let existingLoader = this.shadowRoot.querySelector('.Load');
    if (!existingLoader) {
        const div = document.createElement('div');
        div.className = "Load";
        div.innerHTML = loading;
        this.shadowRoot.append(div);
    }

    apiRequest(apiRoutes.login.loginUser, "POST", this.payload)
      .then((response) => {
        const loader = this.shadowRoot.querySelector('.Load');
        if (loader) loader.remove();

        Common.addSuccessPopup(this.shadowRoot, "Login Successful");
        LocalDB.setItem("accessToken", response.accessToken);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        const loader = this.shadowRoot.querySelector('.Load');
        if (loader) loader.remove();

        switch (error.status) {
          case 400:
            Common.addErrorPopup(this.shadowRoot, "Check your input");
            break;
          case 401:
            Common.addErrorPopup(this.shadowRoot, "Invalid credentials");
            break;
          case 500:
            Common.addErrorPopup(this.shadowRoot, "Server Error");
            break;
          default:
            Common.addErrorPopup(this.shadowRoot, "Something went wrong.");
        }
      });
}

}
const loginpage = customElements.define('login-page',loginPage);
export default loginpage;