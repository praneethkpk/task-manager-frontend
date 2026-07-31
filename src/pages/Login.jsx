import { useState, useEffect } from "react";
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.warning("Please enter email and password.");
            return;
        }

        setLoading(true);

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

            toast.success("Welcome back!");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
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
                    Welcome Back 👋
                </p>

                <form onSubmit={handleLogin} className="space-y-4">

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
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-lg flex justify-center items-center"
                    >

                        {
                            loading
                                ? <LoadingSpinner />
                                : "Login"
                        }

                    </button>

                </form>

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