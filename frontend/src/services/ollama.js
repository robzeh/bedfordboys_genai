import axios from 'axios';

// Set the base URL for API requests
const BASE_URL = "http://localhost:3000"


export const postGenerate = async ({ action, prompt, context}) => {
  try {
    const data = {
      action,
      prompt,
      context
    }
    const response = await axios.post(`${BASE_URL}/generate`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    });

    return response.data;
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} ${endpoint} failed: ${error.response.statusText}`));
  }
};

export const getPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`)

    return response.data
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} ${endpoint} failed: ${error.response.statusText}`));
  }
}

export const getAllPatients = async ({ patientId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}`)

    return response.data
  } catch (error) {
    return Promise.reject(new Error(`API ${error.config.method} ${endpoint} failed: ${error.response.statusText}`));
  }
}