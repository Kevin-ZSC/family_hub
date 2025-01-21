"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [file, setFile] = useState(null); // Initialize with null
  const [url, setUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch stored file URLs on page load
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setUrl(data); // Set the stored URLs
        } else {
          console.error("Failed to fetch files");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []); // Empty dependency array to run only once on mount

  const uploadFile = async (selectedFile) => {
    try {
      if (!selectedFile) {
        alert("No file selected");
        return;
      }

      setIsUploading(true);
      const data = new FormData();
      data.set("file", selectedFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (uploadRequest.ok) {
        const ipfsUrl = await uploadRequest.json();
        setUrl((prev) => [...prev, ipfsUrl]); // Add the new file URL
      } else {
        alert("Failed to upload file");
      }

      setIsUploading(false);
    } catch (e) {
      console.error("Error uploading file:", e);
      setIsUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleFileSelection = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      await uploadFile(selectedFile); // Automatically upload the file after selection
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Upload Section */}
      <div className="mb-6 flex items-center">
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          ref={fileInputRef}
          disabled={isUploading}
          onChange={handleFileSelection} // Handle file selection and upload immediately
        />
        
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current.click()} // Trigger file selection on click
          className={`ml-4 px-6 py-3 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 focus:outline-none`}
        >
          {isUploading ? "Uploading..." : "Upload Image..."}
        </button>
      </div>
      
      {/* Images Section */}
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {url.length > 0 ? (
          url.map((fileUrl, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={fileUrl}
                alt={`Uploaded file ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No images uploaded yet.
          </p>
        )}
      </div>
    </main>
  );
}
