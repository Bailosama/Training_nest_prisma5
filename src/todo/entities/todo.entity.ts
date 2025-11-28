// src/todo/entities/todo.entity.ts
export class TodoEntity {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number; 
  
 
  user?: {
    id: number;
    name: string;
    email: string;
  };

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }

  static fromPrisma(todo: any): TodoEntity {
    return new TodoEntity({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      userId: todo.userId,
      user: todo.user ? {
        id: todo.user.id,
        name: todo.user.name,
        email: todo.user.email,
      } : undefined,
    });
  }
}