import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddCaptionPage from "./AddCaptionPage";
import SearchPage from "./components/SearchPage";

function App() {

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {/* <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Canvas Page
          </Link>
          <Link to="/add-caption">Add Caption Page</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/add-caption" element={<AddCaptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
