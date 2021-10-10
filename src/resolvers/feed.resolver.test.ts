/* eslint-disable max-len */
import { mongoose } from '@typegoose/typegoose';
import { gCall } from 'src/test-utils/g-call';
import testConn from 'src/test-utils/test-conn';

beforeAll(async () => {
  await testConn();
});

const createFeedMutation = `mutation createFeed($createFeedInput: CreateFeedInput!){ 
  createFeed(input: $createFeedInput){    
    verb
    object
  }
}`;

// ToDo move to globalTeardown
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('Feed Resolver', () => {
  it('should create feed correctly', async () => {
    const response = await gCall({
      source: createFeedMutation,
      variableValues: {
        createFeedInput: {
          actor: '6162e6cd0572be031a979e15',
          verb: 'POST',
          object: 'test:post',
          target: '6162e5780572be031a979e0d',
        },
      },
    });

    const expectedResponse = { data: { createFeed: { verb: 'POST', object: 'test:post' } } };

    expect(response).toMatchObject(expectedResponse);
  });
});
