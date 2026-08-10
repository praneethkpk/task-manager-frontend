import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckSquare, LogOut, User } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.name || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-30 glass-nav shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
                {/* Brand Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                        <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                            TaskFlow
                        </h1>
                        <p className="text-xs font-medium text-slate-400 hidden sm:block">
                            Engineering Excellence Portfolio
                        </p>
                    </div>
                </div>

                {/* User Info & Logout */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/80 rounded-full py-1.5 px-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                            {userInitial || <User className="w-3.5 h-3.5" />}
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-xs font-semibold text-slate-800 leading-tight">
                                {userName}
                            </p>
                            <p className="text-[10px] text-slate-400 leading-tight">
                                {user?.email || "Member"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:shadow-xs active:scale-95 cursor-pointer"
                        title="Sign Out"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}