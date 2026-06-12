import { useState, useEffect } from "react";
import { createTask, getTasks } from "../api/taskService";

export default function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {

        try {

            const response =
                await getTasks();

            setTasks(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    };

    const handleCreateTask = async () => {

        try {

            const response =
                await createTask({

                    title,
                    description,
                    priority: "MEDIUM"

                });

            console.log(
                response.data
            );

            setTitle("");
            setDescription("");

            loadTasks();

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        loadTasks();

    }, []);

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-8">
                Welcome {user.name}
            </h1>

            <div className="space-y-4 max-w-md">

                <input
                    type="text"
                    placeholder="Task Title"
                    className="border p-3 w-full rounded"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    className="border p-3 w-full rounded"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={handleCreateTask}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Create Task
                </button>

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                    My Tasks
                </h2>

                {
                    tasks.length === 0 ? (

                        <p>
                            No tasks found.
                        </p>

                    ) : (

                        tasks.map(task => (

                            <div
                                key={task.id}
                                className="border p-4 rounded mb-3 shadow-sm"
                            >

                                <h3 className="font-bold text-lg">
                                    {task.title}
                                </h3>

                                <p className="text-gray-600">
                                    {task.description}
                                </p>

                                <p className="mt-2">
                                    Status: {task.status}
                                </p>

                                <p>
                                    Priority: {task.priority}
                                </p>

                            </div>

                        ))

                    )
                }

            </div>

        </div>
    );
}