import { TodoEntity } from "src/todo/entities/todo.entity";

export class UserEntity {
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
    todos: TodoEntity[];

    constructor(partial: Partial<UserEntity>) {
  Object.assign(this, partial);
}
static formPrisma( user:any): UserEntity{
    return new UserEntity({
        id: user.id,
        email: user.email,
        name: user.name,
        todos: user.todos,
        createdAt: user.createdAt
    })
}
}
