import React from "react";
import CustomInput from "../components/CustomInput";
import background from "../images/Background_login.jpg";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  return (
    <div
      className="py-5 d-flex align-center"
      style={{
        background: `url(${background})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-white rounded-3 p-3 h-100"
        style={{ width: "500px", margin: "auto" }}
      >
        <h2 className="text-center">Reset Password</h2>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpass"
          />

          <Link
            className="border-0 px-3 py-2 fw-bold w-100 fs-5 text-center text-decoration-none mt-3 text-white"
            style={{ background: "#021a40" }}
            type="submit"
            to="/login"
          >
            Reset Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
