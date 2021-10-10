import { Feed, FeedModel } from 'src/entities/feed.entity';

import { Service } from 'typedi';
import BaseEntityService from './base-entity.service';

@Service()
export class FeedService extends BaseEntityService<Feed> {
  constructor() {
    super(FeedModel);
  }
}
