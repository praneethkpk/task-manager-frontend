export default function SearchBar({
    search,
    setSearch,
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-5">

            <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

    );
}