import React, { useRef } from "react";
import { Button } from "../Button/Button.component";
import { toast } from "react-toastify";
import { ToastService } from "../../services/Toast.service";

const toastService = new ToastService();

interface Props {
  setSelectedFile: (file: any) => void;
  acceptOnly?: string;
  selectedFile?: any;
}

export const UploadButton: React.FC<Props> = ({
  setSelectedFile,
  acceptOnly,
  selectedFile,
}) => {
  const inputRef = useRef<any>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (!acceptOnly || file.type === `application/${acceptOnly}`) {
        setSelectedFile(file);
        toastService.success("File uploaded successfully!");
      } else {
        toastService.error("Invalid file!");
      }
    }
  };
  return (
    <div style={{}}>
      <input
        ref={inputRef}
        type="file"
        accept={`.${acceptOnly}`}
        onChange={handleFileChange}
        style={{
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Button
        type="button"
        title="Upload"
        onClick={() => {
          inputRef.current.click();
        }}
      />
      <span
        style={{
          marginLeft: "8px",
          color: "white",
        }}
      >
        {selectedFile?.name}
      </span>
    </div>
  );
};
