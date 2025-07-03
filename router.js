class Router {
    static _routes ={
        Homepage : "/",
        Login : "/login"
    }
    static _routesPages ={
        [this._routes.Homepage]:"home-page",
        [this._routes.Login]:"login-page"
    }
}
export default Router;