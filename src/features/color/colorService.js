import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/all-color`);
  return response.data;
};

const createColor = async (color) => {
  const response = await axiosJWT.post(`${base_url}color/createcolor`, color);
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axiosJWT.delete(`${base_url}color/deletecolor/${id}`);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  deleteColor,
};

export default colorService;
