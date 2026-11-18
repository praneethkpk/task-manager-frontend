import { useState } from "react";
import { register } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { CheckSquare, User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            toast.warning("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            await register(formData);
            toast.success("Registration successful! Please login.");
            navigate("/");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen auth-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden grid lg:grid-cols-2 animate-scale-in">
                {/* Left Panel - Showcase */}
                <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 text-white relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

                    <div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">TaskFlow</span>
                        </div>

                        <div className="mt-12 space-y-4">
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                                Join thousands managing tasks effortlessly.
                            </h2>
                            <p className="text-emerald-100 text-sm leading-relaxed">
                                Get instant access to priority organization, real-time status filtering, and intuitive team workflows.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-8">
                        <div className="flex items-center space-x-2 text-xs font-semibold bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/15 w-fit">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>Instant Setup & Free Access</span>
                        </div>
                        <p className="text-[11px] text-emerald-200">
                            © 2026 TaskFlow. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Right Panel - Register Form */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex lg:hidden items-center justify-center border border-emerald-100 mb-4">
                            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Create an Account 🚀
                        </h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Sign up in seconds to start organizing
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative flex items-center">
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
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
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
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
                            className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all duration-200 active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <UserPlus className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center space-x-1"
                            >
                                <span>Sign in</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}