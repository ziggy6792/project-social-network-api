import { connect, Mongoose } from 'mongoose';

import { MONGO_DB_URI } from 'src/config';

let connection: Mongoose;

export const connectMongo = async (): Promise<Mongoose> => {
  connection = connection || (await connect(MONGO_DB_URI));
  return connection;
};
