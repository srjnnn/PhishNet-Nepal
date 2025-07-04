//  LOCAL URL
const baseUrl = "https://phishnet-nepal-backend.onrender.com/api";
//  PROD URL

// const baseUrl = "http://localhost:5000/api";        

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  test: {
    getAllTestData: `${v1Api}/test`,
  },
  login:{

    loginUser : `${v1Api}/login`,
    validateUser : `${v1Api}/verify`

  }
};