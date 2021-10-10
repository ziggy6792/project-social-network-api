/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Feed, Verb } from 'src/entities/feed.entity';
import { User } from 'src/entities/user.entity';

import { Ref } from 'src/types';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateFeedInput implements Partial<Feed> {
  @Field((type) => ObjectId)
  actor: Ref<User>;

  @Field((type) => ObjectId)
  target: Ref<User>;

  @Field((type) => Verb)
  verb: Verb;

  @Field()
  object: string;
}
