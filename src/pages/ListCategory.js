import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePCategory,
  getPCategorys,
  resetStatePCategory,
} from "../features/pcategory/pcategorySlice";
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
const ListCategory = () => {
  const [openModel, setOpenModel] = useState(false);
  const [proCatId, setProCatId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStatePCategory());
    dispatch(getPCategorys());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setProCatId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const pcategoryState = useSelector((state) => state.pcategory.pcategorys);
  console.log(pcategoryState);
  const data1 = [];
  for (let i = 0; i < pcategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: pcategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/add-category/${pcategoryState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pcategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deletePCategory(e));
    setOpenModel(false);
    await dispatch(getPCategorys());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Product Category</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(proCatId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default ListCategory;
