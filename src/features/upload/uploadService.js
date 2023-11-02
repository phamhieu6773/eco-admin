import axios from "axios";
import config from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import axiosJWT from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const response = await axiosJWT.put(`${base_url}upload`, data);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axiosJWT.delete(`${base_url}upload/deleteimg/${id}`);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
