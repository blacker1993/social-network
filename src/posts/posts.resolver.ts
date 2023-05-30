import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './entities/post.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput): Promise<Post> {
    const { userId, ...rest } = data;
    return this.prisma.client.post.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
      },
    });
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.prisma.client.post.findMany();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.client.post.findUnique({ where: { id } });
  }

  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdatePostInput,
  ) {
    return this.prisma.client.post.update({ where: { id }, data });
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.client.post.delete({ where: { id } });
  }
}
