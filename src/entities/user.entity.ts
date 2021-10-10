import { prop as Property, getModelForClass } from '@typegoose/typegoose';

import { ObjectType, Field } from 'type-graphql';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './base.entity';

@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Property({ required: true })
  name: string;
}

export const UserModel = getModelForClass(User) as PaginateModel<User, typeof User>;
