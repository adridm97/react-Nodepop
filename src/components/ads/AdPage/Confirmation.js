import React from "react";

function Confirmation({ onConfirm, onDisplay, confirmation, ...props }) {
  const cancel = () => onDisplay(false);
  const confirm = () => onConfirm();

  return (
    <>
      <div className="confirmation-text" {...props}></div>

      <button className="cancel-button" onClick={cancel}>
        No
      </button>
      <button className="confirmation-button" onClick={confirm}>
        Si
      </button>

      <div className="confirm-bg"></div>
    </>
  );
}

export default Confirmation;
