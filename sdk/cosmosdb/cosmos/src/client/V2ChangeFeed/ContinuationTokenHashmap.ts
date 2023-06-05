import { ChangeFeedRange } from "./ChangeFeedRange";
import { CompositeContinuationToken } from "./CompositeContinuationToken";

export class ContinuationTokenMap {
  private rId: string;
  private hashmap: Map<string, string>;

  constructor(rid: string) {
    this.rId = rid;
    this.hashmap = new Map<string, string>();
  }

  public addFeedRange(feedRange: ChangeFeedRange) {
    const keyString = JSON.stringify([feedRange.minInclusive, feedRange.maxExclusive]);
    this.hashmap.set(keyString, feedRange.continuationToken);
  }

  public updateFeedRange(oldFeedRangeKey: string, newFeedRange: ChangeFeedRange) {
    this.hashmap.delete(oldFeedRangeKey);
    this.addFeedRange(newFeedRange);
  }

  public deleteFeedRange(feedRange: ChangeFeedRange) {
    this.hashmap.delete(JSON.stringify([feedRange.minInclusive, feedRange.maxExclusive]));
  }

  public returnContinuationToken(): CompositeContinuationToken {
    const continuationToken: ChangeFeedRange[] = [];
    for (const [key, value] of this.hashmap.entries()) {
      const keys = JSON.parse(key);
      const feedRange: ChangeFeedRange = new ChangeFeedRange(keys[0], keys[1], value);
      continuationToken.push(feedRange);
    }
    return new CompositeContinuationToken(this.rId, continuationToken);
  }
}
