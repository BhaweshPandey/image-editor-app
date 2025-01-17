// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "48265745-0451a98a57d203525a8722ba8", // Default API key ---
  },
});

export default api;
