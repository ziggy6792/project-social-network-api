import { User, UserModel } from 'src/entities/user.entity';
import { Ref } from 'src/types';
import { Service } from 'typedi';
import BaseEntityService from './base-entity.service';

@Service()
export class UserService extends BaseEntityService<User> {
  constructor(private userModel = UserModel) {
    super(userModel);
  }

  // I did some quick error handling for this service. However a nicer way to handle errors with GraphQL is like this
  // https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/
  public async follow(actor: Ref<User>, target: Ref<User>): Promise<User> {
    const [actorUser, targetUser] = await Promise.all([this.userModel.findById(actor), this.userModel.findById(target)]);
    if (!actorUser) {
      throw new Error(`User with id ${actor.toString()} does not exist`);
    }
    if (!targetUser) {
      throw new Error(`User with id ${target.toString()} does not exist`);
    }
    if (actorUser.followUsers.map((u) => u.toString()).includes(target.toString())) {
      throw new Error(`User with id ${actor.toString()} is already following ${target.toString()}`);
    }
    actorUser.followUsers = [...actorUser.followUsers, target];
    return this.userModel.findByIdAndUpdate(actorUser._id, actorUser, { new: true });
  }

  public async unfollow(actor: Ref<User>, target: Ref<User>): Promise<User> {
    const [actorUser, targetUser] = await Promise.all([this.userModel.findById(actor), this.userModel.findById(target)]);
    if (!actorUser) {
      throw new Error(`User with id ${actor.toString()} does not exist`);
    }
    if (!targetUser) {
      throw new Error(`User with id ${target.toString()} does not exist`);
    }
    if (!actorUser.followUsers.map((u) => u.toString()).includes(target.toString())) {
      throw new Error(`User with id ${actor.toString()} is not already following ${target.toString()}`);
    }
    actorUser.followUsers = actorUser.followUsers.filter((u) => u.toString() !== target.toString());
    return this.userModel.findByIdAndUpdate(actorUser._id, actorUser, { new: true });
  }
}
