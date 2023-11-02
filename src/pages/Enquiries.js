import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquiry, getEnquiries } from "../features/enquiry/enquirySlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const [openModel, setOpenModel] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  console.log(enquiryState);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Đã giải quyết"
            }
            className="form-control form-select"
            id=""
            // onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Đã giải quyết">Đã giải quyết</option>
            <option value="Đã gửi">Đã gửi</option>
            <option value="Đã liên hệ">Đã liên hệ</option>
            <option value="Trong tiến trình">Trong tiến trình</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/enquiries/${enquiryState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteEnquiry(e));
    setOpenModel(false);
    await dispatch(getEnquiries());
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(enquiryId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
