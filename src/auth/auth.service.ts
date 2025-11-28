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
const userRoles = await this.prisma.userRoles.findMany({where: {userId: user.id} , include : {role : true}})
const roleName =  userRoles.map(userRole => userRole.role.name)
const accesToken = await  this.jwtService.signAsync(payload)
return {
email , accesToken,roles: roleName
 
  
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
    // Récupérer le rôle par défaut 
    const role = await this.prisma.role.findFirst({
      where: { name: 'Client' } // Assurez-vous qu'un rôle 'USER' existe dans votre base de données
    });

    if (!role) {
      throw new Error('Le rôle par défaut n\'a pas été trouvé');
    }

    // Créer la relation entre l'utilisateur et le rôle
    const userRole = await this.prisma.userRoles.create({
      data: {
        userId: user.id,
        roleId: role.id
      },
      include: {
        role: true
      }
    });

    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: accesToken,
        role: userRole.role.name
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
