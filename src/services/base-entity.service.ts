/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Inject } from 'typedi';
import { MongooseUpdate, Ref, BaseEntityModel } from 'src/types';
import Context from 'src/graphql-setup/context';
import { BaseEntity } from 'src/entities/base.entity';
import { AddId } from 'src/inputs/types';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';

export default class BaseEntityService<T extends BaseEntity> {
  @Inject('context') protected readonly context: Context;

  constructor(protected model: BaseEntityModel<T>) {}

  async getOne(id: Ref<T>): Promise<T> {
    if (!id) {
      return null;
    }
    return this.model.findById(id);
  }

  async getMany(limit?: number, filter?: Partial<T>, nextCursor?: string): Promise<IPaginateResult<T>> {
    const options: IPaginateOptions = {
      sortField: 'createdAt',
      sortAscending: true,
      limit,
      next: nextCursor,
    };

    return this.model.findPaged(options, filter);
  }

  public async createOne(input: Partial<T>): Promise<T> {
    return this.model.create(input);
  }

  public async updateOne(input: AddId<Partial<T>>): Promise<T> {
    return this.model.findByIdAndUpdate(input.id, input as MongooseUpdate<T>, { new: true });
  }

  public async createMany(inputs: Partial<T>[]): Promise<T[]> {
    return this.model.create(inputs);
  }

  public async deleteOne(partitionKey: Ref<T>): Promise<T> {
    return this.model.findByIdAndDelete(partitionKey);
  }
}
