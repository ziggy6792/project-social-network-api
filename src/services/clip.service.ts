import { Clip, ClipModel } from 'src/entities/clip.entity';
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { IPaginateOptions, IPaginateResult } from 'typegoose-cursor-pagination';
import BaseEntityService from './base-entity.service';

@Service()
export class ClipService extends BaseEntityService<Clip> {
  constructor() {
    super(ClipModel);
  }

  async getByIds(ids: ObjectId[]): Promise<Clip[]> {
    // return ClipModel.myCustomFind({ _id: { $in: ids } });
    // const options: IPaginateOptions = {
    //   sortField: 'createdAt',
    //   sortAscending: true,
    //   limit: 10,
    //   next: 'WyJuZXdAdG9rYXMubmwiLHsiJG9pZCI6IjVjNGYxY2U1ODAwYzNjNmIwOGVkZGY3ZCJ9XQ',
    // };
    // const result = await ClipModel.findPaged(options, { _id: { $in: ids } });
    // return result.docs;
    return [];
  }
}
