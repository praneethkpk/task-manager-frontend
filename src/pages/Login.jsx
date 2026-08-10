import { useState, useEffect } from "react";
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { CheckSquare, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
            toast.warning("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await login({ email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));

            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen auth-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden grid lg:grid-cols-2 animate-scale-in">
                {/* Left Panel - Feature Highlight Showcase */}
                <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

                    <div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">TaskFlow</span>
                        </div>

                        <div className="mt-12 space-y-4">
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                                Streamline your daily work with clarity.
                            </h2>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Organize tasks, track real-time priority progress, and boost your daily productivity.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-8">
                        <div className="flex items-center space-x-2 text-xs font-semibold bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/15 w-fit">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>JWT Authentication Enabled</span>
                        </div>
                        <p className="text-[11px] text-blue-200">
                            © 2026 TaskFlow. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Right Panel - Form Container */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex lg:hidden items-center justify-center border border-blue-100 mb-4">
                            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Welcome back 👋
                        </h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Sign in to access your task dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Don't have an account yet?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center space-x-1"
                            >
                                <span>Create account</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}