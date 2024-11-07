// services/apiService.js
import axios from "axios";

const API_URL = "http://localhost:5100/survey"; // Sesuaikan dengan URL API Anda

export const submitSurvey = async (formData, authToken) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data; // Mengembalikan data jika diperlukan
  } catch (error) {
    throw error; // Menangkap dan melemparkan error untuk ditangani di tempat lain
  }
};
