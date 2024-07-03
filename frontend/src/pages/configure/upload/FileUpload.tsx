import React, { useState, DragEvent } from 'react';
import { useToast } from '../../../components/ui/use-toast';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:4000/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {

        // setMessage('File uploaded successfully');
        toast({
            title: 'Image uploaded successfully!',
            variant: 'success',
            className: `bg-green-500`
          });
        } 
        else {
            throw new Error('Failed to upload image');}
    } catch (error) {
      setMessage('File upload failed');
      toast({
        title: 'Failed to upload image',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
      <div
        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drag and drop a file, or click to select one</p>
        )}
      </div>
      <input
        type="file"
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
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default FileUpload;
