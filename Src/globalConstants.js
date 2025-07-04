//  LOCAL URL
const baseUrl = "https://phishnet-nepal-backend.onrender.com/api";
//  PROD URL

// const baseUrl = "";        //will be added after hosting the backend

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  test: {
    getAllTestData: `${v1Api}/test`,
  },
  login:{
    loginUser : `${v1Api}/login`
  }
};