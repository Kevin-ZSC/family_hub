"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const [file, setFile] = useState(null); // Initialize with null
  // const [url, setUrl] = useState([]);
  const [Photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch stored file URLs on page load
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPhotos(data); // Set the stored URLs
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

  const handlePhotoClick = (photo) => {
    setIsShowDetail(true);
    setSelectedPhoto(photo);
    console.log(selectedPhoto)
  };

  const handleCloseDetail = () => {
    setIsShowDetail(false);
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
        {Photos.length > 0 ? (
          Photos.map((photo, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={photo.url}
                alt={`Uploaded file ${index + 1}`}
                className="w-full h-full object-cover"
                onClick={() => {
                  handlePhotoClick(photo);
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No images uploaded yet.
          </p>
        )}
      </div>

      {isShowDetail && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-lg w-full">
            {/* Photo */}
            <img
              src={selectedPhoto.url}
              alt="Selected file"
              className="max-w-lg h-fit rounded-md lg:w-full lg:h-96 object-cover"
            />
            
            {/* Close Button */}
            <button
              onClick={handleCloseDetail}
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
