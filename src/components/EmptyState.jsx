export default function EmptyState({
    title,
    message,
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-10 text-center">

            <div className="text-6xl mb-4">
                📋
            </div>

            <h2 className="text-2xl font-bold mb-2">
                {title}
            </h2>

            <p className="text-gray-500">
                {message}
            </p>

        </div>

    );
}