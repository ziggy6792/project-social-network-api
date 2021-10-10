/* eslint-disable max-classes-per-file */

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
