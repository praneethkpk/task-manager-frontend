import { Layers, CheckCircle2, Clock, PlayCircle, AlertCircle } from "lucide-react";

export default function StatsCards({ tasks = [] }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "COMPLETED").length;
    const pendingTasks = tasks.filter(task => task.status === "PENDING").length;
    const inProgressTasks = tasks.filter(task => task.status === "IN_PROGRESS").length;
    const highPriorityTasks = tasks.filter(task => task.priority === "HIGH").length;

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const cards = [
        {
            title: "Total Tasks",
            value: totalTasks,
            icon: Layers,
            bgGradient: "from-blue-500 to-blue-600",
            iconBg: "bg-blue-50 text-blue-600 border-blue-100",
            badgeText: `${completionRate}% Done`,
        },
        {
            title: "Completed",
            value: completedTasks,
            icon: CheckCircle2,
            bgGradient: "from-emerald-500 to-teal-600",
            iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
            badgeText: "Finished",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            icon: PlayCircle,
            bgGradient: "from-indigo-500 to-purple-600",
            iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
            badgeText: "Active",
        },
        {
            title: "Pending",
            value: pendingTasks,
            icon: Clock,
            bgGradient: "from-amber-500 to-orange-500",
            iconBg: "bg-amber-50 text-amber-600 border-amber-100",
            badgeText: "Queued",
        },
        {
            title: "High Priority",
            value: highPriorityTasks,
            icon: AlertCircle,
            bgGradient: "from-rose-500 to-red-600",
            iconBg: "bg-rose-50 text-rose-600 border-rose-100",
            badgeText: "Urgent",
        },
    ];

    return (
        <div className="space-y-4">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {cards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.iconBg} transition-transform group-hover:scale-105`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                                    {card.badgeText}
                                </span>
                            </div>

                            <p className="text-xs font-medium text-slate-500">
                                {card.title}
                            </p>
                            <p className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                                {card.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Completion Progress Bar */}
            {totalTasks > 0 && (
                <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-800">
                                Overall Progress
                            </p>
                            <p className="text-[11px] text-slate-400">
                                {completedTasks} of {totalTasks} tasks completed
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full sm:w-72">
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-slate-700 w-9 text-right">
                            {completionRate}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}