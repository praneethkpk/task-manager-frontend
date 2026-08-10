import { Search, X, Filter } from "lucide-react";

export default function SearchBar({
    search,
    setSearch,
    statusFilter = "ALL",
    setStatusFilter = () => {},
    totalCount = 0,
}) {
    const filterTabs = [
        { id: "ALL", label: "All Tasks" },
        { id: "PENDING", label: "Pending" },
        { id: "IN_PROGRESS", label: "In Progress" },
        { id: "COMPLETED", label: "Completed" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3.5">
            {/* Search Input Box */}
            <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Clear search"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex items-center space-x-1 overflow-x-auto py-0.5 scrollbar-none">
                    <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0 hidden sm:block" />
                    {filterTabs.map((tab) => {
                        const active = statusFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setStatusFilter(tab.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    active
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                    Showing {totalCount} {totalCount === 1 ? "task" : "tasks"}
                </span>
            </div>
        </div>
    );
}