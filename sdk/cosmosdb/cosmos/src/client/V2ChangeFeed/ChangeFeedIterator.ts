import { Resource } from "../Resource";
import { ChangeFeedResponseV2 } from "./ChangeFeedResponse";

export abstract class ChangeFeedIteratorV2<T> {
  abstract get hasMoreResults(): boolean;
  abstract fetchNext(): Promise<ChangeFeedResponseV2<Array<T & Resource>>>;
  async *getAsyncIterator(): AsyncIterable<ChangeFeedResponseV2<Array<T & Resource>>> {}
  async fetchAllFeedRanges(): Promise<void> {}
  abstract fetchOverLappingFeedRanges(epkRange: any): Promise<void>;
}
