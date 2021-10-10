/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { User } from 'src/entities/user.entity';
import { Ref } from 'src/types';

import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;
}
