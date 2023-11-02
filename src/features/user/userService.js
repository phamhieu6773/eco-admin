import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/cart/getallorders`, config);
  return response.data;
};

const userService = {
  getOrders,
};

export default userService;
