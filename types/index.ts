export interface User{
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string; 
}

export interface AuthPayLoad {
    userId: string;
    username: string;
    email: string;
}