import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone =() => {
  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-start px-4 text-sm">
        <p className="dropzone-content">
          Drag and drop some files here, or click to select files
        </p>
      </div>
    </div>
  );
}

export default Dropzone;