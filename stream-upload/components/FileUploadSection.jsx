"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileUploadSection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file) => {
    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "x-filename": file.name,
        },
        body: file,
      });

      const data = await res.json();
      console.log("File uploaded:", data);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    uploadFile(file);
  };

  return (
    <div className="p-2 space-y-4 border-1 rounded-md shadow-lg">
      <input
        className="m-0"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded m-0"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload to S3"}
      </button>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
