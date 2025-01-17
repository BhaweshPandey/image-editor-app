import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './SearchPage.css';

function SearchPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const response = await api.get("/", { params: { q: query, image_type: "photo" } });
      if (response.data.hits.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setImages(response.data.hits);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const goToAddCaptionPage = (imageURL) => {
    if (imageURL) {
      navigate("/add-caption", { state: { imageURL } });
    } else {
      alert("Please upload an image first.");
    }
  };

  return (
    <div className="search-page">
      <div className="header">
        <div className="user-info">
          <label className="label">
            Name:
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </label>
          <label className="label">
            Email:
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
        </div>
      </div>
      <div className="search-top">
        <h1 className="search-title">Image Search</h1>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Enter search term"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={fetchImages}>Search</button>
        </div>
      </div>
      {noResults ? (
        <p className="no-results-message">No results found. Try another search term.</p>
      ) : (
        <div className="image-results">
          {images.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.previewURL} alt={image.tags} className="image-preview" />
              <button
                className="add-caption-button"
                onClick={() => goToAddCaptionPage(image.previewURL)}
              >
                Add Caption
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default SearchPage;
