import { useState } from "react";
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

useEffect(() => {

    if(localStorage.getItem("token")){
        navigate("/dashboard");
    }

}, []);
export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await login({
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Task Manager
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Welcome Back
                </p>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-lg transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </div>

                <div className="mt-6 text-center">

                    <span className="text-gray-600">
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        className="ml-2 text-blue-600 hover:underline font-semibold"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}