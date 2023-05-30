import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PrismaService, PostsResolver],
})
export class PostsModule {}
