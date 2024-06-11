import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import colorReducer from "../features/color/colorSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import voucherReducer from "../features/voucher/voucherSlice";
import blogReducer from "../features/blog/blogSlice";
import bcateogryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import storeReducer from "../features/store/storeSlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    color: colorReducer,
    pcategory: pcategoryReducer,
    voucher: voucherReducer,
    blog: blogReducer,
    bcategory: bcateogryReducer,
    enquiry: enquiryReducer,
    store: storeReducer,
    upload: uploadReducer,
  },
});
