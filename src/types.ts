import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongodb';
import { LeanDocument, ReadonlyPartial, __UpdateQueryDef } from 'mongoose';
import { PaginateModel } from 'typegoose-cursor-pagination';
import { BaseEntity } from './entities/base.entity';

export type Ref<T> = T | ObjectId;

export type MongooseUpdate<T> = ReadonlyPartial<__UpdateQueryDef<LeanDocument<DocumentType<T, BeAnObject>>>>;

export type BaseEntityModel<T extends BaseEntity> = PaginateModel<T, any>;
