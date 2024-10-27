export interface User {
    id: number;
    userName: string;
    email: string;
    token?: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    attachment?: string;
    userId: number;
    completed: boolean;
  }
  