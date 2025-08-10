// src/components/TaskForm.tsx
import React, { useState } from "react";
import type { Task, Priority, Category } from "../types/task";
import { useTaskDispatch } from "../contexts/TaskContext";
import Button from "./Button";
import InputField from "./InputField";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
    existingTask?: Task;
    onClose?: () => void;
}

export default function TaskForm({ existingTask, onClose }: TaskFormProps) {
    const dispatch = useTaskDispatch();

    const [form, setForm] = useState<Task>(
        existingTask || {
            id: "",
            taskName: "",
            priority: "Low",
            category: "Frontend",
            dueDate: "",
            assignedUser: "",
            assignedOn: new Date().toISOString().split("T")[0],
            completed: false,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (existingTask) {
            dispatch({ type: "UPDATE_TASK", payload: form });
        } else {
            dispatch({ type: "ADD_TASK", payload: { ...form, id: uuidv4() } });
        }
        onClose?.();
    };

    return (
        <form onSubmit={handleSubmit} className=" flex w-3/4 bg-white p-4 rounded shadow justify-center items-center">
            <div>
                <InputField
                    label="Task Name"
                    name="taskName"
                    value={form.taskName}
                    onChange={handleChange}
                    placeholder="Enter task name"
                />
                <InputField
                    label="Priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    options={["Low", "Medium", "High"]}
                />
                <InputField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    options={["Frontend", "Backend", "Meeting", "Design"]}
                />
                <InputField
                    label="Due Date"
                    name="dueDate"
                    value={form.dueDate || ""}
                    onChange={handleChange}
                    type="date"
                />
                <InputField
                    label="Assigned User"
                    name="assignedUser"
                    value={form.assignedUser}
                    onChange={handleChange}
                    placeholder="Enter name"
                />
                <Button type="submit" label={existingTask ? "Update Task" : "Add Task"} />
            </div>

        </form>
    );
}
