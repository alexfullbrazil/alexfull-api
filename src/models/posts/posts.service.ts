import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteOnePostArgs } from 'src/types/post/delete-one-post.args';
import { FindManyPostArgs } from 'src/types/post/find-many-post.args';
import { FindUniquePostArgs } from 'src/types/post/find-unique-post.args';
import { PostCreateInput } from 'src/types/post/post-create.input';
import { PostOrderByWithRelationInput } from 'src/types/post/post-order-by-with-relation.input';
import { PostUpdateInput } from 'src/types/post/post-update.input';
import { PostWhereInput } from 'src/types/post/post-where.input';
import { Post } from 'src/types/post/post.model';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(postCreateInput: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data: postCreateInput,
    });
  }

  async getPosts(
    findManyPostArgs: FindManyPostArgs,
    orderByPostsArgs: PostOrderByWithRelationInput,
    wherePostsArgs: PostWhereInput,
  ): Promise<Post[]> {
    return await this.prisma.post.findMany({
      take: findManyPostArgs.take,
      skip: findManyPostArgs.skip,

      include: {
        category: true,
        author: true,
      },

      where: {
        OR: {
          title: {
            contains: wherePostsArgs.title.contains,
          },
          content: {
            contains: wherePostsArgs.content.contains,
          },
        },
      },

      orderBy: [
        {
          title: orderByPostsArgs.title,
        },
        {
          createdAt: orderByPostsArgs.createdAt,
        },
      ],
    });
  }

  async getPost(findUniquePostArgs: FindUniquePostArgs): Promise<Post> {
    return await this.prisma.post.findUnique(findUniquePostArgs);
  }

  async updatePost(
    updatePostInput: PostUpdateInput,
    id: string,
  ): Promise<Post> {
    return await this.prisma.post.update({
      data: {
        ...updatePostInput,
      },
      where: {
        id,
      },
    });
  }

  async deletePost(deleteOnePostArgs: DeleteOnePostArgs): Promise<Post> {
    return await this.prisma.post.delete(deleteOnePostArgs);
  }
}
