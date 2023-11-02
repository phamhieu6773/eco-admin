import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/all-enquiry`);
  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axiosJWT.delete(
    `${base_url}enquiry/delete-enquiry/${id}`
  );
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await axiosJWT.put(
    `${base_url}enquiry/update-enquiry/${enq.id}`,
    { status: enq.enqData }
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  getEnquiry,
  udpateEnquiry,
  deleteEnquiry,
};

export default enquiryService;
