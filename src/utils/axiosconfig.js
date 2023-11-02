import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { base_url } from "./base_url";

// const getTokenFromLocalStorage = localStorage.getItem("token")
//   ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
//     }`,
//     Accept: "application/json",
//   },
// };

const getRefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
const getEmail = JSON.parse(localStorage.getItem("email"));

const refreshToken = async () => {
  try {
    const response = await axios.post(`${base_url}user/refresh`, {
      email: getEmail,
      refreshToken: getRefreshToken,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const axiosJWT = axios.create();

// export const config =
axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      // config = data.accessToken;
      if (data.accessToken) {
        localStorage.setItem("token", '"' + data?.accessToken + '"');
      }
      config.headers.Authorization = `Bearer ${data?.accessToken}`;
    } else {
      const tokenAcc = JSON.parse(localStorage.getItem("token"));
      config.headers.Authorization = `Bearer ${tokenAcc}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosJWT;
