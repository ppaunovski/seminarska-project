import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Message({ message }) {
  const [position, setPosition] = useState("top-start");

  return (
    <>
      <div>
        <ToastContainer position="bottom-end" className="p-3 mb-5">
          <Toast>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default Message;
