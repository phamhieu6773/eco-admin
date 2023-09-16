import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3 className="mb-4">Add Blog Category</h3>
      <form action="">
        <CustomInput type="text" label="Enter Blog Title" />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Blog Category
        </button>
      </form>
    </div>
  );
};

export default AddBlogCat;
