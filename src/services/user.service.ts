import { User, UserModel } from 'src/entities/user.entity';

import { Ref } from 'src/types';
import { Service } from 'typedi';
import BaseEntityService from './base-entity.service';

@Service()
export class UserService extends BaseEntityService<User> {
  constructor() {
    super(UserModel);
  }
}
