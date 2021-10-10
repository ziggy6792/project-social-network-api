import { User, UserModel } from 'src/entities/user.entity';
import { Ref } from 'src/types';
import { Service } from 'typedi';
import BaseEntityService from './base-entity.service';

@Service()
export class UserService extends BaseEntityService<User> {
  constructor(private userModel = UserModel) {
    super(userModel);
  }

  public async follow(actor: Ref<User>, target: Ref<User>): Promise<User> {
    const user = await this.userModel.findById(actor);
    user.followUsers = [...user.followUsers, target];
    // ToDo: Maybe this can be done in one request instead of 2
    return this.userModel.findByIdAndUpdate(user._id, user);
  }
}
