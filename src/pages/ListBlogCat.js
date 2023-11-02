import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBCategory,
  getBCategorys,
  resetStateBCategory,
} from "../features/bcategory/bcategorySlice";
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
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ListBlogCat = () => {
  const [openModel, setOpenModel] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateBCategory());
    dispatch(getBCategorys());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setBlogCatId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const bcategoryState = useSelector((state) => state.bcategory.bcategorys);
  console.log(bcategoryState);
  const data1 = [];
  for (let i = 0; i < bcategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: bcategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/add-blogs-cat/${bcategoryState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bcategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteBCategory(e));
    setOpenModel(false);
    await dispatch(getBCategorys());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Blog Category</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default ListBlogCat;
