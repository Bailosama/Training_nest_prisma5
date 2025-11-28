import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor (private prisma : PrismaService) {}
 async create(createTodoDto: CreateTodoDto ) : Promise<TodoEntity> {
    const todo = await this.prisma.todo.create({
   data : createTodoDto
    })
    return TodoEntity.fromPrisma(todo)
  }

  async findAll(): Promise<TodoEntity[]> {
  const data = await this.prisma.todo.findMany({include : {user : true}})
  return data.map(todo => TodoEntity.fromPrisma(todo))

  }

  async findOne(id: number) : Promise<TodoEntity> {
  const todo = await this.prisma.todo.findUnique({where: {id}, include : {user : true}})
  if(!todo) {
   throw new HttpException('Todo Non trouvée', HttpStatus.FORBIDDEN);
  }
  return TodoEntity.fromPrisma(todo)
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) : Promise<TodoEntity> {
    const todoId = await this.prisma.todo.findUnique({where: {id}})
    if(!todoId){
      throw new HttpException('Todo Non trouvée', HttpStatus.FORBIDDEN);
    }
    const todo = await this.prisma.todo.update({where: {id}, data: updateTodoDto})

    return TodoEntity.fromPrisma(todo)
  }

  async remove(id: number) {
   const todo = await this.prisma.todo.delete({where: {id}})
   if(!todo) {
    throw new HttpException('Todo Non trouvée', HttpStatus.FORBIDDEN);
   }
   const deletedTodo = TodoEntity.fromPrisma(todo)
   return "TODO supprimé avec succes "
  }
}
