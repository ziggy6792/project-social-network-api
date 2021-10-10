/* eslint-disable max-classes-per-file */
import { User } from 'src/entities/user.entity';

import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;
}
