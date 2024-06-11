import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import background from "../images/bg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStateAuth } from "../features/auth/authSlice";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetStateAuth());
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/admin");
    }
  }, []);
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess } = authState.auth;

  useEffect(() => {
    if (isSuccess && user._id) {
      // message.success("Login successful");
      dispatch(resetStateAuth());
      navigate("/admin");
      // window.location.reload();
    }
    if (isError) {
      // message.error("Login failed");
      dispatch(resetStateAuth());
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div
      className="py-5 d-flex align-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: "#0e4166",
      }}
    >
      <div
        className="bg-white rounded-3 p-3 h-100"
        style={{ width: "400px", margin: "auto" }}
      >
        <h2 className="text-center">Login</h2>
        <p className="text-center">Login to account to continue.</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            i_id="floatingInput"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
            // onBl={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            i_id="floatingInput"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="">
              Forgot Password?
            </Link>
          </div>

          <button
            className="border-0 px-3 py-2 fw-bold w-100 fs-5 text-center text-decoration-none mt-3 text-white"
            style={{ background: "#021a40" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
