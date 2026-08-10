import { ClipboardList } from "lucide-react";

export default function EmptyState({
    title = "No Tasks Found",
    message = "Create a new task or adjust your search filters to get started.",
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-500 mb-4 shadow-xs">
                <ClipboardList className="w-8 h-8 stroke-[1.75]" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                {title}
            </h3>

            <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                {message}
            </p>
        </div>
    );
}