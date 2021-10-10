/* eslint-disable max-len */
import { mongoose } from '@typegoose/typegoose';
import { gCall } from 'src/test-utils/g-call';
import { dbWithFollowUsers } from 'src/test-utils/mock-db';
import mockDbUtils from 'src/test-utils/mock-db/mock-db-utils';
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

const myFeedQuery = `
query getUser($id: ObjectId,$limit:Int) {
  getUser(id:$id){
    id     
    myFeed(limit:$limit){
      items{
        id
        object
        verb
        datetime
        actor{
          name
        }
        target{
          name
        }
      }
      nextCursor
    }
  }
}`;

const friendsFeedQuery = `
query getUser($id: ObjectId,$limit:Int) {
  getUser(id:$id){
    id     
    friendsFeed(limit:$limit){
      items{
        id
        object
        verb
        datetime
        actor{
          name
        }
        target{
          name
        }
      }
      nextCursor
    }
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

  it('my feed', async () => {
    const response = await gCall({
      source: myFeedQuery,
      variableValues: {
        id: '6162e5780572be031a979e0d',
      },
    });

    const expectedResponse = {
      data: {
        getUser: {
          id: '6162e5780572be031a979e0d',
          myFeed: {
            items: [
              {
                id: '6162e7590572be031a979e27',
                object: 'post:1',
                verb: 'LIKE',
                datetime: '2021-10-10T13:15:05.866Z',
                actor: { name: 'eric' },
                target: { name: 'niko' },
              },
              {
                id: '6162e7710572be031a979e2b',
                object: 'post:1',
                verb: 'LIKE',
                datetime: '2021-10-10T13:15:29.949Z',
                actor: { name: 'eric' },
                target: { name: 'ivan' },
              },
            ],
            nextCursor: null,
          },
        },
      },
    };

    expect(response).toMatchObject(expectedResponse);
  });

  it('my feed with limit', async () => {
    const response = await gCall({
      source: myFeedQuery,
      variableValues: {
        id: '6162e5780572be031a979e0d',
        limit: 1,
      },
    });
    const expectedResponse = {
      data: {
        getUser: {
          id: '6162e5780572be031a979e0d',
          myFeed: {
            items: [
              {
                id: '6162e7590572be031a979e27',
                object: 'post:1',
                verb: 'LIKE',
                datetime: '2021-10-10T13:15:05.866Z',
                actor: { name: 'eric' },
                target: { name: 'niko' },
              },
            ],
            nextCursor: 'W3siJGRhdGUiOiIyMDIxLTEwLTEwVDEzOjE1OjA1Ljg2NloifSx7IiRvaWQiOiI2MTYyZTc1OTA1NzJiZTAzMWE5NzllMjcifV0',
          },
        },
      },
    };
    expect(response).toMatchObject(expectedResponse);
  });

  it('my friends feed', async () => {
    await mockDbUtils.populateDb(dbWithFollowUsers);
    const response = await gCall({
      source: friendsFeedQuery,
      variableValues: {
        id: '6162e6cd0572be031a979e15',
      },
    });
    const expectedResponse = {
      data: {
        getUser: {
          id: '6162e6cd0572be031a979e15',
          friendsFeed: {
            items: [
              {
                id: '6162e7590572be031a979e27',
                object: 'post:1',
                verb: 'LIKE',
                datetime: '2021-10-10T13:15:05.866Z',
                actor: { name: 'eric' },
                target: { name: 'niko' },
              },
              {
                id: '6162e7710572be031a979e2b',
                object: 'post:1',
                verb: 'LIKE',
                datetime: '2021-10-10T13:15:29.949Z',
                actor: { name: 'eric' },
                target: { name: 'ivan' },
              },
            ],
            nextCursor: null,
          },
        },
      },
    };
    expect(response).toMatchObject(expectedResponse);
  });
});
