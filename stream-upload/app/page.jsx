"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadFile = async (file) => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "x-filename": file.name,
      },
      body: file,
    });

    const data = await res.json();
    console.log("file uploaded");
    console.log(data);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    uploadFile(file);
  };

  return (
    <div className="p-4 space-y-4">
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
    </div>
  );
}
