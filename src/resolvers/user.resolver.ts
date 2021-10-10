/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { ObjectId } from 'mongodb';
import { FeedList, UserList } from 'src/objects/lists';
import { CreateUserInput } from 'src/inputs/user.input';
import { FeedService } from 'src/services/feed.service';

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly feedService: FeedService) {}

  @Query(() => UserList)
  async listUsers(@Arg('limit', { nullable: true }) limit: number, @Arg('nextCursor', { nullable: true }) nextCursor: string): Promise<UserList> {
    const list = await this.userService.getMany(limit, nextCursor);
    return new UserList(list);
  }

  @Query(() => User)
  async getUser(@Arg('id', () => ObjectId, { nullable: true }) id): Promise<User> {
    return this.userService.getOne(id);
  }

  @Mutation(() => User)
  async createUser(@Arg('input', () => CreateUserInput) input: CreateUserInput): Promise<User> {
    return this.userService.createOne(input);
  }

  @FieldResolver((of) => FeedList)
  async myFeed(
    @Root() user: User,
    @Arg('limit', { nullable: true }) limit: number,
    @Arg('nextCursor', { nullable: true }) nextCursor: string
  ): Promise<FeedList> {
    const list = await this.feedService.getFeedsByActor(user._id, limit, nextCursor);
    return new FeedList(list);
  }
}
