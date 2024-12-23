import axios from "axios";

// Set base URL for the backend
const API_BASE_URL = "http://localhost:8006/api"; // Replace with your backend URL

export const registerUser = async (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register/`, userData);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_BASE_URL}/auth/login/`, credentials);
};

export const sendAudioForTranscription = async (file, username, password) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL}/stt/speech-to-text/`, formData, {
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Encode credentials in Base64
            "Content-Type": "multipart/form-data",
        },
    });
};

