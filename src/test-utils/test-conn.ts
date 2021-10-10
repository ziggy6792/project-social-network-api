import { dbDefault } from './mock-db';
import mockDbUtils from './mock-db/mock-db-utils';

const testConn = async (): Promise<void> => {
  await mockDbUtils.populateDb(dbDefault);
};

export default testConn;
