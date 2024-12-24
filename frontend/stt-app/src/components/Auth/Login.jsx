import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            toast.error("Username and password are required!");
            return;
        }
        setAuth(credentials); // Update App state
        toast.success("Login successful!");
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
