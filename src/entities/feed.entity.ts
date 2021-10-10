import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

import { ObjectType, Field } from 'type-graphql';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@ObjectType()
export class Feed extends BaseEntity {
  @Field((type) => ObjectId)
  @Property({ type: ObjectId })
  actor: Ref<User>[];
}

export const FeedModel = getModelForClass(Feed) as PaginateModel<Feed, typeof Feed>;
