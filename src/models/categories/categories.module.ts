import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesResolver, CategoriesService, PrismaService],
})
export class CategoriesModule {}
