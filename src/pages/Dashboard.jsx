import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import {
    createTask,
    getTasks,
    deleteTask,
    updateTaskStatus
} from "../api/taskService";

export default function Dashboard() {


     return (

            <>

                <Navbar />

                <div className="p-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Dashboard
                    </h2>

                    {/* Existing dashboard code */}

                </div>

            </>

        );
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
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDeleteTask}
                            />
                        ))


                    )
                }

            </div>

        </div>

    );
}