import { apiRoutes } from "../globalConstants.js";
import apiRequest from "../utils/api.js";
import LocalDB from "./localdb.js";
class authService{
    static token_key = "authToken"

    // save the auth token in the local db
    static saveToken(token){
        LocalDB.setItem(authService.token_key,token);
    }
      // Get the saved token from LocalDB
  static getToken() {
    return LocalDB.getItem(authService.token_key);
  }
//   clear the local storage
   static removeToken(){
    LocalDB.removeItem(authService.token_key);
   } 

// validate-token
static async validateToken(){
    const token = this.getToken();
    if(!token) return false;
    const {payload} = token;

    
    try {
      const response = await apiRequest(apiRoutes.login.validateUser, "POST", payload);
      localStorage.setItem("authResponse",JSON.stringify(response) );
      sessionStorage.setItem("User", response.userData.role);
      return true;
    } catch (error) {
      localStorage.clear();
      return false;
    }
  }

    
// check if logged innn
static async isloggedin(){
    return await this.validateToken();
}

}
export default authService;