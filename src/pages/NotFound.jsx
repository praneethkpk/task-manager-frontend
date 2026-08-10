import { Link } from "react-router-dom";
import { Home, FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen auth-bg flex flex-col justify-center items-center p-6 text-center">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-10 max-w-md w-full animate-scale-in flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6 shadow-xs">
                    <FileQuestion className="w-8 h-8 stroke-[1.75]" />
                </div>

                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    404
                </h1>

                <h2 className="text-xl font-bold text-slate-800 mt-2">
                    Page Not Found
                </h2>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95 text-xs"
                >
                    <Home className="w-4 h-4" />
                    <span>Return to Home</span>
                </Link>
            </div>
        </div>
    );
}