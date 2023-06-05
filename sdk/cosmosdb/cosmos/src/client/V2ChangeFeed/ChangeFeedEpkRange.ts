import { ChangeFeedRange } from "./ChangeFeedRange";
import { ChangeFeedResponseV2 } from "./ChangeFeedResponse";
import { ChangeFeedOptionsV2 } from "./ChangeFeedOptions";
import { PartitionKeyRangeCache, QueryRange } from "../../routing";
import { FeedRangeQueue } from "./FeedRangeQueue";
import { ClientContext } from "../../ClientContext";
import { Resource } from "../../client";
import { Constants, SubStatusCodes, StatusCodes, ResourceType } from "../../common";
import { Response, FeedOptions, ErrorResponse } from "../../request";
import { PartitionKeyRange } from "../../client";
import { base64Encode, base64Decode } from "../../utils/base64EncodeDecode";
import { ContinuationTokenMap } from "./ContinuationTokenHashmap";
import { CompositeContinuationToken } from "./CompositeContinuationToken";
import { ChangeFeedIteratorV2 } from "./ChangeFeedIterator";
/**
 * Provides iterator for change feed.
 *
 * Use `Items.changeFeed()` to get an instance of the iterator.
 */
export class ChangeFeedEpkRange<T> extends ChangeFeedIteratorV2<T> {
  // private containerRid : string;
  private continuationTokenMap: ContinuationTokenMap;
  private continuationToken?: CompositeContinuationToken;
  private queue: FeedRangeQueue<ChangeFeedRange>;
  private startTime: string;
  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
    private resourceId: string,
    private resourceLink: string,
    private url: string,
    private rId: string,
    private changeFeedOptions: ChangeFeedOptionsV2
  ) {
    super();
    let canUseStartFromBeginning = true;
    if (changeFeedOptions.continuationToken) {
      canUseStartFromBeginning = false;
      this.continuationToken = JSON.parse(base64Decode(changeFeedOptions.continuationToken));
    }

    if (changeFeedOptions.startTime) {
      this.startTime = changeFeedOptions.startTime.toUTCString();
      canUseStartFromBeginning = false;
    }

    if (
      canUseStartFromBeginning &&
      changeFeedOptions.startFromBeginning !== undefined &&
      !changeFeedOptions.startFromBeginning
    ) {
      throw new ErrorResponse(
        "startFromBeginning must be true if no start time or continuation is specified."
      );
    }

    this.queue = new FeedRangeQueue<ChangeFeedRange>();
    this.continuationTokenMap = new ContinuationTokenMap(this.rId);

    if (this.continuationToken) {
      if (!this.continuationTokenRidMatchContainerRid()) {
        throw new ErrorResponse("Container rid does not match with the continuation token rid");
      } else {
        for (const contToken of this.continuationToken.Continuation) {
          const feedRange: ChangeFeedRange = new ChangeFeedRange(
            contToken.minInclusive,
            contToken.maxExclusive,
            contToken.continuationToken
          );

          this.queue.enqueue(feedRange);
          this.continuationTokenMap.addFeedRange(feedRange);
        }
      }
    }
  }

  private continuationTokenRidMatchContainerRid(): boolean {
    if (this.continuationToken.rid !== this.rId) {
      return false;
    }
    return true;
  }

  public async fetchAllFeedRanges(): Promise<void> {
    try {
      const pkRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.url)
      ).getOrderedParitionKeyRanges();
      for (const pkRange of pkRanges) {
        const feedRange: ChangeFeedRange = new ChangeFeedRange(
          pkRange.minInclusive,
          pkRange.maxExclusive,
          ""
        );
        this.queue.enqueue(feedRange);
        this.continuationTokenMap.addFeedRange(feedRange);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async fetchOverLappingFeedRanges(pkRange: PartitionKeyRange): Promise<void> {
    const queryRange = new QueryRange(pkRange.minInclusive, pkRange.maxExclusive, true, false);
    try {
      const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
        this.url,
        queryRange
      );

      for (const overLappingRange of overLappingRanges) {
        const feedRange: ChangeFeedRange = new ChangeFeedRange(
          overLappingRange.minInclusive,
          overLappingRange.maxExclusive,
          ""
        );
        this.queue.enqueue(feedRange);
        this.continuationTokenMap.addFeedRange(feedRange);
      }
    } catch (err) {
      throw new ErrorResponse(err.message);
    }
  }
  /**
   * Gets a value indicating whether there are potentially additional results that can be retrieved.
   *
   * Initially returns true. This value is set based on whether there are any remaining unread epkRanges left in the queue.
   *
   * @returns Boolean value representing if whether there are potentially additional results that can be retrieved.
   */
  get hasMoreResults(): boolean {
    return !this.queue.isEmpty();
  }

  /**
   * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
   */
  public async *getAsyncIterator(): AsyncIterable<ChangeFeedResponseV2<Array<T & Resource>>> {
    do {
      const result = await this.fetchNext();
      if (result.count > 0) {
        yield result;
      }
    } while (this.hasMoreResults);
  }

  private removeFeedRange(): void {
    this.queue.dequeue();
  }

  /**
   * Read feed and retrieves the next page of results in Azure Cosmos DB.
   */
  public async fetchNext(): Promise<ChangeFeedResponseV2<Array<T & Resource>>> {
    const feedRange = this.queue.peek();
    if (feedRange) {
      const result = await this.getFeedResponse(feedRange);

      const shouldRetry: boolean = await this.shouldRetryOnFailure(feedRange, result);

      if (shouldRetry) {
        this.continuationTokenMap.deleteFeedRange(feedRange);
        this.removeFeedRange();
        return await this.fetchNext();
      } else {
        const continuationValueForFeedRange = result.headers[Constants.HttpHeaders.ETag];
        const newFeedRange = this.queue.peek();
        newFeedRange.continuationToken = continuationValueForFeedRange;
        const oldFeedRangeKey = JSON.stringify([
          newFeedRange.minInclusive,
          newFeedRange.maxExclusive,
        ]);
        this.continuationTokenMap.updateFeedRange(oldFeedRangeKey, newFeedRange); // THERE MIGHT BE A PROBLEM HERE
        // this.queue.modifyFirstElement(newFeedRange);

        if (this.partitionAllResultsFetched(result)) {
          this.removeFeedRange();
        }

        // this.newContinuationToken = new CompositeContinuationToken(this.rId, this.continuationTokenMap);  // TODO, still pending
        result.headers[Constants.HttpHeaders.ContinuationToken] = base64Encode(
          JSON.stringify(this.continuationTokenMap.returnContinuationToken())
        );
        return result;
      }
    }
  }

  private partitionAllResultsFetched(response: ChangeFeedResponseV2<Array<T & Resource>>): boolean {
    return response.statusCode === StatusCodes.NotModified;
  }

  /**
   * Checks whether the current EpkRange is split into multiple ranges or not.
   *
   * If yes, it force refreshes the partitionKeyRange cache and will dequeue current EpkRang and enqueue children epk ranges.
   */
  private async shouldRetryOnFailure(
    feedRange: ChangeFeedRange,
    response: ChangeFeedResponseV2<Array<T & Resource>>
  ): Promise<boolean> {
    if (response.statusCode === StatusCodes.Ok || response.statusCode == StatusCodes.NotModified) {
      return false;
    }

    const partitionSplit =
      response.statusCode === StatusCodes.Gone &&
      (response.SubStatusCode == SubStatusCodes.PartitionKeyRangeGone ||
        response.SubStatusCode == SubStatusCodes.CompletingSplit);

    if (partitionSplit) {
      const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
        this.url,
        new QueryRange(feedRange.minInclusive, feedRange.maxExclusive, true, false),
        true
      );

      if (resolvedRanges.length > 1) {
        await this.handleSplit(false, resolvedRanges, feedRange);
      }
      return true;
    }
    return false;
  }
  /**
   * Checks whether the current EpkRange is split into multiple ranges or not.
   *
   * If yes, it picks the value of children epkRanges from existing partitionKeyRange cache and enqueues them.
   */
  private async handleSplit(
    shiftLeft: boolean,
    resolvedRanges: any,
    oldFeedRange: ChangeFeedRange
  ): Promise<void> {
    const contToken = oldFeedRange.continuationToken;
    let flag = 0;
    if (shiftLeft) {
      const oldFeedRangeKey = JSON.stringify([
        oldFeedRange.minInclusive,
        oldFeedRange.maxExclusive,
      ]);
      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[0].minInclusive,
        resolvedRanges[0].maxExclusive,
        contToken
      );

      this.continuationTokenMap.updateFeedRange(oldFeedRangeKey, newFeedRange); //THERE MIGHT BE A PROBLEM HERE
      this.queue.modifyFirstElement(newFeedRange);
      flag = 1;
    }

    for (let i = flag; i < resolvedRanges.length; i++) {
      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[i].minInclusive,
        resolvedRanges[i].maxExclusive,
        contToken
      );
      this.queue.enqueue(newFeedRange);
      this.continuationTokenMap.addFeedRange(newFeedRange);
    }
  }

  private async getPartitionRangeId(feedRange: ChangeFeedRange): Promise<string> {
    const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
      this.url,
      new QueryRange(feedRange.minInclusive, feedRange.maxExclusive, true, false),
      false
    );

    const firstResolvedRange = resolvedRanges[0];
    if (resolvedRanges.length > 1) {
      await this.handleSplit(true, resolvedRanges, feedRange);
    }
    return firstResolvedRange.id;
  }

  private async getFeedResponse(
    feedRange: ChangeFeedRange
  ): Promise<ChangeFeedResponseV2<Array<T & Resource>>> {
    const feedOptions: FeedOptions = { initialHeaders: {}, useIncrementalFeed: true };

    if (typeof this.changeFeedOptions.maxItemCount === "number") {
      feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
    }

    if (this.changeFeedOptions.sessionToken) {
      feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
    }

    if (feedRange.continuationToken) {
      feedOptions.accessCondition = {
        type: Constants.HttpHeaders.IfNoneMatch,
        condition: feedRange.continuationToken,
      };
    }

    if (this.startTime) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.startTime;
    }

    const rangeId = await this.getPartitionRangeId(feedRange);

    try {
      const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
        path: this.resourceLink,
        resourceType: ResourceType.item,
        resourceId: this.resourceId,
        resultFn: (result) => (result ? result.Documents : []),
        query: undefined,
        options: feedOptions,
        partitionKey: undefined,
        partitionKeyRangeId: rangeId,
      }) as Promise<any>);

      return new ChangeFeedResponseV2(
        response.result,
        response.result ? response.result.length : 0,
        response.code,
        response.headers
      );
    } catch (err) {
      return new ChangeFeedResponseV2(err.message, 0, err.code, err.headers, err.substatus);
    }
  }
}
