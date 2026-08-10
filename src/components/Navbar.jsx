import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully!");

        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <div>

                    <h1 className="text-2xl font-bold text-blue-600">
                        Task Manager
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Organize your work efficiently
                    </p>

                </div>

                <div className="flex items-center gap-6">

                    <div className="text-right">

                        <p className="text-sm text-gray-500">
                            Welcome
                        </p>

                        <p className="font-semibold text-gray-800">
                            {user?.name || "User"} 👋
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}