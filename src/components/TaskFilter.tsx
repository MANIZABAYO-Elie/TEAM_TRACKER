
import React from "react";
import InputField from "./InputField";
import { useTaskState, useTaskDispatch } from "../contexts/taskContext";

export default function TaskFilter() {
  const { filters } = useTaskState();
  const dispatch = useTaskDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_FILTERS", payload: { [e.target.name]: e.target.value } });
  };

  return (
    <div className="flex gap-4 flex-wrap bg-gray-100 p-3 rounded">
      <InputField
        label="Status"
        name="status"
        value={filters.status}
        onChange={handleChange}
        options={["All", "Completed", "Incomplete"]}
      />
      <InputField
        label="Priority"
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        options={["All", "Low", "Medium", "High"]}
      />
      <InputField
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        options={["All", "Frontend", "Backend", "Meeting", "Design"]}
      />
    </div>
  );
}
