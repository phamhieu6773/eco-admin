import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiry,
  resetStateEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { getaStore, resetStateStore, updateStatusStore } from "../features/store/storeSlice";

const UpdateStore = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getStoreId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getStoreId !== undefined) {
      dispatch(getaStore(getStoreId));
    } else {
      dispatch(resetStateStore());
    }
  }, [getStoreId]);
  const storeState = useSelector((state) => state.store.store);
  console.log(storeState);
//   const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = storeState;
  const goBack = () => {
    dispatch(resetStateStore());
    navigate(-1);
  };
  const setStoreStatus = async (e, i) => {
    console.log(e, i);
    const data = { id: i, status: e, owner: storeState?.owner };
    await dispatch(updateStatusStore(data));
    await dispatch(resetStateStore());
    setTimeout(() => {
        dispatch(getaStore(getStoreId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Store</h3>
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
          <p className="mb-0">{storeState?.storeName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${storeState?.phone}`}>{storeState?.phone}</a>
          </p>
        </div>
        {/* <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{enqEmail}`}>{enqEmail}</a>
          </p>
        </div> */}
        {/* <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div> */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{storeState?.status}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              value={storeState?.status}
              // defaultValue={enqStatus ? enqStatus : "Đã gửi"}
              className="form-control form-select"
              id=""
              onChange={(e) => setStoreStatus(e.target.value, getStoreId)}
            >
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đã phê duyệt">Đã phê duyệt</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStore;
