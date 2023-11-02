import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill, { Quill, editor } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  delImg,
  resetStateImg,
  uploadImg,
} from "../features/upload/uploadSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getPCategorys } from "../features/pcategory/pcategorySlice";
import {
  createBlog,
  getABlog,
  resetStateBlog,
  updateBlog,
} from "../features/blog/blogSlice";
import { getBCategorys } from "../features/bcategory/bcategorySlice";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useRef } from "react";
import { logDOM } from "@testing-library/react";
// const props = {
//   name: "file",
//   multiple: true,
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

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

const AddBlog = () => {
  const { Dragger } = Upload;
  const fileListImg = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [listImg, setListImg] = useState([]);
  const getBlogId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getBCategorys());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const statusUploadImg = useSelector((state) => state.upload);
  const categoryState = useSelector((state) => state.bcategory.bcategorys);
  const blogState = useSelector((state) => state.blog);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      message.success("Create successfully.");
    }
    if (isSuccess && updatedBlog) {
      message.success("Update successfully.");
      navigate("/admin/list-blogs");
    }
    if (isError) {
      message.error("Create failed");
    }
  }, [isSuccess, isError, isLoading]);

  const img = useRef([]);
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetStateBlog());
    }
  }, [getBlogId]);

  useEffect(() => {
    blogImages?.forEach((i) => {
      img.current.push(i);
    });
  }, [blogImages]);

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

  const props = {
    name: "images",
    multiple: true,
    beforeUpload: async (file) => {
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
  useEffect(() => {
    formik.values.images = listImg;
    // console.log(listImg);
  }, [imgState, blogImages]);

  console.log("img.corr", img.current);

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: listImg || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetStateBlog());
        dispatch(resetStateImg());
        setListImg([]);
      } else {
        dispatch(createBlog(values));
        setListImg([]);
        formik.resetForm();
        dispatch(resetStateBlog());
        dispatch(resetStateImg());
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <div className="">
        {/* type, label, i_id, i_class, name, val, onChng, onBlr */}
        <form action="" onSubmit={formik.handleSubmit}>
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

          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            name="category"
            className="form-control py-3 mt-3 mb-3"
            id=""
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="" disabled>
              Select Blog Category
            </option>
            {categoryState.map((i) => {
              return (
                <option key={i._id} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div onBlur={formik.handleBlur("description")}>
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
