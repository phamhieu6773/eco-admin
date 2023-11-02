import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ListProduct = () => {
  const [openModel, setOpenModel] = useState(false);
  const [proId, setProId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setProId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const productState = useSelector((state) => state.product.products);
  console.log("productState", productState);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color
        ?.map(
          (color) => color.title.charAt(0).toUpperCase() + color.title.slice(1)
        )
        .join(", "),
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/add-product/${productState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteProduct(e));
    setOpenModel(false);
    await dispatch(getProducts());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Product</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(proId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ListProduct;
