import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, resetStateAuth } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    dispatch(resetStateAuth());
    dispatch(getOrders({orderStatus: selectedStatus}));
  }, [selectedStatus]);

  const statusOrder = [
    "Tất cả",
    "Chưa xử lý",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Giao hàng thành công",
    "Đã Hủy",
  ];
  const handleStatusClick = (data) => {
    setSelectedStatus(data);
  };

  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i].user.firstname?.charAt(0).toUpperCase() +
        orderState[i].user.firstname?.slice(1) +
        " " +
        orderState[i].user.lastname?.charAt(0).toUpperCase() +
        orderState[i].user.lastname?.slice(1),
      product: (
        <Link to={`/admin/orders/${orderState[i]._id}`}>
          {orderState[i]?.orderItems?.map((i) => i?.product?.title).join(", ")}
        </Link>
      ),
      amount: orderState[i].totalPriceAfterDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/orders/${orderState[i]._id}`} className=" fs-3 text-danger">
            <BiSolidEdit />
          </Link>
          {/* <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link> */}
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="row mb-2">
          <div className="col-12 d-flex justify-content-around status-order">
            {statusOrder?.map((item, index) => (
              <Link
                to="/admin/orders"
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
        </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
