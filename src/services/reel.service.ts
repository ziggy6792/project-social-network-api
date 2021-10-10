import { Clip, ClipModel } from 'src/entities/clip.entity';
import { Reel, ReelModel } from 'src/entities/reel.entity';
import { AddId } from 'src/inputs/types';
import { Ref } from 'src/types';
import { Service } from 'typedi';
import BaseEntityService from './base-entity.service';

@Service()
export class ReelService extends BaseEntityService<Reel> {
  constructor() {
    super(ReelModel);
  }

  public async updateOne(input: AddId<Partial<Reel>>): Promise<Reel> {
    const existingReel = await ReelModel.findById(input.id);

    // Can access by service or by repository. I think there may be usecases for both
    // const clipService = this.context.getService(ClipService);

    const updatedReel = { ...input };

    updatedReel.definition = input.definition || existingReel.definition;
    updatedReel.standard = input.standard || existingReel.standard;
    // Set clips to exising or new
    updatedReel.clips = input.clips || existingReel.clips;

    const allowedClips = (await ClipModel.find(null, { definition: updatedReel.definition, standard: updatedReel.standard })) as Clip[];

    // Remove clips that are now allowed (i.e not the correct definition/standard)
    updatedReel.clips = updatedReel.clips.filter((clipId) => allowedClips.map((clip) => clip._id.toString()).includes(clipId.toString()));

    return super.updateOne(updatedReel);
  }

  async getOne(id: Ref<Reel>): Promise<Reel> {
    if (!id) {
      const first = await this.repository.find({}).limit(1);
      if (first.length > 0) {
        return first[0];
      }
    }
    return this.repository.findById(id);
  }
}
