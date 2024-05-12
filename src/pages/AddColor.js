import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { createColor, resetStateColor } from "../features/color/colorSlice";
import { useFormik } from "formik";
import { Table, Input, Button, Space } from 'antd';
import { tab } from "@testing-library/user-event/dist/tab";

let schema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      message.success("Color Added Successfullly!");
      setTimeout(() => {
        dispatch(resetStateColor());
      }, 300);
    }
    // if (isSuccess && updatedColor) {
    //   toast.success("Color Updated Successfullly!");
    //   navigate("/admin/list-color");
    // }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getColorId !== undefined) {
      //   const data = { id: getColorId, colorData: values };
      //   dispatch(updateAColor(data));
      //   dispatch(resetState());
      // } else {
      dispatch(createColor(values));
      formik.resetForm();

      // }
    },
  });


  

  return (
    <div>
      <h3 className="mb-4">Add Color</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="color"
          label="Enter Color"
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
          val={formik.values.title}
          id="color"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>

        
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Color
        </button>
      </form>
    </div>
  );
};

export default AddColor;
