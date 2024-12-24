import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await registerUser(formData);
            toast.success("Registration successful! Redirecting to login...");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password2}
                        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
