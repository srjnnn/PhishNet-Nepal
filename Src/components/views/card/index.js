import { loadTemplate } from "../../../utils/loadtemplate.js";

class card extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null

        this.data = null;

    }
    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/views/clientsCard.html")
        this.render();

        // this.addEventListeners();
         this.updateContent();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
    }

    addEventListeners(){
        // get and set the date
    }
    set data(value){
  this._data = value;
  this.updateContent();
 }

 get data(){
  return this._data;
 }
  updateContent() {
  const platform = this.shadowRoot.querySelector(".platform-tag");
  const link = this.shadowRoot.querySelector('.link');
//   const dateContainer = this.shadowRoot.querySelector('.date');
  const timeEl = this.shadowRoot.querySelector('.date time');

  if (this.data) {
    console.log("Card data : ", this.data)
    const { Platform, Link, Date } = this.data;
    
    if (platform) platform.textContent = Platform;
    if (link) link.textContent = Link;
    if (timeEl) timeEl.textContent = Date;  // Or format as needed
  }
}

}
const Card = customElements.define("my-card",card);
export default Card;