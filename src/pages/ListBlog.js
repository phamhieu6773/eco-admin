import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogs,
  resetStateBlog,
  deleteBlog,
} from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ListBlog = () => {
  const [openModel, setOpenModel] = useState(false);
  const [blogId, setBlogId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateBlog());
    dispatch(getBlogs());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };

  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link
            to={`/admin/add-blogs/${blogState[i].id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i].id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteBlog(e));
    setOpenModel(false);
    await dispatch(getBlogs());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Blog</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default ListBlog;
