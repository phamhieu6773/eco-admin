// import React, { useEffect } from "react";
// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { Column } from "@ant-design/plots";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "../features/customer/customerSlice";
// import { FaThList } from "react-icons/fa";
// import { FaCartPlus } from "react-icons/fa";
// import { getOrders } from "../features/auth/authSlice";
// // import Column from "antd/es/table/Column";
// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Status",
//     dataIndex: "staus",
//   },
// ];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     staus: `London, Park Lane no. ${i}`,
//   });
// }
// const Dashboard = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getOrders());
//   }, [])
//   const orderState = useSelector((state) => state.auth.orders);
//   console.log(orderState);
//   const data = [
//     {
//       type: "Jan",
//       sales: 38,
//     },
//     {
//       type: "Feb",
//       sales: 52,
//     },
//     {
//       type: "Mar",
//       sales: 61,
//     },
//     {
//       type: "Apr",
//       sales: 145,
//     },
//     {
//       type: "May",
//       sales: 48,
//     },
//     {
//       type: "Jun",
//       sales: 38,
//     },
//     {
//       type: "July",
//       sales: 38,
//     },
//     {
//       type: "Aug",
//       sales: 38,
//     },
//     {
//       type: "Sept",
//       sales: 38,
//     },
//     {
//       type: "Oct",
//       sales: 38,
//     },
//     {
//       type: "Nov",
//       sales: 38,
//     },
//     {
//       type: "Dec",
//       sales: 38,
//     },
//   ];
//   const config = {
//     data,
//     xField: "type",
//     yField: "sales",
//     color: ({ type }) => {
//       return "#6052f6";
//     },
//     label: {
//       position: "middle",
//       style: {
//         fill: "#FFFFFF",
//         opacity: 1,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: {
//         alias: "Month",
//       },
//       sales: {
//         alias: "Income",
//       },
//     },
//   };
//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3 row">
//         <div className="d-flex rounded-2  align-items-center flex-grow-1 bg-white p-3 roudned-3 col-lg ">
//           <FaThList style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Total Products</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//         <div className="d-flex rounded-2  align-items-center flex-grow-1 bg-white p-3 roudned-3 col-lg ">
//           <FaCartPlus style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Orders</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//         {/* <div className="d-flex rounded-2 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 col-lg">
//           <div>
//             <p className="desc">Total</p>
//             <h4 className="mb-0 sub-title">$1100</h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <h6 className="green">
//               <BsArrowDownRight /> 32%
//             </h6>
//             <p className="mb-0 desc">Compared To April 2022</p>
//           </div>
//         </div> */}
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-4 title">Income Statics</h3>
//         <div className="bg-white p-3 rounded-3">
//           <Column {...config} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-4 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { Column } from "@ant-design/plots";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders } from "../features/auth/authSlice";
// import { FaThList } from "react-icons/fa";
// import { FaCartPlus } from "react-icons/fa";
// import { DatePicker, Space } from 'antd';


// // Cấu hình cột của bảng
// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
// ];

// // Dữ liệu mẫu cho bảng
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [salesData, setSalesData] = useState([]);
//   const [year, setYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     dispatch(getOrders());
//   }, []);

//   const onChange = (date, dateString) => {
//     setYear(dateString);
//     dispatch(getOrders({year: dateString}));
//   };
//   const orderState = useSelector((state) => state.auth.orders);

//   const formatVND = (value) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
//   };
//   useEffect(() => {
//     if (orderState.length) {
//       // Khởi tạo dữ liệu doanh thu cho tất cả các tháng với giá trị mặc định là 0
//       const initialRevenue = Array.from({ length: 12 }, (_, i) => ({
//         type: `${i + 1}-${year}`,
//         sales: 0,
//       }));

//       // Tính tổng doanh thu theo tháng
//       const revenueByMonth = orderState.reduce((acc, order) => {
//         const month = new Date(order.createdAt).getMonth(); // Lấy tháng từ createdAt
//         acc[month].sales += order.totalPriceAfterDiscount;
//         return acc;
//       }, initialRevenue);

//       // Chuyển đổi dữ liệu thành định dạng cho biểu đồ
//       const chartData = revenueByMonth.map((item) => ({
//         type: item.type,
//         sales: item.sales,
//       }));

//       setSalesData(chartData);
//     }else{
//       const initialRevenue = Array.from({ length: 12 }, (_, i) => ({
//         type: `${i + 1}-${year}`,
//         sales: 0,
//       }));
//       setSalesData(initialRevenue);
//     }
//   }, [orderState]);

