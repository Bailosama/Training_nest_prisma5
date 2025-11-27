// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect(); // se connecte à la base
  }

  async onModuleDestroy() {
    await this.$disconnect(); // ferme proprement la connexion
  }
}
