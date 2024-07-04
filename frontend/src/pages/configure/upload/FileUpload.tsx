import React, { useState, DragEvent, useRef } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { Progress } from "../../../components/ui/progress";
import axios from "axios";
import Steps from "../../../components/Steps";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  // useRef to reference the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      //   setIsDragOver(false);
      //   setIsUploading(true);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsUploading(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/images/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentComplete =
                (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(percentComplete);
            }
          },
        }
      );

      if (response.status === 201) {
        // setMessage('File uploaded successfully');
        toast({
          title: "Image uploaded successfully!",
          variant: "success",
          className: `bg-green-500`,
        });

        setIsUploading(false);
        setUploadProgress(0);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      setMessage("File upload failed");
      toast({
        title: "Failed to upload image",
        description: "Please try again later.",
        variant: "destructive",
      });

      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    // Reset file input state
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <Steps />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
        <div
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {selectedFile ? (
            <div className="relative flex justify-between items-center">
              <p className="flex-1">{selectedFile.name}</p>
              <span
                className="ml-auto px-2 py-1 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md"
                onClick={handleRemove}
              >
                x
              </span>
            </div>
          ) : (
            <p>Drag and drop a file, or click to select one</p>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef} // Assigning ref to file input element
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Choose File
        </label>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Upload
        </button>

        <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <p>Uploading...</p>
              <Progress
                value={uploadProgress}
                className="mt-2 w-40 h-2 bg-gray-300"
              />
            </div>
          ) : isDragOver ? (
            <p>
              <span className="font-semibold">Drop file</span> to upload
            </p>
          ) : !selectedFile ? (
            <p>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          ) : (
            <p>
              <span className="font-semibold">Cick on Upload</span>
            </p>
          )}
        </div>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </>
  );
};

export default FileUpload;
