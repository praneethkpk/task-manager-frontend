import { useEffect, useMemo, useState } from "react";

import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskStatus,
} from "../api/taskService";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import TaskList from "../components/TaskList";

import { toast } from "react-toastify";

export default function Dashboard() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");

    const loadTasks = async () => {

        try {

            const response = await getTasks();

            setTasks(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load tasks.");

        }

    };

    useEffect(() => {

        loadTasks();

    }, []);

    const handleCreateTask = async () => {

        if (!title.trim()) {

            toast.warning("Task title is required.");

            return;

        }

        try {

            await createTask({
                title,
                description,
                priority,
            });

            toast.success("Task created successfully.");

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");

            loadTasks();

        } catch (error) {

            console.error(error);

            toast.error("Unable to create task.");

        }

    };

    const handleStatusChange = async (id, status) => {

        try {

            await updateTaskStatus(id, status);

            toast.success("Task updated.");

            loadTasks();

        } catch (error) {

            console.error(error);

            toast.error("Unable to update task.");

        }

    };

    const handleDeleteTask = async (id) => {

        try {

            await deleteTask(id);

            toast.success("Task deleted.");

            loadTasks();

        } catch (error) {

            console.error(error);

            toast.error("Unable to delete task.");

        }

    };

    const filteredTasks = useMemo(() => {

        return tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );

    }, [tasks, search]);

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Dashboard
                </h1>

                <p className="text-gray-500 mb-8">
                    Manage your daily tasks efficiently.
                </p>

                <StatsCards tasks={tasks} />

                <div className="grid lg:grid-cols-3 gap-8 mt-8">

                    <div>

                        <TaskForm
                            title={title}
                            description={description}
                            priority={priority}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setPriority={setPriority}
                            onCreateTask={handleCreateTask}
                        />

                    </div>

                    <div className="lg:col-span-2 space-y-6">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                        <TaskList
                            tasks={filteredTasks}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDeleteTask}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}