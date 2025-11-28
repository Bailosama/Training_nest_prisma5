import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService ,private jwtService:JwtService) {}
  async login(loginDto: LoginDto) {
const {email , password} =  loginDto
const user = await this.prisma.user.findUnique({where: {email}})
if (!user) {
  throw new UnauthorizedException();
}
const isPasswordValid = await bcrypt.compare(password, user.password)
if (!isPasswordValid) {
  throw new UnauthorizedException();
}
const payload =  {sub : user.id , email : user.email}
const accesToken = await  this.jwtService.signAsync(payload)
return {
email , accesToken
 
  
}


    
  }
  async register (registerDto : RegisterDto){
    const {
      name,
      email,
      password
    } = registerDto

    const isExistingUser = await this.prisma.user.findUnique
    ({where : {  email}})
    if(isExistingUser){
   throw new HttpException('cet utilisateur existe deja ', HttpStatus.FORBIDDEN);
    }
    const SaltRounds = 10
    const hashPassword = await bcrypt.hash(password , SaltRounds)
    const user = await this.prisma.user.create({
      data : {
        name,
        email,
        password : hashPassword
      }
    })
    const payload =  {sub : user.id , email : user.email}
    const accesToken =await this.jwtService.signAsync(payload)
    return {
      data : {
        name ,
        email,
        accesToken
      }
    }
  
}
  async validateUser(userId:number){
    const user = await this.prisma.user.findFirst({where: {id:userId}})
      if (!user) {
      throw new UnauthorizedException();
    }
  const  {password , ...rest} = user
  return rest     
    
  }

 
}
