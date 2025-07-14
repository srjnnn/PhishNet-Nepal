import Common from "../../../utils/common.js";
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
    }

    render(){
        this.shadowRoot.innerHTML = this.templateContent;
        this.addEventListeners();

    }
    addEventListeners(){

        const varContainer = Common.getHostElem(this.shadowRoot).shadowRoot.querySelector('.variable-page-body');
        this.appendPage(varContainer,"my-dashboard")

        if(varContainer){
            const anchors = this.shadowRoot.querySelectorAll('a');
            if(anchors){
                anchors.forEach(anchor =>{
                    anchor.addEventListener('click', ()=>{
                        const page = anchor.id
                        this.changePage(page,varContainer)
                    })
                })
            }

        }
    };

    changePage(page,varContainer){
           switch(page){
            case "dashboard":
                this.appendPage(varContainer,"my-dashboard");
                break
            case "logs":
                this.appendPage(varContainer,"my-logs")
                break;
            case "clients":
                this.appendPage(varContainer,"my-clients")
                break
            case "pannel":
                this.appendPage(varContainer,"my-pannel")
                break
            case "email":
                this.appendPage(varContainer,"draft-email")
                break
            default :
                this.appendPage(varContainer,"my-dashboard");
                break;

                                

           }
    }
    appendPage(varContainer, name){
        varContainer.innerHTML = ""
        const pageElement = Common.createElem(name);
        varContainer.appendChild(pageElement);
    }
}
const sidebar = customElements.define('side-bar',sideBar);
export default sidebar;