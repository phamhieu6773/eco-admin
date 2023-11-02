import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";
// import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/all-blogs`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axiosJWT.post(`${base_url}blog/createblog`, blog);
  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  return response.data;
};

const updateBlog = async (blog) => {
  console.log("blog", blog);
  const response = await axiosJWT.put(`${base_url}blog/updateblog/${blog.id}`, {
    title: blog.blogData.title,
    description: blog.blogData.description,
    category: blog.blogData.category,
    images: blog.blogData.images,
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axiosJWT.delete(`${base_url}blog/deleteblog/${id}`);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
