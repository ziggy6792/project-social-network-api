/* eslint-disable no-useless-constructor */

import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Feed } from 'src/entities/feed.entity';
import { FeedService } from 'src/services/feed.service';
import { ObjectId } from 'mongodb';
import { FeedList } from 'src/objects/lists';

@Service()
@Resolver((of) => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => FeedList)
  async listFeeds(@Arg('limit', { nullable: true }) limit: number, @Arg('nextCursor', { nullable: true }) nextCursor: string): Promise<FeedList> {
    const list = await this.feedService.getMany(limit, nextCursor);
    return new FeedList(list);
  }

  @Query(() => Feed)
  async getFeed(@Arg('id', () => ObjectId, { nullable: true }) id): Promise<Feed> {
    return this.feedService.getOne(id);
  }
}
