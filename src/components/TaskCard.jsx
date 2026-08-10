import { Trash2, AlertCircle, Clock, CheckCircle2, Calendar } from "lucide-react";

export default function TaskCard({
    task,
    onStatusChange,
    onDelete,
}) {
    const priorityConfig = {
        HIGH: { label: "High Priority", bg: "bg-rose-50 text-rose-700 border-rose-200/80", dot: "bg-rose-500" },
        MEDIUM: { label: "Medium", bg: "bg-amber-50 text-amber-700 border-amber-200/80", dot: "bg-amber-500" },
        LOW: { label: "Low Priority", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80", dot: "bg-emerald-500" },
    };

    const statusConfig = {
        PENDING: { label: "Pending", bg: "bg-slate-100 text-slate-700 border-slate-200", icon: Clock },
        IN_PROGRESS: { label: "In Progress", bg: "bg-blue-50 text-blue-700 border-blue-200", icon: AlertCircle },
        COMPLETED: { label: "Completed", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
    };

    const prio = priorityConfig[task.priority] || priorityConfig.MEDIUM;
    const stat = statusConfig[task.status] || statusConfig.PENDING;

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 p-5 group flex flex-col justify-between">
            <div>
                {/* Card Header: Priority Pill & Date */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${prio.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${prio.dot}`} />
                        <span>{prio.label}</span>
                    </span>

                    {task.createdAt && (
                        <span className="text-[11px] font-medium text-slate-400 flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className={`text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors ${
                    task.status === "COMPLETED" ? "line-through text-slate-400" : ""
                }`}>
                    {task.title}
                </h3>

                {/* Description */}
                {task.description && (
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                        {task.description}
                    </p>
                )}
            </div>

            {/* Card Footer: Status Dropdown & Delete Trigger */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 gap-3">
                <div className="relative">
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className={`appearance-none text-xs font-semibold px-3 py-1.5 pr-7 rounded-xl border ${stat.bg} focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-200`}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                        ▼
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/60 transition-all duration-200 cursor-pointer"
                    title="Delete task"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}