import axios from "axios";
import { base_url } from "../../utils/base_url";
import axiosJWT from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axiosJWT.get(`${base_url}user/all-users`);
  console.log("response: ", response);
  return response.data;
};

const getUser = async (id) => {
  try {
    const response = await axiosJWT.get(`${base_url}user/${id}`);
    return response.data;
  } catch (error) {
    if (
      error.response.status === 401 &&
      error.response.data.message ===
        "Mã thông báo không được ủy quyền đã hết hạn, vui lòng đăng nhập lại"
    ) {
      // Nếu access token hết hạn, chuyển hướng đến trang đăng nhập
      localStorage.removeItem("user");
      // const response = await axiosJWT.get(`${base_url}user/${id}`);
      // return response.data;
    }
  }
};

const customerService = {
  getUsers,
  getUser,
};

export default customerService;
