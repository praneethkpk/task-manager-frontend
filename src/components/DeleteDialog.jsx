import { AlertTriangle, X } from "lucide-react";

export default function DeleteDialog({ isOpen, task, onConfirm, onCancel }) {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2 text-rose-600">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">
                            Delete Task
                        </h3>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="py-4">
                    <p className="text-sm text-slate-600">
                        Are you sure you want to delete <span className="font-semibold text-slate-900">"{task.title}"</span>?
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
