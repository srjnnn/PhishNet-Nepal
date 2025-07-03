import "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const app = document.createElement("my-app");
  appContainer.appendChild(app);
  localStorage.removeItem("pageMode");
  
});
