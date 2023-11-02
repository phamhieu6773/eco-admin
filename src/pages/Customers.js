import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  resetStateCustomer,
} from "../features/customer/customerSlice";

const columns = [
  // {
  //   title: "STT",
  //   dataIndex: "key",
  // },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];
const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hello");
    dispatch(resetStateCustomer());
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        // key: j + 1,
        name:
          customerstate[i].firstname.charAt(0).toUpperCase() +
          customerstate[i].firstname.slice(1) +
          " " +
          customerstate[i].lastname.charAt(0).toUpperCase() +
          customerstate[i].lastname.slice(1),

        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Customser</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
