import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export default function TaskList({
    tasks,
    onStatusChange,
    onDelete,
}) {

    if (tasks.length === 0) {
        return (
            <EmptyState
                title="No Tasks Yet"
                message="Create your first task to get started."
            />
        );
    }

    return (

        <div className="space-y-5">

            {tasks.map((task) => (

                <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );
}