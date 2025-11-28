import { Controller, Get, Post, Body, Patch, Param, Delete , Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('login')
 async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

@Post('register')
async register (@Body() registerDto: RegisterDto){
  return this.authService.register(registerDto)
}
 
@UseGuards(JwtAuthGuard)
  @Get('getProfile')
 async getProfile (@Request() req){
  return this.authService.validateUser(req.user.sub)

}
}
