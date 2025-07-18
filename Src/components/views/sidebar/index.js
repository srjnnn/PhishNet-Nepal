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
        this.navActions();

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
                this.appendPage(varContainer,"phishing-logs")
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

    // nav actions
    navActions(){
          const homePage = Common.getHostElem(this.shadowRoot);
          const anchors = homePage.shadowRoot.querySelectorAll('#h-nav');

          anchors.forEach(anchor =>{
             anchor.addEventListener('click', (e)=>{
                e.preventDefault();
                  this.loadPages(anchor.name);
                  
             })

            
          })
    }
    loadPages(name){
        const varContainer = Common.getHostElem(this.shadowRoot).shadowRoot.querySelector('.variable-page-body');

        switch (name){
            case "home":
                // do action
                this.appendPage(varContainer,"my-dashboard")
                break;
            case "about":
                this.appendPage(varContainer,"componet-name")
                break;
            case "contact":
                this.appendPage(varContainer,"my-dashboard")
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