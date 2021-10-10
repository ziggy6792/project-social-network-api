import { Feed, FeedModel } from 'src/entities/feed.entity';
import { User } from 'src/entities/user.entity';
import { Ref } from 'src/types';

import { Service } from 'typedi';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';
import BaseEntityService from './base-entity.service';

@Service()
export class FeedService extends BaseEntityService<Feed> {
  constructor() {
    super(FeedModel);
  }

  getFeedsByActor(user: Ref<User>, limit?: number, nextCursor?: string): Promise<IPaginateResult<Feed>> {
    const options: IPaginateOptions = {
      sortField: 'createdAt',
      sortAscending: true,
      limit,
      next: nextCursor,
    };
    return this.model.findPaged(options, { actor: { $eq: user } });
  }
}
