import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, onCancel, onOk, title } = props;
  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
