import axios from "axios";
const baseURL = "http://localhost:3001";

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
