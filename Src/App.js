// Import all the exports from the files at once
import Router from "../router.js";
import "./components/elements/index.js"
import "./components/pages/index.js"
import "./components/views/index.js"
import authService from "./services/authservice.js";


class MyApp extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"}) //shadow dom
    }

    async connectedCallback(){
        this.render();
        await this.loadPage();
    }

    async loadPage(){
       const main = this.shadowRoot.getElementById("main-app");
        // check if the user is authorized 
        const loading = document.createElement("my-loading");
        main.appendChild(loading);

        const user = await authService.isloggedin();
        const page = user
          ?Router._routesPages[Router._routes.Homepage]
          :Router._routesPages[Router._routes.Login]

    main.innerHTML = "";
    const pageElement = document.createElement(page);
    main.appendChild(pageElement);

    }
      clearContainer() {
    const main = document.getElementById("main-content-container");
    main.innerHTML = "";
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .app-container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<main id="main-app" class="app-container"></main>

    `;
  }
}
const AppElement = customElements.define("my-app", MyApp);

export default AppElement;
