export default function TaskCard({
    task,
    onStatusChange,
    onDelete,
}) {

    const priorityColor = {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        LOW: "bg-green-100 text-green-700",
    };

    const statusColor = {
        PENDING: "bg-gray-100 text-gray-700",
        IN_PROGRESS: "bg-blue-100 text-blue-700",
        COMPLETED: "bg-green-100 text-green-700",
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition">

            <h3 className="text-xl font-semibold">
                {task.title}
            </h3>

            <p className="text-gray-600 mt-2">
                {task.description}
            </p>

            <div className="flex items-center justify-between mt-5">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor[task.priority]}`}
                >
                    {task.priority}
                </span>

                <select
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange(
                            task.id,
                            e.target.value
                        )
                    }
                    className={`px-3 py-2 rounded-lg border ${statusColor[task.status]}`}
                >
                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="IN_PROGRESS">
                        In Progress
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>
                </select>

            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Delete
            </button>

        </div>
    );
}