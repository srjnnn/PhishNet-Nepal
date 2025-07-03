//  LOCAL URL
const baseUrl = "http://localhost:4000/api";
//  PROD URL

// const baseUrl = "";        //will be added after hosting the backend

const v1Api = `${baseUrl}/v1`;

export const apiRoutes = {
  test: {
    getAllTestData: `${v1Api}/test`,
  },
};