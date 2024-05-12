import React from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteProductFromCart,
  getCart,
  updateProductFromCart,
} from "../features/user/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import watch from "../images/watch2.jpg";
import { BsSearch } from "react-icons/bs";

const OrderItem = (props) => {
  const dispatch = useDispatch();
  const { orderItems } = props;

  return (
    <>
      {orderItems?.map((element) => {
        return (
          <div className="cart-data py-3 d-flex  justify-content-between align-items-center bg-white border-bottom">
            <div className="col-6 gap-15 d-flex align-items-center ">
              <div className="w-25">
                <img
                  src={element?.product?.images[0].url}
                  className="img-fluid"
                  alt="product image"
                />
              </div>
              <div className="w-75 ms-2">
                <div className="">
                  <span>{element?.product?.title}</span>
                </div>
                <div className="d-flex">
                  <span>Quantity: </span>
                  <span className="ps-1">{element?.quantity}</span>
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <h5 className="price">
                {Intl.NumberFormat("vi-VN").format(element?.price)}
              </h5>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderItem;
