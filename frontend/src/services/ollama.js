import axios from 'axios';
import patient from "../pages/Patient.jsx";

// Set the base URL for API requests
const BASE_URL = "http://localhost:3000"


export const postGenerate = async ({ prompt, context, patientId}) => {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, {
      headers: {
        "Content-Type": "application/json"
      },
      prompt,
      context,
      patientId
    });

    return response.data;
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} failed: ${error.response.statusText}`));
  }
};

export const getPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`)

    return response.data
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} failed: ${error.response.statusText}`));
  }
}

export const getAllPatients = async ({ patientId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}`)

    return response.data
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} failed: ${error.response.statusText}`));
  }
}