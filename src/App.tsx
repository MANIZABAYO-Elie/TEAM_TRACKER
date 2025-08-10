// src/App.tsx
import React from "react";
import { TaskProvider } from "./contexts/taskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

export default function App() {
  return (
    <TaskProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold ml-56">Team Task Tracker</h1>
       
        <TaskForm />
        <TaskList />
         <TaskFilter />
      </div>
    </TaskProvider>
  );
}
