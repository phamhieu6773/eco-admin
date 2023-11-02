import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";
// import { config } from "../../utils/axiosconfig";

const getBCategorys = async () => {
  const response = await axios.get(`${base_url}blogcategory/all-categories`);
  return response.data;
};

const createBCategory = async (bcategory) => {
  const response = await axiosJWT.post(
    `${base_url}blogcategory/create`,
    bcategory
  );
  return response.data;
};

const getBCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`);
  return response.data;
};

const updateBCategory = async (bcategory) => {
  console.log(bcategory);
  const response = await axiosJWT.put(
    `${base_url}blogcategory/update/${bcategory.id}`,
    {
      title: bcategory.bCatData.title,
    }
  );
  return response.data;
};

const deleteBCategory = async (id) => {
  const response = await axiosJWT.delete(
    `${base_url}blogcategory/delete/${id}`
  );
  return response.data;
};
const bcategoryService = {
  getBCategorys,
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
};

export default bcategoryService;
