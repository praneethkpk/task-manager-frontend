import api from "./axios";

export const createTask = (data) =>
    api.post("/tasks", data);

export const getTasks = () =>
    api.get("/tasks");
export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);

export const updateTaskStatus = (
    id,
    status
) =>
    api.patch(
        `/tasks/${id}/status`,
        { status }
    );

