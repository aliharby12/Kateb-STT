import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            toast.error("Both username and password are required!");
            return;
        }

        try {
            const response = await loginUser(credentials);

            if (response.status === 200) {
                setAuth({ username: credentials.username, password: credentials.password });
                toast.success("Login successful! Redirecting to Speech-to-Text...");
                navigate("/speech-to-text/");
            } else {
                const errorData = response.data;
                toast.error(errorData?.error || "Login failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
