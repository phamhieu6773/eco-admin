import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
import axiosJWT from "../../utils/axiosconfig";

const getStores = async (params) => {
  const response = await axiosJWT.get(`${base_url}store/all-stores`, {...config, params});
  return response.data;
};

// const getOrders = async (params) => {
//   const response = await axiosJWT.get(`${base_url}user/cart/getallorders`,  {...config, params});
//   return response.data;
// };
const getaStore = async (id) => {
  const response = await axiosJWT.get(`${base_url}store/${id}`);
  return response.data;
};

const updateStatusStore = async (store) => {
  const response = await axiosJWT.put(
    `${base_url}user/updateStatusStore/${store?.id}`,
    {
      status: store.status,
      owner: store.owner
    }
  );
  return response.data;
};

// const getEnquiry = async (id) => {
//   const response = await axios.get(`${base_url}enquiry/${id}`);
//   return response.data;
// };
// const udpateEnquiry = async (enq) => {
//   const response = await axiosJWT.put(
//     `${base_url}enquiry/update-enquiry/${enq.id}`,
//     { status: enq.enqData }
//   );
//   return response.data;
// };

const storeService = {
  getStores,
  getaStore,
  updateStatusStore
};

export default storeService;
