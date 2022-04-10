import React from "react";
import Modal from "../Modal/Modal";
import "./DeleteModal.css";

const DeleteModal = ({title, isOpen, close, msg, deleteFunc}) => {
  return (
    <div>
      <Modal
        title={title}
        isOpen={isOpen}
        close={close}
      >
        <div className="delete-modal-container">
          <h3>{msg}</h3>
          <div className="delete-btn-container">
            <button onClick={deleteFunc} className="yes-btn">
              Yes
            </button>
            <button onClick={close} className="no-btn">
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
