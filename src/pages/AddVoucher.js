import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  createBCategory,
  resetStateBCategory,
} from "../features/bcategory/bcategorySlice";
import { useFormik } from "formik";
import {
  createVoucher,
  getVoucher,
  resetStateVoucher,
  updateVoucher,
} from "../features/voucher/voucherSlice";
import { logDOM } from "@testing-library/react";
import { useLocation } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required("Voucher Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const AddVoucher = () => {
  const dispatch = new useDispatch();
  const location = useLocation();
  const getIdVoucher = location.pathname.split("/")[3];
  const newVoucher = useSelector((state) => state.voucher);
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-GB");
    const [day, month, year] = newDate.split("/");
    return [year, month, day].join("-");
  };
  const {
    isSuccess,
    isError,
    isLoading,
    createdVoucher,
    voucherName,
    voucherDiscount,
    voucherExpiry,
    updatedVouher,
  } = newVoucher;
  console.log("voucherExpiry", voucherExpiry);

  useEffect(() => {
    if (getIdVoucher !== undefined) {
      dispatch(getVoucher(getIdVoucher));
    } else {
      dispatch(resetStateVoucher());
    }
  }, [getIdVoucher]);

  useEffect(() => {
    if (isSuccess && createdVoucher) {
      message.success("Voucher Added Successfullly!");
    }

    if (isSuccess && updatedVouher) {
      message.success("Voucher Updated Successfully!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdVoucher]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: voucherName || "",
      expiry: changeDateFormet(voucherExpiry) || "",
      discount: voucherDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getIdVoucher !== undefined) {
        const data = { id: getIdVoucher, voucherData: values };
        dispatch(updateVoucher(data));
        dispatch(resetStateVoucher());
      } else {
        dispatch(createVoucher(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetStateVoucher);
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Voucher</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="name"
          onCh={formik.handleChange("name")}
          onBl={formik.handleBlur("name")}
          val={formik.values.name}
          label="Enter Voucher Name"
          id="name"
        />
        <div className="error">{formik.touched.name && formik.errors.name}</div>
        <CustomInput
          type="date"
          name="expiry"
          onCh={formik.handleChange("expiry")}
          onBl={formik.handleBlur("expiry")}
          val={formik.values.expiry}
          label="Enter Expiry Data"
          id="date"
        />
        <div className="error">
          {formik.touched.expiry && formik.errors.expiry}
        </div>
        <CustomInput
          type="number"
          name="discount"
          onCh={formik.handleChange("discount")}
          onBl={formik.handleBlur("discount")}
          val={formik.values.discount}
          label="Enter Discount"
          id="discount"
        />
        <div className="error">
          {formik.touched.discount && formik.errors.discount}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getIdVoucher !== undefined ? "Edit" : "Add"} Voucher
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;
