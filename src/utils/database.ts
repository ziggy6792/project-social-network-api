import { connect, Mongoose } from 'mongoose';

import { MONGO_DB_URL } from 'src/config';

let connection: Mongoose;

export const connectMongo = async (): Promise<Mongoose> => {
  connection = connection || (await connect(MONGO_DB_URL));
  return connection;
};
