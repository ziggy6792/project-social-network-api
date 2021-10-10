import { Feed, FeedModel } from 'src/entities/feed.entity';
import { User } from 'src/entities/user.entity';
import { Ref } from 'src/types';

import { Service } from 'typedi';
import { IPaginateResult } from 'typegoose-cursor-pagination';
import BaseEntityService from './base-entity.service';

@Service()
export class FeedService extends BaseEntityService<Feed> {
  constructor(private feedModel = FeedModel) {
    super(feedModel);
  }

  async getFeedsByActor(user: Ref<User>, limit?: number, nextCursor?: string): Promise<IPaginateResult<Feed>> {
    const options = this.getPaginateOptions(limit, nextCursor);
    return this.feedModel.findPaged(options, { actor: { $eq: user } });
  }

  async getFeedsByActors(users: Ref<User>[], limit?: number, nextCursor?: string): Promise<IPaginateResult<Feed>> {
    const options = this.getPaginateOptions(limit, nextCursor);
    return this.feedModel.findPaged(options, { actor: { $in: users } });
  }
}
