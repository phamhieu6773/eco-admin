import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Select, Space, Upload } from "antd";
import { Table, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getPCategorys } from "../features/pcategory/pcategorySlice";
import { getColors, resetStateColor } from "../features/color/colorSlice";
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
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tags is Required"),
  // color: Yup.array()
  //   // .min(1, "Pick at least one color")
  //   .required("Color is Required"),
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

const AddProduct = () => {
  const { Dragger } = Upload;
  const fileListImg = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const img = useRef([]);
  const colorDefault = useRef([]);
  const getIdProduct = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [groups, setGroups] = useState([]);
  const [checkTable, setCheckTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPCategorys());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (getIdProduct !== undefined) {
      dispatch(getProduct(getIdProduct));
    } else {
      dispatch(resetStateColor());
      dispatch(resetStateImg());
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
    productVariations,
    productClassify,
  } = productState;

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
    setGroups(productClassify);
    setTableData(productVariations);
  }, [productClassify, productVariations]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      message.success("Create successfully.");
    }
    if (isSuccess && updatedProduct) {
      message.success("Update successfully.");
      // navigate("/admin/list-products");
    }
    if (isError) {
      message.error("Create failed");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  // if (!colorState) {
  //   coloropt = [];
  //   console.log("coloropt", coloropt);
  // }
  colorState.forEach((i) => {
    coloropt.push({
      label: (
        <Space
          key={i._id}
          style={{
            backgroundColor: `${i.title}`,
            borderRadius: "4px",
          }}
        >
          {i.title}
        </Space>
      ),
      value: i._id,
    });
  });

  const handleColors = (e) => {
    setColor(e);
  };
  useEffect(() => {
    formik.values.color = color;
    formik.values.images = listImg;
    formik.values.classify = productClassify;
    formik.values.variations = productVariations;
  }, [color, imgState, productImages, listImg]);

  const props = {
    name: "images",
    multiple: true,
    beforeUpload: async (file) => {
      fileListImg.push(file);
      await dispatch(uploadImg(fileListImg));
      return false;
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove: (file) => {
      const position = listImg.findIndex(
        (element) => element.public_id === file.public_id
      );
      dispatch(delImg(img.current[position].public_id));
      img.current.splice(position, 1);
      setListImg(img.current);
    },
  };

  const handleCreateGroup = () => {
    if (groups?.length > 0) {
      setGroups([...groups, { name: "", items: [] }]);
    } else {
      setGroups([{ name: "", items: [] }]);
    }
    // setGroups([...groups, { name: '', items: [] }]);
  };

  const handleInputChange = (groupIndex, itemIndex, event) => {
    const { name, value } = event.target;
    const newGroups = [...groups];
    newGroups[groupIndex].name = value;
    setGroups(newGroups);
  };

  const handleInputChange2 = (groupIndex, itemIndex, event) => {
    const { name, value } = event.target;
    const newGroups = [...groups];
    newGroups[groupIndex].items[itemIndex][name] = value;
    setGroups(newGroups);
  };

  // const handleAddItem = (index) => {
  //   const newGroups = [...groups];
  //   console.log(newGroups);
  //   newGroups[index].items.push({ item: '' });
  //   setGroups(newGroups);
  // };
  const handleAddItem = (index) => {
    setGroups((prevGroups) => {
      return prevGroups.map((group, i) => {
        if (i === index) {
          return {
            ...group,
            items: [...group.items, { item: "" }],
          };
        }
        return group;
      });
    });
  };

  const handleDeleteItem = (groupIndex, itemIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].items.splice(itemIndex, 1);
    setGroups(newGroups);
  };
  const handleDeleteGroup = (index) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const renderItems = (groupIndex) => {
    return groups[groupIndex].items.map((item, itemIndex) => (
      <div key={itemIndex} className="d-flex">
        {/* <input
          type="text"
          placeholder="Nhập mô tả mục"
          name="item"
          value={item.item}
          onChange={(e) => handleInputChange2(groupIndex, itemIndex, e)}
        /> */}
        <CustomInput
          type="text"
          label="Nhập mô tả mục"
          name="item"
          val={item.item}
          onCh={(e) => handleInputChange2(groupIndex, itemIndex, e)}
          // onBl={formik.handleBlur("title")}
        />
        <div
          className="btn btn-success border-0 rounded-3 mx-1 mt-3"
          onClick={() => handleDeleteItem(groupIndex, itemIndex)}
        >
          Xóa mục
        </div>
      </div>
    ));
  };

  const renderGroups = () => {
    return groups?.map((group, index) => (
      <div key={index}>
        {/* <input
          type="text"
          placeholder="Nhập tên nhóm"
          name="name"
          value={group.name}
          onChange={(e) => handleInputChange(index, 'name', e)}
        /> */}
        <CustomInput
          type="text"
          label="Nhập tên nhóm"
          name="name"
          val={group.name}
          onCh={(e) => handleInputChange(index, "name", e)}
          // onBl={formik.handleBlur("title")}
        />
        {renderItems(index)}
        <div
          className="btn btn-success border-0 rounded-3 my-2"
          onClick={() => handleAddItem(index)}
        >
          Thêm mục
        </div>
        <div
          className="btn btn-success border-0 rounded-3 my-2 mx-2"
          onClick={() => handleDeleteGroup(index)}
        >
          Xóa nhóm
        </div>
      </div>
    ));
  };

  // Hàm để tạo ra tất cả các tổ hợp có thể từ các nhóm phân loại
  const generateCombinations = (
    groupIndex,
    currentCombination,
    combinations
  ) => {
    if (groupIndex === groups?.length) {
      if (currentCombination.length > 0) {
        combinations.push(currentCombination);
      }
      return;
    }
    if (groups?.length > 0) {
      const currentGroup = groups[groupIndex];
      currentGroup.items.forEach((item) => {
        const newCombination = [
          ...currentCombination,
          { [currentGroup.name]: item.item },
        ];
        generateCombinations(groupIndex + 1, newCombination, combinations);
      });
    }
  };

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (key, value) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index].quantity = value;
      setTableData(newData);
    }
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (key, value) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index].price = value;
      setTableData(newData);
    }
  };

  // Render table
  const combinations = [];
  generateCombinations(0, [], combinations);

  let columns = [];
  if (groups?.length > 0) {
    columns = groups?.map((group) => ({
      title: group.name,
      dataIndex: group.name, // Sử dụng tên của nhóm phân loại làm dataIndex
      key: group.name,
    }));

    // Thêm cột Số lượng và Giá
    columns.push(
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (_, record) => (
          <Input
            value={record.quantity}
            required
            allowClear={false}
            onChange={(e) => handleQuantityChange(record.key, e.target.value)}
          />
        ),
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (_, record) => (
          <Input
            value={record.price}
            required
            allowClear={false}
            onChange={(e) => handlePriceChange(record.key, e.target.value)}
          />
        ),
      }
    );
  }

  // Tạo dataSource từ combinations
  useEffect(() => {
    const dataLast = tableData;
    const data = combinations.map((combination, index) => {
      const record = { key: index };
      combination.forEach((item, itemIndex) => {
        const groupName = Object.keys(item)[0]; // Lấy tên nhóm phân loại
        record[groupName] = item[groupName];
      });
      return record;
    });
    data?.forEach((element) => {
      dataLast?.forEach((e) => {
        if (element?.key === e?.key) {
          element.quantity = e?.quantity;
          element.price = e?.price;
        }
      });
    });
    setTableData(data);
    formik.values.variations = data;
    formik.values.classify = groups;
  }, [groups]);

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
    enableReinitialize: productTitle ? true : false,
    initialValues: {
      title: productTitle || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      color: color || "",
      quantity: productQuantity || "",
      images: listImg || [],
      classify: groups || [],
      variations: tableData || [],
    },
    // validationSchema: schema,
    onSubmit: (values) => {
      if (getIdProduct !== undefined) {
        const data = {
          id: getIdProduct,
          productData: values,
        };
        dispatch(updateProduct(data));
        dispatch(resetState());
        dispatch(resetStateImg());
        dispatch(resetStateColor());
        window.location.reload();
      } else {
        dispatch(createProduct(values));
        // formik.resetForm();
        // setColor([]);
        // setListImg([]);
        // setTimeout(() => {
        //   dispatch(resetState());
        //   dispatch(resetStateImg());
        //   dispatch(resetStateColor());
        // }, 300);
      }
    },
  });

  // console.log(tableData);

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
        {/* <Select
          mode="multiple"
          allowClear
          className="w-100 mt-3"
          placeholder="Select colors"
          defaultValue={colorDefault.current}
          onChange={(i) => handleColors(i)}
          options={color ? coloropt : []}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
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

        {tableData?.length == 0 ? (
          <div>
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
          </div>
        ) : (
          ""
        )}

        <div className="mt-3">
          <div>
            <div
              className="btn btn-success border-0 rounded-3 my-1"
              onClick={handleCreateGroup}
            >
              Tạo nhóm phân loại
            </div>
            {renderGroups()}
          </div>
          {tableData?.length > 0 ? (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          ) : (
            ""
          )}
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

{
  /* <div className="bg-white border-1 text-center mt-3">
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
        </div> */
}
