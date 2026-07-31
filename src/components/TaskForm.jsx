export default function TaskForm({
    title,
    description,
    priority,
    setTitle,
    setDescription,
    setPriority,
    onCreateTask,
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-5">
                Create New Task
            </h2>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
                placeholder="Task Description"
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded-lg p-3 mb-5"
            >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
            </select>

            <button
                onClick={onCreateTask}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
                Create Task
            </button>

        </div>

    );
}