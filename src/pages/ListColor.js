import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColor,
  getColors,
  resetStateColor,
} from "../features/color/colorSlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { resetState } from "../features/product/productSlice";
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
const ListColor = () => {
  const [openModel, setOpenModel] = useState(false);
  const [colorId, setColorId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateColor());
    dispatch(getColors());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };

  const colorState = useSelector((state) => state.color.colors);
  console.log(colorState);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name:
        colorState[i].title.charAt(0).toUpperCase() +
        colorState[i].title.slice(1),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteColor(e));
    setOpenModel(false);
    await dispatch(getColors());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Color</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(colorId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default ListColor;
