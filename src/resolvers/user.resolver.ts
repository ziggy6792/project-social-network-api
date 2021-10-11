/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { ObjectId } from 'mongodb';
import { FeedList, UserList } from 'src/objects/lists';
import { CreateUserInput } from 'src/inputs/user.input';
import { FeedService } from 'src/services/feed.service';
import { Ref } from 'src/types';

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly feedService: FeedService) {}

  @Query(() => UserList)
  async listUsers(@Arg('limit', () => Int, { nullable: true }) limit: number, @Arg('nextCursor', { nullable: true }) nextCursor: string): Promise<UserList> {
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

  @Mutation(() => User)
  async follow(
    @Arg('actor', () => ObjectId, { nullable: true }) actor: Ref<User>,
    @Arg('follow', () => ObjectId, { nullable: true }) follow: Ref<User>
  ): Promise<User> {
    return this.userService.follow(actor, follow);
  }

  @Mutation(() => User)
  async unfollow(
    @Arg('actor', () => ObjectId, { nullable: true }) actor: Ref<User>,
    @Arg('follow', () => ObjectId, { nullable: true }) follow: Ref<User>
  ): Promise<User> {
    return this.userService.unfollow(actor, follow);
  }

  @FieldResolver((of) => FeedList)
  async myFeed(
    @Root() user: User,
    @Arg('limit', () => Int, { nullable: true }) limit: number,
    @Arg('nextCursor', { nullable: true }) nextCursor: string
  ): Promise<FeedList> {
    const list = await this.feedService.getFeedsByActor(user._id, limit, nextCursor);
    return new FeedList(list);
  }

  @FieldResolver((of) => FeedList)
  async friendsFeed(
    @Root() user: User,
    @Arg('limit', () => Int, { nullable: true }) limit: number,
    @Arg('nextCursor', { nullable: true }) nextCursor: string
  ): Promise<FeedList> {
    const list = await this.feedService.getFeedsByActors(user.followUsers, limit, nextCursor);
    return new FeedList(list);
  }
}
