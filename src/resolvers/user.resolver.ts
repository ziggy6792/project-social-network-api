/* eslint-disable no-useless-constructor */

import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { ObjectId } from 'mongodb';
import { UserList } from 'src/objects/lists';

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserList)
  async listUsers(@Arg('limit', { nullable: true }) limit: number, @Arg('nextCursor', { nullable: true }) nextCursor: string): Promise<UserList> {
    const list = await this.userService.getMany(limit, nextCursor);
    return new UserList(list);
  }

  @Query(() => User)
  async getUser(@Arg('id', () => ObjectId, { nullable: true }) id): Promise<User> {
    return this.userService.getOne(id);
  }
}
