"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileUploadSection() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `/api/s3url?filename=${file.name}&filetype=${file.type}`
      );
      const { uploadUrl } = await res.json();
      console.log(file, "file");
      console.log(uploadUrl, "uploadurl");
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (uploadRes.ok) {
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4 border rounded-md shadow">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload to S3"}
      </button>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
