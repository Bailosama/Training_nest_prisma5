import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  async findAll() : Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany()
    return users.map(user=>UserEntity.formPrisma(user))
  
  }

  async findOne(id: number): Promise<UserEntity|null> {
    const user = await this.prisma.user.findUnique({where:{id}})
    if(!user) throw new Error("utilisateur non trouvé") 
    return UserEntity.formPrisma(user)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
