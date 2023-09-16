import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddProduct = () => {
  const [value, setValue] = useState("");
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

  const handleQuill = (e) => {
    console.log(value);
    setValue(e);
  };

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <form action="">
        <CustomInput type="text" label="Enter Product Title" name="title" />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(evt) => {
            handleQuill(evt);
          }}
          modules={modules}
          formats={formats}
        />
        <select name="" className="form-control py-3 mt-3 mb-3" id="">
          <option value="">Select Brand</option>
        </select>
        <select name="" className="form-control py-3 mt-3 mb-3" id="">
          <option value="">Select Category</option>
        </select>
        <select name="" className="form-control py-3 mt-3 mb-3" id="">
          <option value="">Select Color</option>
        </select>
        <CustomInput type="number" label="Enter Product Price" name="title" />

        <Dragger {...props} style={{ background: "#ffffff", marginTop: "" }}>
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
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
