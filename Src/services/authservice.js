import { apiRoutes } from "../globalConstants.js";
import apiRequest from "../utils/api.js";
import LocalDB from "./localdb.js";
class authService{
    static token_key = "accessToken"

    // save the auth token in the local db
    static saveToken(token){
        LocalDB.setItem(authService.token_key,token);
    }
      // Get the saved token from LocalDB
  static getToken() {
    return LocalDB.getItem(this.token_key);
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
         if(response.valid){
          return true
          
         }
          // alert("token is expired")
          // renew the token using the  refresh token stored in cookies
          apiRequest(apiRoutes.login.refreshToken)
          .then((response)=>{
            console.log(response);
          })
         
    } catch (error) {
      // alert("Failed to validate token")
      // localStorage.clear();
      console.log(error)
      return false;
    }
  }

    
// check if logged innnn
static async isloggedin(){
    return await this.validateToken();
}

}
export default authService;