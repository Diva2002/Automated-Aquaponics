import React, { useState } from "react";
import "./Prediction.css";
import Nav from './Nav.jsx';

function Prediction() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState("");
  const [stageImage, setStageImage] = useState("");  // Image for growth stage

  // Date calculations for plant age
  const startDate = new Date("2024-11-03");
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - startDate.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);  // Convert ms to days
  const plantAgeInWeeks = Math.floor(diffInDays / 7);  // Convert days to weeks


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setError("");
    setImageSrc(URL.createObjectURL(e.target.files[0])); // Preview the image
    setFilename(e.target.files[0].name); // Save file name
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setProgress(0);

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
          const heightCm = processResult.height_cm;
          const plantHeightMessage = `Plant Height: ${heightCm} cm`;

          // Determine harvesting stage based on age
          let harvestStage = "";
          let imageUrl = ""; // Image URL for the plant's growth stage
          let progressValue = 0;

          if (plantAgeInWeeks >= 6 && heightCm >= 1) {
            harvestStage = "Optimal for harvesting!";
            imageUrl = "https://img.freepik.com/premium-photo/drawing-spinach-plant-with-letter-b-it_901003-51481.jpg?w=360"; // Replace with your optimal stage image
            progressValue = 100;
          } else if (plantAgeInWeeks >= 5) {
            harvestStage = "Few more days to go!";
            imageUrl = "https://static.vecteezy.com/system/resources/thumbnails/014/462/494/small_2x/soybean-plant-in-ground-icon-cartoon-style-vector.jpg"; // Replace with your few more days image
            progressValue = 85;
          } else if (plantAgeInWeeks >= 3) {
            harvestStage = "In growing stage!";
            imageUrl = "https://www.saferbrand.com/media/wysiwyg/Articles/Safer-Brand/sb-article-plant-growth-stage-3.png"; // Replace with your growing stage image
            progressValue = 50;
          } else {
            harvestStage = "Baby spinach!";
            imageUrl = "https://cdn.shopify.com/s/files/1/0514/9098/0017/files/tiny-sprout-with-true-leaves_c543aeb5-0012-41dc-bdc9-dea203e053b3.jpg?v=1701468832"; // Replace with your baby spinach image
            progressValue = 20;
          }

          setStageImage(imageUrl);
          setProgress(progressValue);  // Set progress value
          setResult(`${plantHeightMessage}\n${harvestStage}`);
        } else {
          setError(processResult.error || "Error processing image.");
        }
      } else {
        setError(uploadData.error || "Error uploading file.");
      }
    } catch (err) {
      console.error("Error connecting to the server:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg1">
      <Nav />
      <div className="pred-cont">
        <h1>Harvesting Time Prediction</h1>
        <h3>Your spinach plants were planted on 3 November, 2024</h3>
        <h3>Current Plant Age: {plantAgeInWeeks} weeks</h3>
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
        
        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Uploaded" width="300" />
            <p><strong>File Name:</strong> {filename}</p>
          </div>
        )}

        {result && (
          <div className="result-container">
            <h3 className="result">{result}</h3>

            {/* Circle Progress Bar */}
            <div className="progress-circle">
              <svg className="circle-svg" width="260" height="260" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="70" stroke="#ddd" strokeWidth="10" fill="none" />
                <circle
                  cx="75"
                  cy="75"
                  r="70"
                  stroke="#4caf50"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 - (progress / 100) * 2 * Math.PI * 70}`}
                  transform="rotate(-90 75 75)"
                />
              </svg>

              {/* Image in the center of the circle */}
              <img className="stage-image" src={stageImage} alt="Stage" />
            </div>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Prediction;
