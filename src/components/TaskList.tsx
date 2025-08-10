
import  { useState } from "react";
import { useTaskState } from "../contexts/taskContext";
import TaskListItem from "../components/TaskListItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const { tasks, filters } = useTaskState();
  const [editingTask, setEditingTask] = useState<null | any>(null);

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (filters.status === "Completed" && !task.completed) return false;
    if (filters.status === "Incomplete" && task.completed) return false;

    // Priority filter
    if (filters.priority !== "All" && task.priority !== filters.priority) return false;

    // Category filter
    if (filters.category !== "All" && task.category !== filters.category) return false;

    return true;
  });

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks match your filters</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskListItem key={task.id} task={task} onEdit={(t) => setEditingTask(t)} />
        ))
      )}

      {editingTask && (
        <div className="mt-4">
          <h2 className="font-bold text-lg">Edit Task</h2>
          <TaskForm existingTask={editingTask} onClose={() => setEditingTask(null)} />
        </div>
      )}
    </div>
  );
}
