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
    getItem("Add Product", "add-products", <IoMdAddCircle className="fs-4" />),
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
    getItem("Add Vocher", "add-vouchers", <IoMdAddCircle className="fs-4" />),
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
          <h2>
            <span className="sm-logo">DB</span>
            <span className="lg-logo">Dashboard</span>
          </h2>
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
                  src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-1/165265198_491391515374037_3525950762385328428_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=obTHoj8DYDgAX8e6PDm&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAaq9gDrBvncR07cVOSkTvJOt0y895oMtkiWQmhRE-7qw&oe=6520B17D"
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
