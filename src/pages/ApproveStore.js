import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquiry, getEnquiries } from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { getStores } from "../features/store/storeSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Name Store",
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
const ApproveStore = () => {
  const [openModel, setOpenModel] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    dispatch(getStores({status: selectedStatus}));
  }, [selectedStatus]);

  const statusStore = [
    "Tất cả",
    "Chờ xử lý",
    "Đã phê duyệt",
  ];
  const handleStatusClick = (data) => {
    setSelectedStatus(data);
  };
  useEffect(() => {
    dispatch(getStores());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const storeState = useSelector((state) => state.store.stores);
  console.log(storeState);
  const data1 = [];
  for (let i = 0; i < storeState.length; i++) {
    data1.push({
      key: i + 1,
      name: storeState[i].storeName,
      email: storeState[i]?.owner?.email,
      mobile: storeState[i]?.owner?.mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              storeState[i].status ? storeState[i].status : "Đã giải quyết"
            }
            className="form-control form-select"
            id=""
            // onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Đã phê duyệt">Đã phê duyệt</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/approveStore/${storeState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Approve Store</h3>
      <div>
      <div className="col-12 d-flex justify-content-around status-order">
            {statusStore?.map((item, index) => (
              <Link
                to="/admin/approveStore"
                key={index}
                className={
                  selectedStatus === item ? "status-order-selected" : ""
                }
                onClick={() => handleStatusClick(item)}
              >
                {item}
              </Link>
            ))}
          </div>
        <Table columns={columns} dataSource={data1} />
      </div>
      {/* <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(enquiryId);
        }}
        title="Are you sure you want to delete this enquiry?"
      /> */}
    </div>
  );
};

export default ApproveStore;
