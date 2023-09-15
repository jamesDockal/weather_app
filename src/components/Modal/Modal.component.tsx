import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

interface Props {
  isModalOpen: boolean;
  onClose: Function;
  children: JSX.Element | JSX.Element[];
}

export const Modal: React.FC<Props> = ({ isModalOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => {
        onClose();
      }}
      style={{
        content: {
          borderRadius: 12,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          backgroundColor: "#aa23ff",
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};
