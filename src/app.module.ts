import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import  {ConfigModule} from '@nestjs/config'
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, TodoModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
