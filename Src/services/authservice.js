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
    return LocalDB.getItem("accessToken");
  }
//   clear the local storage
   static removeToken(){
    LocalDB.removeItem(authService.token_key);
   } 

// validate-token
static async validateToken(){
    const accessToken = this.getToken();
    if(!accessToken) return false;
    const payload = {};
    payload.accessToken = accessToken;

    
    try {
      const response = await apiRequest(apiRoutes.login.validateUser, "POST", payload);
      // console.log(response)
      // localStorage.setItem("authResponse",JSON.stringify(response) );
      return true;
    } catch (error) {
      // alert("Failed to validate token")
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