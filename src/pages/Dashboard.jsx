import { useState, useEffect } from "react";

import {
    createTask,
    getTasks,
    deleteTask,
    updateTaskStatus
} from "../api/taskService";

export default function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {

        try {

            const response =
                await getTasks();

            setTasks(response.data);

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
                  priority
              });

            console.log(response.data);

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");

            loadTasks();

        } catch (error) {

            console.log(error);

        }
    };

    const handleStatusChange =
        async (id, status) => {

            try {

                await updateTaskStatus(
                    id,
                    status
                );

                loadTasks();

            } catch (error) {

                console.log(error);

            }
        };

    const handleDeleteTask =
        async (id) => {

            try {

                await deleteTask(id);

                loadTasks();

            } catch (error) {

                console.log(error);

            }
        };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    useEffect(() => {

        loadTasks();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div
                className="
                flex
                justify-between
                items-center
                mb-8
                bg-white
                p-5
                rounded-xl
                shadow
                "
            >

                <h1 className="text-3xl font-bold">
                    Welcome {user.name}
                </h1>

                <button
                    onClick={handleLogout}
                    className="
                    bg-gray-800
                    text-white
                    px-4
                    py-2
                    rounded
                    hover:bg-black
                    "
                >
                    Logout
                </button>

            </div>

            <div
                className="
                bg-white
                p-6
                rounded-xl
                shadow
                max-w-lg
                "
            >

                <input
                    type="text"
                    placeholder="Task Title"
                    className="
                    border
                    p-3
                    w-full
                    rounded
                    mb-3
                    "
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    className="
                    border
                    p-3
                    w-full
                    rounded
                    mb-3
                    "
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />
                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                    className="
                    border
                    p-3
                    w-full
                    rounded
                    mb-3
                    "
                >

                    <option value="LOW">
                        LOW
                    </option>

                    <option value="MEDIUM">
                        MEDIUM
                    </option>

                    <option value="HIGH">
                        HIGH
                    </option>

                </select>

                <button
                    onClick={handleCreateTask}
                    className="
                    bg-blue-600
                    text-white
                    px-6
                    py-3
                    rounded
                    hover:bg-blue-700
                    "
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

                        <p>No tasks found.</p>

                    ) : (

                        tasks.map(task => (

                            <div
                                key={task.id}
                                className="
                                bg-white
                                p-5
                                rounded-xl
                                shadow-md
                                mb-4
                                border
                                hover:shadow-lg
                                transition
                                "
                            >

                                <h3
                                    className="
                                    font-bold
                                    text-lg
                                    "
                                >
                                    {task.title}
                                </h3>

                                <p
                                    className="
                                    text-gray-600
                                    "
                                >
                                    {task.description}
                                </p>

                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-3
                                    "
                                >

                                    <span
                                        className="
                                        font-medium
                                        "
                                    >
                                        Status:
                                    </span>

                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                task.id,
                                                e.target.value
                                            )
                                        }
                                        className={`px-2 py-1 rounded border ${
                                            task.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700"
                                                : task.status === "IN_PROGRESS"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >

                                        <option value="PENDING">
                                            PENDING
                                        </option>

                                        <option value="IN_PROGRESS">
                                            IN_PROGRESS
                                        </option>

                                        <option value="COMPLETED">
                                            COMPLETED
                                        </option>

                                    </select>

                                </div>

                                <div className="mt-3">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            task.priority === "HIGH"
                                                ? "bg-red-100 text-red-700"
                                                : task.priority === "MEDIUM"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {task.priority}
                                    </span>

                                </div>

                                <button
                                    onClick={() =>
                                        handleDeleteTask(
                                            task.id
                                        )
                                    }
                                    className="
                                    mt-4
                                    bg-red-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    hover:bg-red-600
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        ))

                    )
                }

            </div>

        </div>

    );
}