/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { Clip } from 'src/entities/clip.entity';
import { ClipService } from 'src/services/clip.service';
import { ListClipsFilter } from 'src/inputs/reel.input';
import { ClipList } from 'src/objects/lists';

@Service()
@Resolver((of) => Clip)
export class ClipResolver {
  constructor(private readonly clipService: ClipService) {}

  @Query(() => ClipList)
  async listClips(
    @Arg('limit', { nullable: true }) limit: number,
    @Arg('filter', { nullable: true }) filter: ListClipsFilter,
    @Arg('nextCursor', { nullable: true }) nextCursor: string
  ): Promise<ClipList> {
    const clips = await this.clipService.getMany(limit, filter, nextCursor);
    return new ClipList(clips);
  }
}
