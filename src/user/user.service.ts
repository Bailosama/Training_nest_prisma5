import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
 async create(createUserDto: CreateUserDto) : Promise<UserEntity | null> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    const newUser =  new UserEntity(user);
    return newUser
  }

  async findAll() : Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany()
    return users.map(user=>UserEntity.formPrisma(user))
  
  }

  async findOne(id: number): Promise<UserEntity|null> {
    const user = await this.prisma.user.findUnique({where:{id}})
    if(!user) return null 
    return UserEntity.formPrisma(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
