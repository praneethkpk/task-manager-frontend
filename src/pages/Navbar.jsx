import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.clear();

        toast.success("Logged out successfully.");

        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold text-blue-600">
                    Task Manager
                </h1>

            </div>

            <div className="flex items-center gap-6">

                <span className="font-medium text-gray-700">
                    Hello, {user?.name || "User"} 👋
                </span>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}