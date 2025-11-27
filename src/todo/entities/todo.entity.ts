export class TodoEntity {
    name : string 
    description : string 
    createdAt : Date 
   constructor (partial : Partial<TodoEntity>) {
    Object.assign(this, partial)
   }
   static FormData (todo:any) : TodoEntity {
    return new TodoEntity({
        name : todo.name,
        description : todo.description,
        createdAt : todo.createdAt
    })
   }
}
