import axios from "axios";
import { base_url } from "../../utils/base_url";
import axiosJWT from "../../utils/axiosconfig";
import config from "../../utils/axiosconfig";

axios.defaults.withCredentials = true;
// import { config } from "../../utils/axiosconfig";

// eslint-disable-next-line no-undef
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData, {
    withCredentials: true, // Điều này đảm bảo rằng cookie sẽ được bao gồm trong yêu cầu
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};


const getOrders = async (params) => {
  const response = await axiosJWT.get(`${base_url}user/cart/getallorders`,  {...config, params});
  return response.data;
};

const getAOrder = async (id) => {
  const response = await axios.get(`${base_url}user/cart/get-order/${id}`);
  return response.data;
};
const getCountOrders = async () => {
  const response = await axiosJWT.get(`${base_url}user/cart/getallorderscount`);
  return response.data;
};


const updateOrderStatus = async (data) => {
  const response = await axiosJWT.put(`${base_url}user/cart/update-order-status/${data?.id}`, { status: data.orderStatus });
  return response.data;
};

const authService = {
  login,
  getOrders,
  getAOrder,
  updateOrderStatus,
  getCountOrders
};

export default authService;
