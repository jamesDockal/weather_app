import React, { useRef, useState } from "react";
import { Modal } from "../Modal/Modal.component";
import { Input } from "../Input/Input.component";
import { UploadButton } from "../Upload_button/Upload_button.component";
import { Button } from "../Button/Button.component";

export const Help: React.FC = () => {
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const onSubmit = () => {
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      file: selectedFile!.name,
    };

    console.log(data);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsHelpModalOpen(!isHelpModalOpen);
        }}
        className="bg-pink-500 absolute bottom-10  right-10 text-white text-2xl  w-75 h-75 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition duration-300 ease-in-out"
        style={{
          width: 75,
          height: 75,
        }}
      >
        ?
      </div>

      <Modal isModalOpen={isHelpModalOpen} onClose={setIsHelpModalOpen}>
        <h1
          style={{
            fontSize: 32,
            color: "white",
          }}
        >
          Contact Us!
        </h1>
        <form
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            gap: "16px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Input ref={nameRef} placeholder="Type your name" required />
          <Input
            ref={emailRef}
            placeholder="Type your email"
            type="email"
            required
          />
          <UploadButton
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            acceptOnly="pdf"
          />
          <Button
            type="submit"
            title="Submit"
            className="bg-pink-500 hover:bg-pink-700"
            // style={{
            //   marginTop: "50px",
            //   backgroundColor: "#EC4899",
            // }}
          />
        </form>
      </Modal>
    </>
  );
};
