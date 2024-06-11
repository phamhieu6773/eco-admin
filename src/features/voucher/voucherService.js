import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getVouchers = async () => {
  const response = await axiosJWT.get(`${base_url}voucher/all-vouchers`);
  return response.data;
};

const createVoucher = async (voucher) => {
  const response = await axiosJWT.post(`${base_url}voucher/create`, voucher);
  return response.data;
};

const getVoucher = async (id) => {
  const response = await axiosJWT.get(`${base_url}voucher/${id}`);
  return response.data;
};

const updateVoucher = async (voucher) => {
  const response = await axiosJWT.put(
    `${base_url}voucher/update/${voucher.id}`,
    {
      name: voucher.voucherData.name,
      expiry: voucher.voucherData.expiry,
      discount: voucher.voucherData.discount,
      number: voucher.voucherData.number
    }
  );
  return response.data;
};

const deleteVoucher = async (id) => {
  const response = await axiosJWT.delete(`${base_url}voucher/delete/${id}`);
  return response.data;
};

const voucherService = {
  getVouchers,
  createVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
};

export default voucherService;
