/* eslint-disable max-classes-per-file */
import { prop as Property, getModelForClass, mongoose, DocumentType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import { Standard, Definition } from 'src/enums';
import { TimecodeScalar } from 'src/graphql-setup/timecode.scalar';
import { Timecode } from 'src/timecode';
import { ObjectType, Field } from 'type-graphql';
import Container from 'typedi';
import Context from 'src/graphql-setup/context';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './base.entity';

const TimecodeMapper = {
  get: (val) => new Timecode(val),
  set: (val: Timecode) => val.toString(),
  transform: (val) => val,
};

@ObjectType()
export class Clip extends BaseEntity {
  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: true })
  description: string;

  @Field((type) => Standard)
  @Property({ type: String, enum: Standard })
  standard: Standard;

  @Field((type) => Definition)
  @Property({ type: String, enum: Definition })
  definition: Definition;

  @Field(() => TimecodeScalar)
  @Property({
    required: true,
    ...TimecodeMapper,
    type: String,
  })
  startTimecode: Timecode;

  @Field(() => TimecodeScalar)
  @Property({
    required: true,
    ...TimecodeMapper,
    type: String,
  })
  endTimecode: Timecode;
}

export const ClipModel = getModelForClass(Clip) as PaginateModel<Clip, typeof Clip>;
