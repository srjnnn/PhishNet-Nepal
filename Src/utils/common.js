class Common {
    // summon error popup
    static addErrorPopup(hostShadowroot, response,timer){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.style.position = "absolute";
    absoluteDiv.style.top = "50%";
    absoluteDiv.style.left = "35%";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("error-popup");
    popup.data = response;
    absoluteDiv.appendChild(popup);
    hostShadowroot.appendChild(absoluteDiv);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, timer || 3000);
  }

  // summon success PopUp
 static addSuccessPopup(hostShadowroot,response,timer){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    absoluteDiv.style.position = "absolute";
    absoluteDiv.style.top = "50%";
    absoluteDiv.style.left = "35%";
    const popup = document.createElement("success-popup");
    popup.data = response;
    absoluteDiv.appendChild(popup);
    hostShadowroot.appendChild(absoluteDiv);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, timer || 3000);
  };
// host elem
  static getHostElem(shadowRoot){
  const hostElem = shadowRoot.getRootNode().host;
  const superHostElem = hostElem.getRootNode().host;
  return superHostElem;
  } 
  // generate elem and return
  static createElem(name){
    return document.createElement(name)
  }

  // Loading template
  static loadingTemplate(message){
   const loadingElem = document.createElement("my-loading");
   if(message){
   loadingElem.data = message;
   }
   return loadingElem;
  }
}
export default Common;