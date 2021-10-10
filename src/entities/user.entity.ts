import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Ref } from 'src/types';

import { ObjectType, Field } from 'type-graphql';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './base.entity';

@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Property({ required: true })
  name: string;

  @Field((type) => [ObjectId])
  @Property({ default: [], type: ObjectId })
  followUsers: Ref<User>[];
}

export const UserModel = getModelForClass(User) as PaginateModel<User, typeof User>;
