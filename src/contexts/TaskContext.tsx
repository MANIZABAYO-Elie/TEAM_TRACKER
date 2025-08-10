
// import React, { createContext, useReducer, useContext} from "react";
// import type { ReactNode } from "react";
// import type  { Task } from "../types/task";

// // Actions for reducer
// type TaskAction =
//   | { type: "ADD_TASK"; payload: Task }
//   | { type: "UPDATE_TASK"; payload: Task }
//   | { type: "DELETE_TASK"; payload: string }
//   | { type: "TOGGLE_COMPLETE"; payload: string };

// interface TaskState {
//   tasks: Task[];
// }

// const TaskStateContext = createContext<TaskState | undefined>(undefined);
// const TaskDispatchContext = createContext<React.Dispatch<TaskAction> | undefined>(undefined);

// // Reducer to handle all task actions
// function taskReducer(state: TaskState, action: TaskAction): TaskState {
//   switch (action.type) {
//     case "ADD_TASK":
//       return { tasks: [...state.tasks, action.payload] };
//     case "UPDATE_TASK":
//       return {
//         tasks: state.tasks.map((task) =>
//           task.id === action.payload.id ? action.payload : task
//         ),
//       };
//     case "DELETE_TASK":
//       return { tasks: state.tasks.filter((t) => t.id !== action.payload) };
//     case "TOGGLE_COMPLETE":
//       return {
//         tasks: state.tasks.map((task) =>
//           task.id === action.payload ? { ...task, completed: !task.completed } : task
//         ),
//       };
//     default:
//       return state;
//   }
// }

// // Provider for wrapping the app
// export function TaskProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

//   return (
//     <TaskStateContext.Provider value={state}>
//       <TaskDispatchContext.Provider value={dispatch}>
//         {children}
//       </TaskDispatchContext.Provider>
//     </TaskStateContext.Provider>
//   );
// }

// // Hooks to access state & dispatch
// export function useTaskState() {
//   const context = useContext(TaskStateContext);
//   if (!context) throw new Error("useTaskState must be used within TaskProvider");
//   return context;
// }

// export function useTaskDispatch() {
//   const context = useContext(TaskDispatchContext);
//   if (!context) throw new Error("useTaskDispatch must be used within TaskProvider");
//   return context;
// }



// src/contexts/TaskContext.tsx
import React, { createContext, useReducer, useContext, } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";

type Filters = {
  status: "All" | "Completed" | "Incomplete";
  priority: "All" | "Low" | "Medium" | "High";
  category: "All" | "Frontend" | "Backend" | "Meeting" | "Design";
};

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<Filters> };

interface TaskState {
  tasks: Task[];
  filters: Filters;
}

const TaskStateContext = createContext<TaskState | undefined>(undefined);
const TaskDispatchContext = createContext<React.Dispatch<TaskAction> | undefined>(undefined);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filters: {
      status: "All",
      priority: "All",
      category: "All",
    },
  });

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const context = useContext(TaskStateContext);
  if (!context) throw new Error("useTaskState must be used within TaskProvider");
  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);
  if (!context) throw new Error("useTaskDispatch must be used within TaskProvider");
  return context;
}
