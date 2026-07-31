export default function StatsCards({ tasks }) {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.status === "COMPLETED"
    ).length;

    const pendingTasks = tasks.filter(
        task => task.status === "PENDING"
    ).length;

    const inProgressTasks = tasks.filter(
        task => task.status === "IN_PROGRESS"
    ).length;

    const highPriorityTasks = tasks.filter(
        task => task.priority === "HIGH"
    ).length;

    const cards = [
        {
            title: "Total Tasks",
            value: totalTasks,
            color: "bg-blue-500",
        },
        {
            title: "Completed",
            value: completedTasks,
            color: "bg-green-500",
        },
        {
            title: "Pending",
            value: pendingTasks,
            color: "bg-yellow-500",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            color: "bg-purple-500",
        },
        {
            title: "High Priority",
            value: highPriorityTasks,
            color: "bg-red-500",
        },
    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-md p-5"
                >

                    <div
                        className={`w-12 h-12 rounded-lg ${card.color} mb-4`}
                    ></div>

                    <h3 className="text-gray-500">
                        {card.title}
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {card.value}
                    </p>

                </div>

            ))}

        </div>

    );
}