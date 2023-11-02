import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";
// import { config } from "../../utils/axiosconfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/all-brands`);
  return response.data;
};
const createBrand = async (brand) => {
  const response = await axiosJWT.post(`${base_url}brand/createbrand`, brand);
  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axiosJWT.put(
    `${base_url}brand/updatebrand/${brand.id}`,
    {
      title: brand.brandData.title,
    }
  );
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosJWT.delete(`${base_url}brand/deletebrand/${id}`);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
