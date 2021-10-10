/* eslint-disable max-len */

export const dbDefault = {
  users: [
    {
      _id: '6162e5700572be031a979e0b',
      name: 'ivan',
      createdAt: '2021-10-10T13:06:56.441Z',
      updatedAt: '2021-10-10T13:06:56.441Z',
      followUsers: [],
    },
    {
      _id: '6162e5780572be031a979e0d',
      name: 'eric',
      createdAt: '2021-10-10T13:07:04.222Z',
      updatedAt: '2021-10-10T13:07:04.222Z',
      followUsers: [],
    },
    {
      _id: '6162e6cd0572be031a979e15',
      name: 'niko',
      createdAt: '2021-10-10T13:12:45.500Z',
      updatedAt: '2021-10-10T13:12:45.500Z',
      followUsers: [],
    },
  ],
  feeds: [
    {
      _id: '6162e6560572be031a979e11',
      actor: '6162e5700572be031a979e0b',
      target: '6162e5780572be031a979e0d',
      verb: 'share',
      object: 'photo:1',
      createdAt: '2021-10-10T13:10:46.364Z',
      updatedAt: '2021-10-10T13:10:46.364Z',
    },
    {
      _id: '6162e71f0572be031a979e1b',
      actor: '6162e5700572be031a979e0b',
      target: '6162e6cd0572be031a979e15',
      verb: 'share',
      object: 'photo:1',
      createdAt: '2021-10-10T13:14:07.942Z',
      updatedAt: '2021-10-10T13:14:07.942Z',
    },
    {
      _id: '6162e7590572be031a979e27',
      actor: '6162e5780572be031a979e0d',
      target: '6162e6cd0572be031a979e15',
      verb: 'like',
      object: 'post:1',
      createdAt: '2021-10-10T13:15:05.866Z',
      updatedAt: '2021-10-10T13:15:05.866Z',
    },
    {
      _id: '6162e7710572be031a979e2b',
      actor: '6162e5780572be031a979e0d',
      target: '6162e5700572be031a979e0b',
      verb: 'like',
      object: 'post:1',
      createdAt: '2021-10-10T13:15:29.949Z',
      updatedAt: '2021-10-10T13:15:29.949Z',
    },
    {
      _id: '6162e7a90572be031a979e2f',
      actor: '6162e6cd0572be031a979e15',
      target: '6162e5700572be031a979e0b',
      verb: 'post',
      object: 'post:2',
      createdAt: '2021-10-10T13:16:25.596Z',
      updatedAt: '2021-10-10T13:16:25.596Z',
    },
    {
      _id: '6162e7b40572be031a979e33',
      actor: '6162e6cd0572be031a979e15',
      target: '6162e5780572be031a979e0d',
      verb: 'post',
      object: 'post:2',
      createdAt: '2021-10-10T13:16:36.817Z',
      updatedAt: '2021-10-10T13:16:36.817Z',
    },
  ],
};

export const dbWithFollowUsers = {
  users: [
    {
      _id: '6162e5700572be031a979e0b',
      name: 'ivan',
      createdAt: '2021-10-10T13:06:56.441Z',
      updatedAt: '2021-10-10T13:06:56.441Z',
      followUsers: [],
    },
    {
      _id: '6162e5780572be031a979e0d',
      name: 'eric',
      createdAt: '2021-10-10T13:07:04.222Z',
      updatedAt: '2021-10-10T13:07:04.222Z',
      followUsers: [],
    },
    {
      _id: '6162e6cd0572be031a979e15',
      name: 'niko',
      createdAt: '2021-10-10T13:12:45.500Z',
      updatedAt: '2021-10-10T13:12:45.500Z',
      followUsers: ['6162e5780572be031a979e0d'],
    },
  ],
  feeds: [...dbDefault.feeds],
};