//   // Cấu hình biểu đồ
//   const config = {
//     data: salesData,
//     xField: "type",
//     yField: "sales",
//     color: ({ type }) => {
//       return "#6052f6";
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: {
//         alias: "Month",
//       },
//       sales: {
//         alias: "Income",
//         formatter: (value) => formatVND(value),
//       },
//     },
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3 row">
//         <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
//           <FaThList style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Total Products</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//         <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
//           <FaCartPlus style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Orders</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//       </div>
      
//       <div className="mt-4">
//         <div className="d-flex">
//         <h3 className="mb-4 me-4 title">Income Statistics</h3>
//         <DatePicker onChange={onChange} picker="year" style={{height: "35px"}} />
//         </div>
//         <div className="bg-white p-3 rounded-3">
//           <Column {...config} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-4 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { Column } from "@ant-design/plots";
// import { Table, DatePicker } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders } from "../features/auth/authSlice";
// import { FaThList } from "react-icons/fa";
// import { FaCartPlus } from "react-icons/fa";
// import moment from "moment";

// // Cấu hình cột của bảng
// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
// ];

// // Dữ liệu mẫu cho bảng
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [salesData, setSalesData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(moment());

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);

//   const onChange = (date, dateString) => {
//     if (date) {
//       setSelectedDate(date);
//       dispatch(getOrders({ month: date.month() + 1, year: date.year() }));
//     }
//   };

//   const orderState = useSelector((state) => state.auth.orders);

//   const formatVND = (value) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
//   };

//   useEffect(() => {
//     if (orderState.length) {
//       // Khởi tạo dữ liệu doanh thu cho tất cả các ngày trong tháng với giá trị mặc định là 0
//       const daysInMonth = selectedDate.daysInMonth();
//       const initialRevenue = Array.from({ length: daysInMonth }, (_, i) => ({
//         type: `${i + 1}-${selectedDate.month() + 1}-${selectedDate.year()}`,
//         sales: 0,
//       }));

//       // Tính tổng doanh thu theo ngày
//       const revenueByDay = orderState.reduce((acc, order) => {
//         const day = new Date(order.createdAt).getDate(); // Lấy ngày từ createdAt
//         acc[day - 1].sales += order.totalPriceAfterDiscount;
//         return acc;
//       }, initialRevenue);

//       // Chuyển đổi dữ liệu thành định dạng cho biểu đồ
//       const chartData = revenueByDay.map((item) => ({
//         type: item.type,
//         sales: item.sales,
//       }));

//       setSalesData(chartData);
//     } else {
//       const daysInMonth = selectedDate.daysInMonth();
//       const initialRevenue = Array.from({ length: daysInMonth }, (_, i) => ({
//         type: `${i + 1}-${selectedDate.month() + 1}-${selectedDate.year()}`,
//         sales: 0,
//       }));
//       setSalesData(initialRevenue);
//     }
//   }, [orderState, selectedDate]);

//   // Cấu hình biểu đồ
//   const config = {
//     data: salesData,
//     xField: "type",
//     yField: "sales",
//     color: ({ type }) => {
//       return "#6052f6";
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: {
//         alias: "Day",
//       },
//       sales: {
//         alias: "Income",
//         formatter: (value) => formatVND(value),
//       },
//     },
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3 row">
//         <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
//           <FaThList style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Total Products</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//         <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
//           <FaCartPlus style={{ fontSize: "50px", color: "#96a5c7" }} />
//           <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
//             <div className="fw-bolder">Orders</div>
//             <div className="fs-5">200</div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <div className="d-flex">
//           <h3 className="mb-4 me-4 title">Income Statistics</h3>
//           <DatePicker onChange={onChange} picker="month" style={{ height: "35px" }} />
//         </div>
//         <div className="bg-white p-3 rounded-3">
//           <Column {...config} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-4 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { FcProcess } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import { Table, DatePicker, Space, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCountOrders, getOrders } from "../features/auth/authSlice";
import { FaThList } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import moment from "moment";
import { getCountProducts } from "../features/product/productSlice";

// Cấu hình cột của bảng
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

// Dữ liệu mẫu cho bảng
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [timeType, setTimeType] = useState("year");

  useEffect(() => {
    dispatch(getOrders({ year: selectedYear }));
  }, [dispatch, selectedYear]);

  const onYearChange = (date, dateString) => {
    setSelectedYear(date.year());
    setSelectedMonth(null);
    setSelectedWeek(null);
    dispatch(getOrders({ year: date.year() }));
  };

  const onMonthChange = (date, dateString) => {
    setSelectedMonth(date.month() + 1);
    setSelectedWeek(null);
    dispatch(getOrders({ year: date.year(), month: date.month() + 1 }));
  };

  const onWeekChange = (date, dateString) => {
    const week = moment(date).isoWeek();
    setSelectedWeek(week);
    setSelectedMonth(null);
    dispatch(getOrders({ year: selectedYear, week }));
  };

  const handleTimeTypeChange = (value) => {
    setTimeType(value);
    setSelectedMonth(null);
    setSelectedWeek(null);
    if (value === "year") {
      dispatch(getOrders({ year: new Date().getFullYear() }));
    }
    if (value === "month") {
      dispatch(getOrders({ year: new Date().getFullYear(), month: new Date().getMonth()}));
    }
  };

  const orderState = useSelector((state) => state.auth.orders);

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  useEffect(() => {
    dispatch(getCountProducts());
    dispatch(getCountOrders());
  }, []);
  const countProducts = useSelector((state) => state.product.countProducts);
  const countOrders = useSelector((state) => state.auth.countOrders);

  useEffect(() => {
    if (orderState.length) {
      let initialRevenue;
      if (timeType === "month" && selectedMonth !== null) {
        const daysInMonth = moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM").daysInMonth();
        initialRevenue = Array.from({ length: daysInMonth }, (_, i) => ({
          type: `${i + 1}-${selectedMonth}-${selectedYear}`,
          sales: 0,
        }));

        const revenueByDay = orderState.reduce((acc, order) => {
          const day = new Date(order.createdAt).getDate(); // Lấy ngày từ createdAt
          acc[day - 1].sales += order.totalPriceAfterDiscount;
          return acc;
        }, initialRevenue);

        setSalesData(revenueByDay);
      } else if (timeType === "week" && selectedWeek !== null) {
        initialRevenue = Array.from({ length: 7 }, (_, i) => ({
          type: `Week ${selectedWeek} - Day ${i + 1}`,
          sales: 0,
        }));

        const startDate = moment().year(selectedYear).isoWeek(selectedWeek).startOf('isoWeek');

        const revenueByDay = orderState.reduce((acc, order) => {
          const orderDate = moment(order.createdAt);
          if (orderDate.isoWeek() === selectedWeek) {
            const dayOfWeek = orderDate.isoWeekday();
            acc[dayOfWeek - 1].sales += order.totalPriceAfterDiscount;
          }
          return acc;
        }, initialRevenue);

        setSalesData(revenueByDay);
      } else {
        initialRevenue = Array.from({ length: 12 }, (_, i) => ({
          type: `${i + 1}-${selectedYear}`,
          sales: 0,
        }));

        const revenueByMonth = orderState.reduce((acc, order) => {
          const month = new Date(order.createdAt).getMonth(); // Lấy tháng từ createdAt
          acc[month].sales += order.totalPriceAfterDiscount;
          return acc;
        }, initialRevenue);

        setSalesData(revenueByMonth);
      }
    } else {
      if (timeType === "month" && selectedMonth !== null) {
        const daysInMonth = moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM").daysInMonth();
        const initialRevenue = Array.from({ length: daysInMonth }, (_, i) => ({
          type: `${i + 1}-${selectedMonth}-${selectedYear}`,
          sales: 0,
        }));
        setSalesData(initialRevenue);
      } else if (timeType === "week" && selectedWeek !== null) {
        const initialRevenue = Array.from({ length: 7 }, (_, i) => ({
          type: `Week ${selectedWeek} - Day ${i + 1}`,
          sales: 0,
        }));
        setSalesData(initialRevenue);
      } else {
        const initialRevenue = Array.from({ length: 12 }, (_, i) => ({
          type: `${i + 1}-${selectedYear}`,
          sales: 0,
        }));
        setSalesData(initialRevenue);
      }
    }
  }, [orderState, selectedYear, selectedMonth, selectedWeek, timeType]);

  const config = {
    data: salesData,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#6052f6";
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: timeType === "month" ? "Day" : timeType === "week" ? "Day" : "Month",
      },
      sales: {
        alias: "Income",
        formatter: (value) => formatVND(value),
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3 row">
        <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
          <FaThList style={{ fontSize: "50px", color: "#9c27b0" }} />
          <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
            <div className="fw-bolder">Total Products</div>
            <div className="fs-5">{countProducts}</div>
          </div>
        </div>
        <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
          <FaCartPlus style={{ fontSize: "50px", color: "#9c27b0" }} />
          <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
            <div className="fw-bolder">Orders</div>
            <div className="fs-5">{countOrders?.orderCount}</div>
          </div>
        </div>
        <div className="d-flex rounded-2 align-items-center flex-grow-1 bg-white p-3 rounded-3 col-lg">
        {/* <FcProcess /> */}
          <FcProcess style={{ fontSize: "50px", color: "#9c27b0" }} />
          <div className="ms-4 d-flex justify-content-center flex-column align-items-center">
            <div className="fw-bolder">Orders Unhandled</div>
            <div className="fs-5">{countOrders?.orderCountUnhandled}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="d-flex align-items-center mb-2">
          <h3 className="me-4 title align-items-center">Income Statistics</h3>
          <Space>
            <Select defaultValue="year" style={{ width: 120 }} onChange={handleTimeTypeChange}>
              <Select.Option value="year">Year</Select.Option>
              <Select.Option value="month">Month</Select.Option>
            </Select>
            {timeType === "year" && (
              <DatePicker onChange={onYearChange} picker="year" style={{ height: "35px" }} />
            )}
            {timeType === "month" && (
              <DatePicker onChange={onMonthChange} picker="month" style={{ height: "35px" }} />
            )}
            {timeType === "week" && (
              <DatePicker onChange={onWeekChange} picker="week" style={{ height: "35px" }} />
            )}
          </Space>
        </div>
        <div className="bg-white p-3 rounded-3">
          <Column {...config} />
        </div>
      </div>
      {/* <div className="mt-4">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;


