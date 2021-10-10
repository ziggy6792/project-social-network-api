import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Ref } from 'src/types';

import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export enum Verb {
  SHARE = 'share',
  LIKE = 'like',
  POST = 'post',
  FOLLOW = 'follow',
}

registerEnumType(Verb, {
  name: 'Verb',
});

@ObjectType()
export class Feed extends BaseEntity {
  @Field((type) => ObjectId)
  @Property({ type: ObjectId })
  actor: Ref<User>;

  @Field((type) => ObjectId)
  @Property({ type: ObjectId })
  target: Ref<User>;

  @Field((type) => Verb)
  @Property({ type: String, enum: Verb })
  verb: Verb;

  @Field()
  @Property()
  object: string;
}

export const FeedModel = getModelForClass(Feed) as PaginateModel<Feed, typeof Feed>;
