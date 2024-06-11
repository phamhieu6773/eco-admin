import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Enquiries from "./pages/Enquiries";
import ListBlog from "./pages/ListBlog";
import ListColor from "./pages/ListColor";
import ListCategory from "./pages/ListCategory";
import ListProduct from "./pages/ListProduct";
import ListBrand from "./pages/ListBrand";
import ListVoucher from "./pages/ListVoucher";
import Orders from "./pages/Orders";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import ListBlogCat from "./pages/ListBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddVoucher from "./pages/AddVoucher";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import ApproveStore from "./pages/ApproveStore";
import UpdateStore from "./pages/UpdateStore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="approveStore" element={<ApproveStore />} />
          <Route path="approveStore/:id" element={<UpdateStore />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="list-blogs" element={<ListBlog />} />
          <Route path="blogs-category" element={<ListBlogCat />} />
          <Route path="list-colors" element={<ListColor />} />
          <Route path="list-category" element={<ListCategory />} />
          <Route path="add-category" element={<AddCat />} />
          <Route path="add-category/:id" element={<AddCat />} />
          <Route path="list-products" element={<ListProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="list-brand" element={<ListBrand />} />
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="add-brand/:id" element={<AddBrand />} />
          <Route path="add-voucher" element={<AddVoucher />} />
          <Route path="add-voucher/:id" element={<AddVoucher />} />
          <Route path="list-vouchers" element={<ListVoucher />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="add-blogs" element={<AddBlog />} />
          <Route path="add-blogs/:id" element={<AddBlog />} />
          <Route path="add-blogs-cat" element={<AddBlogCat />} />
          <Route path="add-blogs-cat/:id" element={<AddBlogCat />} />
          <Route path="add-color" element={<AddColor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
