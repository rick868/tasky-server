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
    isDeleted: boolean;
    isCompleted: boolean;
    dueDate?: Date;
    priority: string;
    project?: string;
    labels: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string; 
}

export interface AuthPayLoad {
    userId: string;
    username: string;
    email: string;
}