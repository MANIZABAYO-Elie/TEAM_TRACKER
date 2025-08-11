
import React from "react";
import type { Task } from "../types/task";
import { useTaskDispatch } from "../contexts/taskContext";
import Button from "./Button";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskListItem({ task, onEdit }: TaskItemProps) {
  const dispatch = useTaskDispatch();

  return (
    <div className="flex justify-between items-center border p-3 rounded shadow-sm bg-gray-50">
      <div>
        <h3 className={`font-bold ${task.completed ? "line-through text-red-500" : ""}`}>
          {task.taskName}
        </h3>
        <p className="text-sm text-gray-600">
          {task.priority} | {task.category} | Assigned to: {task.assignedUser}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          label={task.completed ? "Undo" : "Complete"}
          className="bg-green-500 hover:bg-green-600"
          variant="success"
          onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: task.id })}
        />
        <Button label="Edit" variant="secondary" onClick={() => onEdit(task)} />
        <Button
          label="Delete"
          className="bg-red-500 hover:bg-red-600"
          variant="danger"
          onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
        />
      </div>
    </div>
  );
}
