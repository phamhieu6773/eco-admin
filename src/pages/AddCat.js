import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createPCategory,
  getPCategory,
  resetStatePCategory,
  updatePCategory,
} from "../features/pcategory/pcategorySlice";
import { message } from "antd";
import { useFormik } from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

let schema = Yup.object().shape({
  title: Yup.string().required("Product Category is Required"),
});

const AddCat = () => {
  const dispatch = new useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const getIdPCategory = location.pathname.split("/")[3];
  const newPCategory = useSelector((state) => state.pcategory);
  const {
    isError,
    isLoading,
    isSuccess,
    createdPCategory,
    categoryName,
    updatedPCategory,
  } = newPCategory;

  useEffect(() => {
    if (getIdPCategory !== undefined) {
      dispatch(getPCategory(getIdPCategory));
    } else {
      dispatch(resetStatePCategory());
    }
  }, [getIdPCategory]);

  useEffect(() => {
    if (isSuccess && createdPCategory) {
      message.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedPCategory) {
      message.success("Category Updated Successfully!");
      navigate("/admin/list-category");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isError, isLoading, isSuccess]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setData([...data, inputValue]);
      setInputValue("");
    }
  };

  const removeItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getIdPCategory !== undefined) {
        const data = { id: getIdPCategory, pCatData: values };
        dispatch(updatePCategory(data));
        dispatch(resetStatePCategory());
      } else {
        dispatch(createPCategory(values));
        dispatch(resetStatePCategory());
        formik.resetForm();
      }
    },
  });
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn việc submit mặc định của form
    }
  };

  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Product Category"
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
          val={formik.values.title}
          id="brand"
          onKeyDown={handleKeyDown}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div className="d-flex">
          <CustomInput
            type="text"
            val={inputValue}
            label="Enter Product Attributes"
            onCh={handleInputChange}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn btn-success border-0 mt-3 ms-2"
            onClick={addItem}
          >
            OK
          </button>
        </div>
        <ul className="list-group mt-2">
          {data.map((item, index) => (
            <li
              className="list-group-item list-group-item-success position-relative"
              key={index}
            >
              {item}
              <div
                className="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
                onClick={() => removeItem(index)}
              >
                <MdDeleteOutline className="me-2 fs-4" />
              </div>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getIdPCategory !== undefined ? "Edit" : "Add"} Product Category
        </button>
      </form>
    </div>
  );
};

export default AddCat;
