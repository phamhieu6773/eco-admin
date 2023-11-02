import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getPCategorys = async () => {
  const response = await axios.get(`${base_url}procategory/all-categories`);
  return response.data;
};

const createPCategory = async (pcategory) => {
  const response = await axiosJWT.post(
    `${base_url}procategory/createcategory`,
    pcategory
  );
  return response.data;
};

const getPCategory = async (id) => {
  const response = await axios.get(`${base_url}procategory/${id}`);
  return response.data;
};

const updatePCategory = async (pcategory) => {
  const response = await axiosJWT.put(
    `${base_url}procategory/updatecategory/${pcategory.id}`,
    {
      title: pcategory.pCatData.title,
    }
  );
  return response.data;
};

const deletePCategory = async (id) => {
  const response = await axiosJWT.delete(
    `${base_url}procategory/deletecategory/${id}`
  );
  return response.data;
};

const pcategoryService = {
  getPCategorys,
  createPCategory,
  getPCategory,
  updatePCategory,
  deletePCategory,
};

export default pcategoryService;
