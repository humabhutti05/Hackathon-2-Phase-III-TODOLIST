export interface Task {
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    category: string;
    due_date?: string;
    created_at: string;
}

export interface TaskCreate {
    title: string;
    description?: string;
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    is_completed?: boolean;
}

export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}
