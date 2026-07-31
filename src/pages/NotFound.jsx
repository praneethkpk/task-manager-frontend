import { Link } from "react-router-dom";

export default function NotFound() {

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <h1 className="text-8xl font-bold text-blue-600">
                404
            </h1>

            <p className="text-2xl mt-4">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Go to Login
            </Link>

        </div>

    );
}