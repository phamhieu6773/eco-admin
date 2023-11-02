import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBrand,
  getBrand,
  resetStateBrand,
  updateBrand,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is Required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getIdBrand = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(resetStateBrand());
  }, []);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getIdBrand !== undefined) {
      dispatch(getBrand(getIdBrand));
    } else {
      dispatch(resetStateBrand());
    }
  }, [getIdBrand]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      message.success("Brand Added Successfullly!");
      setTimeout(() => {
        dispatch(resetStateBrand());
      }, 300);
    }
    if (isSuccess && updatedBrand) {
      message.success("Brand Updated Successfullly!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getIdBrand !== undefined) {
        const data = { id: getIdBrand, brandData: values };
        dispatch(updateBrand(data));
        dispatch(resetStateBrand());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Brand</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
          val={formik.values.title}
          label="Enter Brand"
          id="brand"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getIdBrand !== undefined ? "Edit" : "Add"} Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
