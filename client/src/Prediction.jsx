import React, { useState } from "react";
import "./Prediction.css";
import Nav from './Nav.jsx'

function Prediction(){
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Upload the file
      const uploadResponse = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const filename = uploadData.filename;

        // Step 2: Process the uploaded file
        const processResponse = await fetch(
          `http://127.0.0.1:5000/upload_image?filename=${encodeURIComponent(
            filename
          )}`
        );
        const processResult = await processResponse.json();

        if (processResponse.ok) {
          setResult(`Plant Height: ${processResult.height_cm} cm`);
        } else {
          setError(processResult.error || "Error processing image.");
        }
      } else {
        setError(uploadData.error || "Error uploading file.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg1'>
        <Nav/>
        <div className="pred-cont">
        <h1>Harvesting Time Prediction</h1>
        <div className="upload-section">
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            />
            <button onClick={handleUpload} className="upload-button">
            Upload and Process
            </button>
        </div>
        {loading && <p className="loading">Processing... Please wait.</p>}
        {result && <p className="result">{result}</p>}
        {error && <p className="error">{error}</p>}
        </div>
    </div>
  );
};

export default Prediction;
