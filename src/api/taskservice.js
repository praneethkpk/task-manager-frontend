import api from "./axios";

export const createTask = (data) =>
    api.post("/tasks", data);

export const getTasks = () =>
    api.get("/tasks");