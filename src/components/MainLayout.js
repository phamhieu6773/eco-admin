import React, { useEffect } from "react";
import { BiSolidDiscount } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { CiDiscount1, CiBoxList } from "react-icons/ci";
import { BsCartCheck, BsFillCartCheckFill } from "react-icons/bs";
import { IoIosNotifications, IoMdAddCircle } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { SiBrandfolder } from "react-icons/si";
import { FaBlog, FaClipboardList, FaListUl } from "react-icons/fa";
import {
  MdOutlineCategory,
  MdOutlineColorLens,
  MdDashboardCustomize,
  MdPeopleAlt,
} from "react-icons/md";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  resetStateCustomer,
} from "../features/customer/customerSlice";
import useSelection from "antd/es/table/hooks/useSelection";
import axios from "axios";
import { base_url } from "../utils/base_url";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "", <MdDashboardCustomize className="fs-4" />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  getItem("Customers", "customers", <MdPeopleAlt className="fs-4" />),

  getItem("Product", "products", <GrProductHunt className="fs-4" />, [
    getItem("Add Product", "add-product", <IoMdAddCircle className="fs-4" />),
    getItem("List Product", "list-products", <FaListUl className="fs-4" />),
    getItem("Add Brand", "add-brand", <SiBrandfolder className="fs-4" />),
    getItem("List Brand", "list-brand", <FaListUl className="fs-4" />),
    getItem(
      "Add Category",
      "add-category",
      <MdOutlineCategory className="fs-4" />
    ),
    getItem("List Category", "list-category", <FaListUl className="fs-4" />),
    getItem("Add Color", "add-color", <MdOutlineColorLens className="fs-4" />),
    getItem("List Color", "list-colors", <FaListUl className="fs-4" />),
  ]),
  getItem("Orders", "orders", <BsFillCartCheckFill className="fs-4" />),
  getItem("Voucher", "vouchers", <BiSolidDiscount className="fs-4" />, [
    getItem("Add Vocher", "add-voucher", <IoMdAddCircle className="fs-4" />),
    getItem("List Voucher", "list-vouchers", <FaListUl className="fs-4" />),
  ]),
  getItem("Blog", "blogs", <FaBlog className="fs-4" />, [
    getItem("Add Blog", "add-blogs", <IoMdAddCircle className="fs-4" />),
    getItem("List Blog", "list-blogs", <FaListUl className="fs-4" />),
    getItem(
      "Add Blog Category",
      "add-blogs-cat",
      <IoMdAddCircle className="fs-4" />
    ),
    getItem(
      "List Blog Category",
      "blogs-category",
      <FaListUl className="fs-4" />
    ),
  ]),
  getItem("Enquiries", "enquiries", <FaClipboardList className="fs-4" />),
];
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatch = useDispatch();
  // const checkUser = async () => {
  //   await dispatch(resetStateCustomer());
  //   await dispatch(getUser(JSON.parse(localStorage.getItem("user"))?._id));
  // };
  // useEffect(() => {
  //   checkUser();
  // }, []);

  const userState = useSelector((state) => state.customer);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        breakpoint="md"
      >
        <div className="logo-vertical d-flex align-items-center justify-content-center">
          <span className="sm-logo">
            <svg
              className="css-ze2te4 css-qd6ojx"
              viewBox="0 0 76.08695652173914 61.445916138444716"
              width="40px"
              height="55px"
            >
              <g
                transform="translate(-1.2820241166542783, -10.962485790234414) scale(0.7865178652789495)"
                className="css-1e98oqk"
                fill="#ffffff"
              >
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="42.021,89.823 98.369,53.589 82.566,61.219 82.574,61.292 82.527,61.238 82.264,61.365 82.281,61.389 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="79.395,61.174 38.895,57.391 36.811,91.25 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="3.71,38.712 34.918,92.062 37.066,57.146 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="95.209,45.172 80.775,27.29 79.232,32.516 95.928,46.175 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="98.135,50.979 79.758,35.645 82.281,58.632 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="61.512,33.498 79.758,54.504 77.424,33.356 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="59.756,34.836 39.467,54.979 80.432,58.808 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="58.445,33.191 36.674,27.365 38.974,52.971 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="37.133,54.393 34.822,28.537 6.776,37.639 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="8.923,35.031 34.527,26.292 25.659,19.867 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="1.63,26.184 3.25,37.485 20.957,21.022 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="28.355,14.604 7.837,21.987 26.101,17.109 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="36.751,24.86 60.131,31.196 77.148,30.907 78.672,25.749 67.951,19.853 48.173,14.486 32.256,13.938 28.073,18.586   "
                ></polygon>
              </g>
            </svg>
          </span>
          <span className="lg-logo">
            <svg
              viewBox="0 0 369.9130434782609 61.445916138444716"
              preserveAspectRatio="xMidYMid meet"
              className="css-8aabad"
              id="fgdgabgb"
              width="200px"
              height="55px"
            >
              <defs id="SvgjsDefs1643"></defs>
              <g
                id="SvgjsG1644"
                featurekey="symbolFeature-0"
                transform="matrix(0.7865178652789495,0,0,0.7865178652789495,-1.2820241166542783,-10.962485790234414)"
                fill="#fff"
              >
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="42.021,89.823 98.369,53.589 82.566,61.219 82.574,61.292 82.527,61.238 82.264,61.365 82.281,61.389 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="79.395,61.174 38.895,57.391 36.811,91.25 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="3.71,38.712 34.918,92.062 37.066,57.146 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="95.209,45.172 80.775,27.29 79.232,32.516 95.928,46.175 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="98.135,50.979 79.758,35.645 82.281,58.632 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="61.512,33.498 79.758,54.504 77.424,33.356 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="59.756,34.836 39.467,54.979 80.432,58.808 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="58.445,33.191 36.674,27.365 38.974,52.971 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="37.133,54.393 34.822,28.537 6.776,37.639 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="8.923,35.031 34.527,26.292 25.659,19.867 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="1.63,26.184 3.25,37.485 20.957,21.022 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="28.355,14.604 7.837,21.987 26.101,17.109 "
                ></polygon>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  points="36.751,24.86 60.131,31.196 77.148,30.907 78.672,25.749 67.951,19.853 48.173,14.486 32.256,13.938 28.073,18.586   "
                ></polygon>
              </g>
              <g
                id="SvgjsG1645"
                featurekey="nameFeature-0"
                transform="matrix(1.1137493776990417,0,0,1.1137493776990417,94.25976659734525,4.1679670949572625)"
                fill="#fff"
              >
                <path d="M1.5625 8.515999999999998 l18.887 0 l0 6.2891 l-12.578 0 l0 6.3086 l9.4336 0 l0 6.2891 l-9.4336 0 l0 6.2891 l12.578 0 l0 6.3086 l-12.578 0 l-6.3086 0 l0 -31.484 z M38.49640625 8.359000000000002 l-0.019531 0.078125 c2.1875 0 4.2383 0.41016 6.1719 1.25 s3.6328 1.9727 5.0977 3.3984 l-4.4922 4.4922 c-1.8945 -1.875 -4.1406 -2.8125 -6.7383 -2.8125 c-2.6367 0 -4.8828 0.9375 -6.7383 2.8125 s-2.793 4.1211 -2.793 6.7383 c0 2.6367 0.9375 4.8828 2.793 6.7383 s4.1016 2.793 6.7383 2.793 s4.8828 -0.9375 6.7578 -2.8125 l4.4922 4.4922 c-1.4648 1.4453 -3.1641 2.5781 -5.0977 3.418 s-3.9844 1.25 -6.1719 1.25 c-4.375 0 -8.125 -1.5625 -11.23 -4.668 s-4.668 -6.8555 -4.668 -11.23 s1.5625 -8.125 4.668 -11.25 s6.8555 -4.6875 11.23 -4.6875 z M67.20734375 8.359000000000002 c4.375 0 8.125 1.5625 11.25 4.6875 s4.6875 6.875 4.6875 11.25 s-1.5625 8.125 -4.6875 11.23 s-6.875 4.668 -11.25 4.668 s-8.125 -1.5625 -11.23 -4.668 s-4.668 -6.8555 -4.668 -11.23 s1.5625 -8.125 4.668 -11.25 s6.8555 -4.6875 11.23 -4.6875 z M67.20734375 14.707 c-2.6367 0 -4.8828 0.9375 -6.7383 2.8125 s-2.793 4.1211 -2.793 6.7383 c0 2.6367 0.9375 4.8828 2.793 6.7383 s4.1016 2.793 6.7383 2.793 c2.6172 0 4.8633 -0.9375 6.7383 -2.793 s2.8125 -4.1016 2.8125 -6.7383 c0 -2.6172 -0.9375 -4.8633 -2.8125 -6.7383 s-4.1211 -2.8125 -6.7383 -2.8125 z M85.44921875 7.93 l15.352 21.055 l15.352 -21.055 l0 32.07 l-6.3086 0 l0 -12.988 l-9.043 12.48 l-9.043 -12.48 l0 12.988 l-6.3086 0 l0 -32.07 z M119.27734375 7.93 l15.352 21.055 l15.352 -21.055 l0 32.07 l-6.3086 0 l0 -12.988 l-9.043 12.48 l-9.043 -12.48 l0 12.988 l-6.3086 0 l0 -32.07 z M153.10546875 8.515999999999998 l18.887 0 l0 6.2891 l-12.578 0 l0 6.3086 l9.4336 0 l0 6.2891 l-9.4336 0 l0 6.2891 l12.578 0 l0 6.3086 l-12.578 0 l-6.3086 0 l0 -31.484 z M174.921875 40 l-0.019531 -31.523 l10.234 0 c3.0273 0 6.0156 1.0547 8.1836 3.2227 s3.0469 4.1992 3.0469 7.2266 l0 0.97656 c0 2.3438 -0.66406 4.0625 -1.9922 5.9375 s-2.4414 2.4219 -4.5117 3.2031 l7.1094 10.957 l-7.6953 0 l-8.0469 -12.305 l0 12.305 l-6.3086 0 z M181.210975 23.633 l4.5117 0.019531 c1.3086 0 1.9727 -0.33203 2.8906 -1.25 s1.25 -1.9727 1.25 -3.2813 c0 -1.2891 -0.33203 -2.1484 -1.25 -3.0859 s-2.5586 -1.2695 -3.8672 -1.2695 l-3.5352 0 l0 8.8672 z M215.01984375 8.359000000000002 l-0.019531 0.078125 c2.1875 0 4.2383 0.41016 6.1719 1.25 s3.6328 1.9727 5.0977 3.3984 l-4.4922 4.4922 c-1.8945 -1.875 -4.1406 -2.8125 -6.7383 -2.8125 c-2.6367 0 -4.8828 0.9375 -6.7383 2.8125 s-2.793 4.1211 -2.793 6.7383 c0 2.6367 0.9375 4.8828 2.793 6.7383 s4.1016 2.793 6.7383 2.793 s4.8828 -0.9375 6.7578 -2.8125 l4.4922 4.4922 c-1.4648 1.4453 -3.1641 2.5781 -5.0977 3.418 s-3.9844 1.25 -6.1719 1.25 c-4.375 0 -8.125 -1.5625 -11.23 -4.668 s-4.668 -6.8555 -4.668 -11.23 s1.5625 -8.125 4.668 -11.25 s6.8555 -4.6875 11.23 -4.6875 z M228.61328125 8.515999999999998 l18.887 0 l0 6.2891 l-12.578 0 l0 6.3086 l9.4336 0 l0 6.2891 l-9.4336 0 l0 6.2891 l12.578 0 l0 6.3086 l-12.578 0 l-6.3086 0 l0 -31.484 z"></path>
              </g>
            </svg>
          </span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-end ps-5 pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  className="rounded"
                  width={32}
                  height={32}
                  src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/165265198_491391515374037_3525950762385328428_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_ohc=l8hsJlwwkNEAX8qHSIA&_nc_ht=scontent-hkg4-1.xx&oh=00_AfA3R7Hr8etPSitIQJhn0Th_SmHckq5C6X3RqqSicpnW2g&oe=6558AFB7"
                  alt="avatar"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Phạm Hiếu</h5>
                <p className="mb-0">phamngochieu2001gl@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <form>
                    <button
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={() => {
                        localStorage.removeItem("user");
                      }}
                    >
                      Signout
                    </button>
                  </form>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default MainLayout;
