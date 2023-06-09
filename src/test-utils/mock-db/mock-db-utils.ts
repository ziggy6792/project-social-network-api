import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { FeedModel } from 'src/entities/feed.entity';
import { UserModel } from 'src/entities/user.entity';

import { connectMongo } from 'src/utils/database';
import { IMockDb } from './types';

const modelMap = {
  users: UserModel,
  feeds: FeedModel,
};

const populateDb = async (mockDb: IMockDb): Promise<void> => {
  const mongoose = await connectMongo();
  await mongoose.connection.db.dropDatabase();
  const putFns = Object.keys(mockDb).map((key: keyof IMockDb) => {
    const dbItems = mockDb[key];
    const model: ReturnModelType<AnyParamConstructor<any>> = modelMap[key];
    return async () => model.create(dbItems);
  });
  await Promise.all(putFns.map((fn) => fn()));
};

const mockDbUtils = {
  populateDb,
};

export default mockDbUtils;
