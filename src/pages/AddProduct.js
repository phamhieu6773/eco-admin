import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Select, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getPCategorys } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import {
  delImg,
  resetStateImg,
  uploadImg,
} from "../features/upload/uploadSlice";
import { base_url } from "../utils/base_url";
import {
  createProduct,
  getProduct,
  resetState,
  updateProduct,
} from "../features/product/productSlice";
import { useLocation } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tags is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

//Dragger
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: ["red", "#785412"] }],
    [{ background: ["red", "#785412"] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font",
];
let fileList = [];
const img = [];

const AddProduct = () => {
  const { Dragger } = Upload;
  const fileListImg = [];
  const dispatch = useDispatch();
  const location = useLocation();
  const getIdProduct = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [listImg, setListImg] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPCategorys());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (getIdProduct !== undefined) {
      dispatch(getProduct(getIdProduct));
    } else {
      dispatch(resetState());
    }
  }, [getIdProduct]);

  const imgState = useSelector((state) => state.upload.images);
  const statusUploadImg = useSelector((state) => state.upload);
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pcategory.pcategorys);
  const colorState = useSelector((state) => state.color.colors);
  const productState = useSelector((state) => state.product);

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productTitle,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productTags,
    productColor,
    productQuantity,
    productImages,
  } = productState;

  const colorDefault = useRef([]);
  const img = useRef([]);
  useEffect(() => {
    productColor?.forEach((i) => {
      colorDefault.current.push(i._id);
    });
    setColor(colorDefault.current);
  }, [productColor]);

  useEffect(() => {
    productImages?.forEach((i) => {
      img.current.push(i);
    });
  }, [productImages]);

  useEffect(() => {
    imgState.forEach((i) => {
      img.current.push({
        public_id: i.public_id,
        uid: i.public_id,
        url: i.url,
      });
    });
    dispatch(resetStateImg());
    setListImg(img.current);
  }, [imgState]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      message.success("Create successfully.");
    }
    if (isSuccess && updatedProduct) {
      message.success("Update successfully.");
    }
    if (isError) {
      message.error("Create failed");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const handleColors = (e) => {
    setColor(e);
  };
  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = listImg;
  }, [color, imgState, productImages, listImg]);

  const props = {
    name: "images",
    multiple: true,
    beforeUpload: async (file) => {
      console.log("file", file);
      fileList.push(file);
      fileListImg.push(file);
      await dispatch(uploadImg(fileListImg));
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove: (file) => {
      const position = listImg.findIndex(
        (element) => element.name === file.name
      );
      dispatch(delImg(img.current[position].public_id));
      img.current.splice(position, 1);
      setListImg(img.current);
    },
  };

  useEffect(() => {
    if (statusUploadImg.isSuccess && !statusUploadImg.isLoading) {
      message.success("Uploaded or Delete successfully.");
    }
    if (statusUploadImg.isError) {
      message.error("Upload or Delete failed");
    }
  }, [
    statusUploadImg.isSuccess,
    statusUploadImg.isError,
    statusUploadImg.isLoading,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productTitle || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      color: productColor || "",
      quantity: productQuantity || "",
      images: listImg || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("getId", getIdProduct);
      if (getIdProduct !== undefined) {
        const data = { id: getIdProduct, productData: values };
        dispatch(updateProduct(data));
        dispatch(resetState());
        dispatch(resetStateImg());
        setListImg([]);
      } else {
        dispatch(createProduct(values));
        fileList = [];
        formik.resetForm();
        setColor([]);
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetStateImg());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <ReactQuill
          className="mt-3"
          theme="snow"
          value={formik.values.description}
          name="description"
          onChange={formik.handleChange("description")}
          modules={modules}
          formats={formats}
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <select
          name="brand"
          className="form-control py-3 mt-3"
          id=""
          value={formik.values.brand}
          onChange={formik.handleChange("brand")}
          onBlur={formik.handleBlur("brand")}
        >
          <option value="" disabled>
            Select Brand
          </option>
          {brandState.map((i) => {
            return (
              <option key={i._id} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.brand && formik.errors.brand}
        </div>
        <select
          name="category"
          className="form-control py-3 mt-3 "
          id=""
          value={formik.values.category}
          onChange={formik.handleChange("category")}
          onBlur={formik.handleBlur("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categoryState.map((i) => {
            return (
              <option key={i._id} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <CustomInput
          type="number"
          label="Enter Product Price"
          name="price"
          val={formik.values.price}
          onCh={formik.handleChange("price")}
          onBl={formik.handleBlur("price")}
        />
        <div className="error">
          {formik.touched.price && formik.errors.price}
        </div>

        <select
          name="tags"
          value={formik.values.tags}
          onChange={formik.handleChange("tags")}
          onBlur={formik.handleBlur("tags")}
          className="form-control py-3 mt-3"
          id=""
        >
          <option value="" disabled>
            Select Tags
          </option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error">{formik.touched.tags && formik.errors.tags}</div>

        {/* <select name="" className="form-control py-3 mt-3 mb-3" id="">
          <option value="">Select Color</option>
        </select> */}
        <Select
          mode="multiple"
          allowClear
          className=" w-100 mt-3"
          placeholder="Select colors"
          defaultValue={colorDefault.current}
          onChange={(i) => handleColors(i)}
          options={coloropt}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
        </div>
        <CustomInput
          type="number"
          label="Enter Product Quantity"
          name="quantity"
          val={formik.values.quantity}
          onCh={formik.handleChange("quantity")}
          onBl={formik.handleBlur("quantity")}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
        </div>

        {/* <div className="bg-white border-1 text-center mt-3">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimages d-flex flex-wrap gap-3">
          {img?.map((i, j) => {
            return (
              <div className=" position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            );
          })}
        </div> */}
        <div className="mt-3">
          <Dragger
            listType="picture"
            fileList={listImg}
            {...props}
            style={{ background: "#ffffff" }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getIdProduct !== undefined ? "Edit" : "Add"} Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
