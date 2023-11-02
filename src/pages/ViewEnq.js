import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiry,
  resetStateEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getEnqId !== undefined) {
      dispatch(getEnquiry(getEnqId));
    } else {
      dispatch(resetStateEnquiry());
    }
  }, [getEnqId]);
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;
  const goBack = () => {
    dispatch(resetStateEnquiry());
    navigate(-1);
  };
  const setEnquiryStatus = async (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    await dispatch(updateEnquiry(data));
    await dispatch(resetStateEnquiry());
    // setTimeout(() => {
    await dispatch(getEnquiry(getEnqId));
    // }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              value={enqStatus}
              // defaultValue={enqStatus ? enqStatus : "Đã gửi"}
              className="form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Đã giải quyết">Đã giải quyết</option>
              <option value="Đã gửi">Đã gửi</option>
              <option value="Đã liên hệ">Đã liên hệ</option>
              <option value="Trong tiến trình">Trong tiến trình</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
