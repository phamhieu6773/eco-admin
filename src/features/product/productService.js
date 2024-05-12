import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all-products`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axiosJWT.post(
    `${base_url}product/createproduct`,
    product
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  return response.data;
};
const updateProduct = async (product) => {
  console.log("product", product.productData);
  const response = await axiosJWT.put(
    `${base_url}product/updateproduct/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      // color: product.productData.color,
      tags: product.productData.tags,
      images: product.productData.images,
      quantity: product.productData.quantity,
      classify: product.productData.classify,
      variations: product.productData.variations
    }
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosJWT.delete(`${base_url}product/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
