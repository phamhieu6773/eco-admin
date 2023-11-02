import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  createBCategory,
  getBCategory,
  resetStateBCategory,
  updateBCategory,
} from "../features/bcategory/bcategorySlice";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Category is Required"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getIdBCategory = location.pathname.split("/")[3];
  console.log(getIdBCategory);
  const bCategoryState = useSelector((state) => state.bcategory);
  const {
    isError,
    isLoading,
    isSuccess,
    createdBCategory,
    categoryName,
    updatedBCategory,
  } = bCategoryState;

  useEffect(() => {
    if (getIdBCategory !== undefined) {
      dispatch(getBCategory(getIdBCategory));
    } else {
      dispatch(resetStateBCategory());
    }
  }, [getIdBCategory]);

  useEffect(() => {
    if (isSuccess && createdBCategory) {
      message.success("Category Added Successfullly!");
      dispatch(resetStateBCategory());
    }
    if (isSuccess && updatedBCategory) {
      message.success("Category Updated Successfully!");
      dispatch(resetStateBCategory());
      navigate("/admin/blogs-category");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getIdBCategory !== undefined) {
        const data = { id: getIdBCategory, bCatData: values };
        dispatch(updateBCategory(data));
        dispatch(resetStateBCategory());
      } else {
        console.log(values);
        dispatch(createBCategory(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          label="Enter Blog Title"
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getIdBCategory !== undefined ? "Edit" : "Add"} Blog Category
        </button>
      </form>
    </div>
  );
};

export default AddBlogCat;
