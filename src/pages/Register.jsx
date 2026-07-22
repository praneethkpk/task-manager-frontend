import { useState } from "react";
import { register } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {

        setLoading(true);
        setError("");

        try {

            await register(formData);

            alert("Registration Successful! Please login.");

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Join Task Manager
                </p>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-3 rounded-lg transition"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </div>

                <div className="mt-6 text-center">

                    <span className="text-gray-600">
                        Already have an account?
                    </span>

                    <Link
                        to="/"
                        className="ml-2 text-blue-600 hover:underline font-semibold"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}