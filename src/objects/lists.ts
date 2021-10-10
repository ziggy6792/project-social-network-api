/* eslint-disable max-classes-per-file */
// import createListObject from 'src/domain/common-objects/higher-order-objects/create-list-object';
import { Clip } from 'src/entities/clip.entity';
import { Reel } from 'src/entities/reel.entity';
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
export class ClipList extends BaseList {
  @Field(() => [Clip])
  items: Clip[];
}

@ObjectType()
export class ReelList extends BaseList {
  @Field(() => [Reel])
  items: Reel[];
}
