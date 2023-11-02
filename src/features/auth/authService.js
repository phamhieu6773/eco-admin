import axios from "axios";
import { base_url } from "../../utils/base_url";
import axiosJWT from "../../utils/axiosconfig";
// import { config } from "../../utils/axiosconfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("email", JSON.stringify(response.data.email));
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response.data.refreshToken)
    );
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axiosJWT.get(`${base_url}user/cart/getallorders`);
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;
