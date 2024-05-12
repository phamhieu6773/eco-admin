import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiry,
  resetStateEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import OrderItem from "../components/OrderItem";
import { getAOrder, resetStateAuth, updateOrderStatus } from "../features/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getOrderId !== undefined) {
      dispatch(getAOrder(getOrderId));
    } else {
      // dispatch(resetStateAuth());
    }
  }, [getOrderId]);

  const orderState = useSelector((state) => state.auth);
  const { shippingInfo, orderItems, userInfo } = orderState;
  // const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;
  const goBack = () => {
    // dispatch(resetStateEnquiry());
    navigate(-1);
  };
  const setOrderStatus = async (e, i) => {
    console.log(e, i);
    const data = { id: i, orderStatus: e };
    console.log(data);
    await dispatch(updateOrderStatus(data));
    // await dispatch(resetStateEnquiry());
    setTimeout(() => {
      dispatch(getAOrder(getOrderId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Order</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-2 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center justify-content-end gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              value={orderState?.order?.orderStatus}
              defaultValue={orderState?.order?.orderStatus ? orderState?.order?.orderStatus : "Chưa xử lý"}
              className="form-control form-select"
              id=""
              onChange={(e) => setOrderStatus(e.target.value, orderState?.order?._id)}
            >
              <option value="Chưa xử lý">Chưa xử lý</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Giao hàng thành công">Giao hàng thành công</option>
              <option value="Đã Hủy">Đã Hủy</option>
            </select>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-4 sub-title">Order Items</h3>
          </div>
          <OrderItem orderItems={orderItems} />
          <div className="d-flex justify-content-end align-items-center text-align-center-center bg-white p-1">
            <span style={{ fontSize: "16px", marginRight: "8px" }}>
              Tổng tiền:{" "}
            </span>
            <p style={{ color: "red", fontSize: "18px", margin: "0" }}>
              {Intl.NumberFormat("vi-VN").format(orderState?.order?.totalPriceAfterDiscount)}
            </p>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-4 sub-title">Shipping Infor</h3>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Name:</h6>
            <p className="mb-0">
              {shippingInfo?.firstName} {shippingInfo?.lastName}
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Mobile:</h6>
            <p className="mb-0">
              <a href={`tel:+84${userInfo?.mobile}`}>{userInfo?.mobile}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Email:</h6>
            <p className="mb-0">
              <a href={`mailto:{userInfo?.email}`}>{userInfo?.email}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Address:</h6>
            <p className="mb-0">
              {shippingInfo?.address}, {shippingInfo?.city},{" "}
              {shippingInfo?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
