/* eslint-disable max-classes-per-file */

import { User } from 'src/entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import { IPaginateResult } from 'typegoose-cursor-pagination';

@ObjectType()
export class BaseList {
  constructor(paginationResult: IPaginateResult<any>) {
    this.items = paginationResult.docs || [];
    this.nextCursor = paginationResult.next;
    this.prevCursor = paginationResult.previous;
    this.totalCount = paginationResult.totalDocs;
  }

  items: any[];

  @Field({ nullable: true })
  nextCursor: string;

  @Field({ nullable: true })
  prevCursor: string;

  @Field()
  totalCount: number;
}

@ObjectType()
export class UserList extends BaseList {
  @Field(() => [User])
  items: User[];
}

@ObjectType()
export class FeedList extends BaseList {
  @Field(() => [User])
  items: User[];
}
