// tasks types
export type Priority = "Low" | "Medium" | "High";
export type Category = "Frontend" | "Backend" | "Meeting" | "Design";

export interface Task {
  id: string; 
  taskName: string;
  priority: Priority;
  category: Category;
  dueDate?: string; 
  assignedUser: string;
  assignedOn: string; 
  completed: boolean;
}
