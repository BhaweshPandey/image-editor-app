import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";
import "./AddCaptionPage.css";

function AddCaptionPage() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const { state } = useLocation(); // Retrieve the image URL passed from SearchPage
  const [caption, setCaption] = useState("");

  useEffect(() => {
    // Initialize Fabric.js canvas
    if (canvasRef.current) {
      fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
    }

    // Load the image onto the canvas
    if (state?.imageURL && fabricCanvas.current) {
      fabric.Image.fromURL(
        state.imageURL,
        (img) => {
          fabricCanvas.current.clear();
          img.set({ crossOrigin: "anonymous" }); // Enable cross-origin image handling
          img.scaleToWidth(500);
          fabricCanvas.current.add(img);
          fabricCanvas.current.renderAll();
        },
        { crossOrigin: "anonymous" } // Ensure cross-origin is handled for the image
      );
    }

    // Cleanup on component unmount
    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
      }
    };
  }, [state]);

  // Add caption to the canvas
  const handleAddCaption = () => {
    if (!fabricCanvas.current) return;

    const text = new fabric.Text(caption, {
      left: 50,
      top: 450,
      fontSize: 24,
      fill: "black",
      fontWeight: "bold",
    });

    fabricCanvas.current.add(text);
    fabricCanvas.current.renderAll();
  };

  // Download the canvas as an image
  const handleDownload = () => {
    if (!fabricCanvas.current) {
      alert("Canvas is not ready.");
      return;
    }

    try {
      const dataURL = fabricCanvas.current.toDataURL({
        format: "png",
        quality: 1, // High-quality export
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited-image.png";
      link.click();
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image.");
    }
  };

  return (
    <div className="page-container">
      {/* Left Section: Canvas */}
      <div className="canvas-section">
        <h3>Image with Captions</h3>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* Right Section: Controls */}
      <div className="controls-section">
        <h3>Controls</h3>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption"
        />
        <button onClick={handleAddCaption}>Add Caption</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default AddCaptionPage;
