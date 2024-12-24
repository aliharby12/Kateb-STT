import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { loginUser } from "../../api";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            toast.error("Both username and password are required!");
            return;
        }

        try {
            const response = await loginUser(credentials); // Call API to authenticate user

            if (response.status === 200) {
                setAuth({ username: credentials.username, password: credentials.password }); // Save credentials
                toast.success("Login successful! Redirecting to Speech-to-Text...");
                navigate("/tts"); // Redirect to STT page
            } else {
                const errorData = response.data;
                toast.error(errorData?.error || "Login failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
