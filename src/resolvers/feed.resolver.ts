/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Mutation, Query, Resolver, Root, Int } from 'type-graphql';
import { Service } from 'typedi';
import { Feed } from 'src/entities/feed.entity';
import { FeedService } from 'src/services/feed.service';
import { ObjectId } from 'mongodb';
import { FeedList } from 'src/objects/lists';
import { CreateFeedInput } from 'src/inputs/feed.input';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Service()
@Resolver((of) => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService, private readonly userService: UserService) {}

  @Query(() => FeedList)
  async listFeeds(@Arg('limit', () => Int, { nullable: true }) limit: number, @Arg('nextCursor', { nullable: true }) nextCursor: string): Promise<FeedList> {
    const list = await this.feedService.getMany(limit, nextCursor);
    return new FeedList(list);
  }

  @Query(() => Feed)
  async getFeed(@Arg('id', () => ObjectId, { nullable: true }) id): Promise<Feed> {
    return this.feedService.getOne(id);
  }

  @Mutation(() => Feed)
  async createFeed(@Arg('input', () => CreateFeedInput) input: CreateFeedInput): Promise<Feed> {
    return this.feedService.createOne(input);
  }

  @FieldResolver(() => User)
  async actor(@Root() feed: Feed): Promise<User> {
    return this.userService.getOne(feed.actor);
  }

  @FieldResolver(() => User)
  async target(@Root() feed: Feed): Promise<User> {
    return this.userService.getOne(feed.target);
  }
}
