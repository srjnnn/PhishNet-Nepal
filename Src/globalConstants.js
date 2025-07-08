//  LOCAL URL
const baseUrl = "https://phishnet-nepal-backend.onrender.com/api";
//  PROD URL

// const baseUrl = "http://localhost:5000/api";        

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  // test: {
  //   getAllTestData: `${v1Api}/test`,
  // },
  login:{
    loginUser : `${v1Api}/login`,
    validateUser : `${v1Api}/login/validate`,
    refreshToken : `${v1Api}/login/renew`
  },
  dashboard:{
    getStatsData : `${v1Api}/stats`
  },
  feedbacks:{
    Postfeedbacks : `${v1Api}/feedbacks`,
    getFeedbacks : `${v1Api}/feedbacks/get`,
  },
  users:{
    data:`${v1Api}/users`
  },
  attemptsLogs :{
    data : `${v1Api}/logs`
  }


};