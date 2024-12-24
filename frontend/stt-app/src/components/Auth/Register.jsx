import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { registerUser } from "../../api";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await registerUser(formData); // Call API to register user
            toast.success("Registration successful! Redirecting to login...");
            navigate("/login"); // Redirect to login page after success
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
