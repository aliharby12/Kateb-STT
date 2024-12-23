import axios from "axios";

// Set base URL for the backend
const API_BASE_URL = "http://localhost:8006/api"; // Replace with your backend URL

export const registerUser = async (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register/`, userData);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_BASE_URL}/auth/login/`, credentials);
};

export const getTTS = async (text, token) => {
    return axios.post(
        `${API_BASE_URL}/api/speech-to-text/`,
        { text },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
};
