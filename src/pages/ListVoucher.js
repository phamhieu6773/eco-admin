import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVoucher,
  getVouchers,
  resetStateVoucher,
} from "../features/voucher/voucherSlice";
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
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ListVoucher = () => {
  const [openModel, setOpenModel] = useState(false);
  const [voucherId, setVoucherId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateVoucher());
    dispatch(getVouchers());
  }, []);
  const showModal = (e) => {
    setOpenModel(true);
    setVoucherId(e);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const voucherState = useSelector((state) => state.voucher.vouchers);
  console.log(voucherState);

  const data1 = [];
  for (let i = 0; i < voucherState.length; i++) {
    data1.push({
      key: i + 1,
      name:
        voucherState[i].name.charAt(0).toUpperCase() +
        voucherState[i].name.slice(1),
      discount: voucherState[i].discount + "%",
      expiry: new Date(voucherState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/add-voucher/${voucherState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiSolidEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(voucherState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDelete = async (e) => {
    console.log(e);
    await dispatch(deleteVoucher(e));
    setOpenModel(false);
    await dispatch(getVouchers());
  };
  return (
    <div>
      <h3 className="mb-4 title">List Voucher</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>{" "}
      <CustomModal
        open={openModel}
        onCancel={hideModal}
        onOk={() => {
          handleDelete(voucherId);
        }}
        title="Are you sure you want to delete this voucher?"
      />
    </div>
  );
};

export default ListVoucher;
