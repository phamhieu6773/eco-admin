import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
  resetStateBrand,
} from "../features/brand/brandSlice";
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
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ListBrand = () => {
  const [openModel, setOpenModel] = useState(false);
  const [brandId, setBrandId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateBrand());
    dispatch(getBrands());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
            to={`/admin/add-brand/${brandState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteBrand(e));
    setOpenModel(false);
    await dispatch(getBrands());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Brand</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>{" "}
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(brandId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default ListBrand;
