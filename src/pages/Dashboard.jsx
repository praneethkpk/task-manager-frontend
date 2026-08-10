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
import DeleteDialog from "../components/DeleteDialog";

import { toast } from "react-toastify";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Delete modal confirmation state
    const [deletingTask, setDeletingTask] = useState(null);

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

            toast.success("Task created successfully!");
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
            toast.success("Task status updated.");
            loadTasks();
        } catch (error) {
            console.error(error);
            toast.error("Unable to update task status.");
        }
    };

    // Open confirmation dialog
    const handlePromptDelete = (targetTaskOrId) => {
        if (typeof targetTaskOrId === "object" && targetTaskOrId !== null) {
            setDeletingTask(targetTaskOrId);
        } else {
            const found = tasks.find((t) => t.id === targetTaskOrId);
            setDeletingTask(found || { id: targetTaskOrId, title: "Task" });
        }
    };

    // Confirm deletion
    const handleConfirmDelete = async () => {
        if (!deletingTask) return;
        try {
            await deleteTask(deletingTask.id);
            toast.success("Task deleted successfully.");
            setDeletingTask(null);
            loadTasks();
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete task.");
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
            const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [tasks, search, statusFilter]);

    return (
        <div className="min-h-screen bg-slate-50/60 pb-16">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 animate-fade-in">
                {/* Page Title & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                        <div className="flex items-center space-x-2">
                            <LayoutDashboard className="w-6 h-6 text-blue-600" />
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Workspace Dashboard
                            </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Monitor metrics, organize tasks, and manage priority workflows.
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                            {tasks.length} Total Tasks
                        </span>
                    </div>
                </div>

                {/* Metric Summary Cards */}
                <StatsCards tasks={tasks} />

                {/* Dashboard Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Create Task Form */}
                    <div className="lg:col-span-1">
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

                    {/* Right Column: Search/Filter + Task Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            totalCount={filteredTasks.length}
                        />

                        <TaskList
                            tasks={filteredTasks}
                            onStatusChange={handleStatusChange}
                            onDelete={handlePromptDelete}
                        />
                    </div>
                </div>
            </main>

            {/* Modal Dialog for Delete Confirmation */}
            <DeleteDialog
                isOpen={Boolean(deletingTask)}
                task={deletingTask}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeletingTask(null)}
            />
        </div>
    );
}