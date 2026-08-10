import { PlusCircle, FileText, Tag, Heading } from "lucide-react";

export default function TaskForm({
    title,
    description,
    priority,
    setTitle,
    setDescription,
    setPriority,
    onCreateTask,
}) {
    const priorityOptions = [
        { id: "LOW", label: "Low", activeColor: "bg-emerald-500 text-white border-emerald-500" },
        { id: "MEDIUM", label: "Medium", activeColor: "bg-amber-500 text-white border-amber-500" },
        { id: "HIGH", label: "High", activeColor: "bg-rose-500 text-white border-rose-500" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTask();
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sticky top-20">
            <div className="flex items-center space-x-2.5 mb-5 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                        Create New Task
                    </h2>
                    <p className="text-xs text-slate-400">
                        Add a task to your workspace
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center space-x-1.5">
                        <Heading className="w-3.5 h-3.5 text-slate-400" />
                        <span>Task Title *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Complete quarterly report..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Description</span>
                    </label>
                    <textarea
                        placeholder="Add additional details or notes..."
                        value={description}
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                    />
                </div>

                {/* Priority Selection */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        <span>Priority Level</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {priorityOptions.map((opt) => {
                            const isSelected = priority === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setPriority(opt.id)}
                                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                        isSelected
                                            ? opt.activeColor + " shadow-xs"
                                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Task</span>
                </button>
            </form>
        </div>
    );
}