import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, resetStateAuth } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

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
  useEffect(() => {
    dispatch(resetStateAuth());
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i].orderby.firstname?.charAt(0).toUpperCase() +
        orderState[i].orderby.firstname?.slice(1) +
        " " +
        orderState[i].orderby.lastname?.charAt(0).toUpperCase() +
        orderState[i].orderby.lastname?.slice(1),
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          {orderState[i]?.products?.map((i) => i?.product?.title).join(", ")}
        </Link>
      ),
      amount:
        orderState[i].paymentIntent.amout +
        " " +
        orderState[i].paymentIntent.currency,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiSolidEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
