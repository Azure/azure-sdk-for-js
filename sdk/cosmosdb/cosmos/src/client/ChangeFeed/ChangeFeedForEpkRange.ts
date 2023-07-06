// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license../ChangeFeedIteratorResponse
import { ChangeFeedRange } from "./ChangeFeedRange";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { PartitionKeyRangeCache, QueryRange } from "../../routing";
import { FeedRangeQueue } from "./FeedRangeQueue";
import { ClientContext } from "../../ClientContext";
import { Resource } from "../../client";
import { Constants, SubStatusCodes, StatusCodes, ResourceType } from "../../common";
import { Response, FeedOptions, ErrorResponse } from "../../request";
import { PartitionKeyRange } from "../../client";
import { CompositeContinuationToken } from "./CompositeContinuationToken";
import { ChangeFeedIteratorV2 } from "./ChangeFeedIteratorV2";
import { checkEpkHeaders } from "./changeFeedUtils";
import { CosmosDiagnosticContext } from "../../CosmosDiagnosticsContext";
/**
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedForEpkRange<T> extends ChangeFeedIteratorV2<T> {
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
    private changeFeedOptions: ChangeFeedIteratorOptions,
    private diagnosticContext: CosmosDiagnosticContext
  ) {
    super();

    this.queue = new FeedRangeQueue<ChangeFeedRange>();

    let canUseStartFromBeginning = true;
    if (changeFeedOptions.continuationToken) {
      canUseStartFromBeginning = false;
      this.continuationToken = JSON.parse(changeFeedOptions.continuationToken);
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

    if (this.continuationToken) {
      // check if continuation token rid matches the current container rid.
    }
  }

  private continuationTokenRidMatchContainerRid(): boolean {
    if (this.continuationToken.rid !== this.rId) {
      return false;
    }
    return true;
  }

  /**
   * Fetch all physical partitions for a given container.
   */
  public async fetchAllFeedRanges(): Promise<void> {
    try {
      const pkRanges = (
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.url, this.diagnosticContext)
      ).getOrderedParitionKeyRanges();
      for (const pkRange of pkRanges) {
        const feedRange: ChangeFeedRange = new ChangeFeedRange(
          pkRange.minInclusive,
          pkRange.maxExclusive,
          ""
        );
        this.queue.enqueue(feedRange);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Fetch all physical partitions overlapping the given Partition Key Range.
   */
  public async fetchOverLappingFeedRanges(pkRange: PartitionKeyRange): Promise<void> {
    const queryRange = new QueryRange(pkRange.minInclusive, pkRange.maxExclusive, true, false);
    try {
      const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
        this.url,
        queryRange,
        this.diagnosticContext
      );
      overLappingRanges.map(async (overLappingRange) => {
        const [epkMinHeader, epkMaxHeader] = await checkEpkHeaders(pkRange, overLappingRange);
        const feedRange: ChangeFeedRange = new ChangeFeedRange(
          overLappingRange.minInclusive,
          overLappingRange.maxExclusive,
          "",
          epkMinHeader,
          epkMaxHeader
        );
        this.queue.enqueue(feedRange);
      });
    } catch (err) {
      throw new ErrorResponse(err.message);
    }
  }
  /**
   * Fill the queue with feed ranges from continuation token
   */
  public async fetchContinuationTokenFeedRanges(continuationToken: string): Promise<boolean> {
    const contToken: CompositeContinuationToken = JSON.parse(continuationToken);
    this.continuationToken = JSON.parse(continuationToken);
    if (!this.continuationTokenRidMatchContainerRid()) {
      throw new ErrorResponse("The continuation is not for the current container definition");
    } else {
      contToken.Continuation.map(async (cToken) => {
        const queryRange = new QueryRange(cToken.minInclusive, cToken.maxExclusive, true, false);
        try {
          // find all the overlapping ranges for a particular entry in continuation token
          const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
            this.url,
            queryRange,
            this.diagnosticContext
          );
          overLappingRanges.map(async (overLappingRange) => {
            // check if the epk range present in continuation token entirely covers the overlapping range.
            // If yes, minInclusive and maxExclusive of the overlapping range will be set.
            // If no, i.e. there is only partial overlap, epkMinHeader and epkMaxHeader are set as min and max of overlap.
            // This will be used when we make a call to fetch change feed.
            const [epkMinHeader, epkMaxHeader] = await checkEpkHeaders(cToken, overLappingRange);
            const feedRange: ChangeFeedRange = new ChangeFeedRange(
              overLappingRange.minInclusive,
              overLappingRange.maxExclusive,
              cToken.continuationToken,
              epkMinHeader,
              epkMaxHeader
            );
            this.queue.enqueue(feedRange);
          });
        } catch (err) {
          throw new ErrorResponse(err.message);
        }
      });
      return true;
    }
  }

  /**
   * Change feed is an infinite feed. hasMoreResults is always true.
   */
  get hasMoreResults(): boolean {
    return true;
  }

  /**
   * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
   *
   * Keeps iterating over the feedranges and checks if any feed range has new result. Keeps note of the last feed range which returned non 304 result.
   *
   * When same feed range is reached and no new changes are found, a 304 (not Modified) is returned to the end user. Then starts process all over again.
   */
  public async ReadNextAsync(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    // stores the last feedRange for which statusCode is not 304 i.e. there were new changes in that feed range.
    let firstNotModifiedFeedRange: [string, string] = undefined;
    let result: ChangeFeedIteratorResponse<Array<T & Resource>>;
    do {
      let [processedFeedRange, response] = await this.fetchNext();
      result = response;
      if (result !== undefined) {
        {
          if (firstNotModifiedFeedRange === undefined) {
            firstNotModifiedFeedRange = processedFeedRange;
          }
          // check if there are new results for the given feed range.
          if (result.count > 0) {
            firstNotModifiedFeedRange = processedFeedRange;
            result.headers[Constants.HttpHeaders.ContinuationToken] =
              this.generateContinuationToken();
            return result;
          }
          // check if 304 is returned for the given feed range.
          // If yes, move the current feed range to end of queue.
          // Else keep processing the same feed range for more results.
          if (this.partitionAllResultsFetched(result)) {
            this.queue.moveFirstElementToTheEnd();
          }
        }
      }
    } while (!this.checkedAllFeedRanges(firstNotModifiedFeedRange));

    // set the continuation token after processing.
    result.headers[Constants.HttpHeaders.ContinuationToken] = this.generateContinuationToken();
    return result;
  }

  private partitionAllResultsFetched(
    response: ChangeFeedIteratorResponse<Array<T & Resource>>
  ): boolean {
    return response.statusCode === StatusCodes.NotModified;
  }

  private generateContinuationToken = (): string => {
    return JSON.stringify(new CompositeContinuationToken(this.rId, this.queue.returnSnapshot()));
  };

  /**
   * Read feed and retrieves the next page of results in Azure Cosmos DB.
   */
  private async fetchNext(): Promise<
    [[string, string], ChangeFeedIteratorResponse<Array<T & Resource>>]
  > {
    const feedRange = this.queue.peek();
    if (feedRange) {
      // fetch results for feed range at the beginning of the queue.
      let result = await this.getFeedResponse(feedRange);

      // check if results need to be fetched again depending on status code returned.
      // Eg. in case of paritionSplit, results need to be fetched for the child partitions.
      const shouldRetry: boolean = await this.shouldRetryOnFailure(feedRange, result);

      if (shouldRetry) {
        this.queue.dequeue();
        return await this.fetchNext();
      } else {
        // update the continuation value for the current feed range.
        const continuationValueForFeedRange = result.headers[Constants.HttpHeaders.ETag];
        const newFeedRange = this.queue.peek();
        newFeedRange.continuationToken = continuationValueForFeedRange;

        return [[newFeedRange.minInclusive, newFeedRange.maxExclusive], result];
      }
    } else {
      return [[undefined, undefined], undefined];
    }
  }

  private checkedAllFeedRanges(firstNotModifiedFeedRange: [string, string]): boolean {
    if (firstNotModifiedFeedRange === undefined) {
      return false;
    }
    const feedRangeQueueFirstElement = this.queue.peek();
    return (
      firstNotModifiedFeedRange[0] === feedRangeQueueFirstElement?.minInclusive &&
      firstNotModifiedFeedRange[1] === feedRangeQueueFirstElement?.maxExclusive
    );
  }

  /**
   * Checks whether the current EpkRange is split into multiple ranges or not.
   *
   * If yes, it force refreshes the partitionKeyRange cache and enqueue children epk ranges.
   */
  private async shouldRetryOnFailure(
    feedRange: ChangeFeedRange,
    response: ChangeFeedIteratorResponse<Array<T & Resource>>
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
        this.diagnosticContext,
        true
      );
      if (resolvedRanges.length > 1) {
        await this.handleSplit(false, resolvedRanges, feedRange);
      }
      return true;
    }
    return false;
  }
  /*
   * Enqueues all the children feed ranges for the given feed range.
   */
  private async handleSplit(
    shiftLeft: boolean,
    resolvedRanges: any,
    oldFeedRange: ChangeFeedRange
  ): Promise<void> {
    const contToken = oldFeedRange.continuationToken;
    let flag = 0;
    if (shiftLeft) {
      // This section is only applicable when handleSplit is called by getPartitionRangeId().
      // used only when existing partition key range cache is used to check for any overlapping ranges.
      // Modifies the first element with the first overlapping range.
      const [epkMinHeader, epkMaxHeader] = await checkEpkHeaders(oldFeedRange, resolvedRanges[0]);
      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[0].minInclusive,
        resolvedRanges[0].maxExclusive,
        contToken,
        epkMinHeader,
        epkMaxHeader
      );

      this.queue.modifyFirstElement(newFeedRange);
      flag = 1;
    }
    // Enqueue the overlapping ranges.
    for (let i = flag; i < resolvedRanges.length; i++) {
      const [epkMinHeader, epkMaxHeader] = await checkEpkHeaders(oldFeedRange, resolvedRanges[i]);

      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[i].minInclusive,
        resolvedRanges[i].maxExclusive,
        contToken,
        epkMinHeader,
        epkMaxHeader
      );
      this.queue.enqueue(newFeedRange);
    }
  }

  /**
   * Fetch the partitionKeyRangeId for the given feed range.
   *
   * This partitionKeyRangeId is passed to queryFeed to fetch the results.
   */
  private async getPartitionRangeId(feedRange: ChangeFeedRange): Promise<string> {
    const min = feedRange.epkMinHeader ? feedRange.epkMinHeader : feedRange.minInclusive;
    const max = feedRange.epkMaxHeader ? feedRange.epkMaxHeader : feedRange.maxExclusive;

    const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
      this.url,
      new QueryRange(min, max, true, false),
      this.diagnosticContext,
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
  ): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
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
      // startEpk and endEpk are only valid in case we want to fetch result for a part of partition and not the entire partition.
      const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
        path: this.resourceLink,
        resourceType: ResourceType.item,
        resourceId: this.resourceId,
        resultFn: (result) => (result ? result.Documents : []),
        query: undefined,
        options: feedOptions,
        partitionKey: undefined,
        partitionKeyRangeId: rangeId,
        startEpk: feedRange.epkMinHeader,
        endEpk: feedRange.epkMaxHeader,
      }) as Promise<any>);

      return new ChangeFeedIteratorResponse(
        response.result,
        response.result ? response.result.length : 0,
        response.code,
        response.headers
      );
    } catch (err) {
      // If any errors are encountered, eg. partition split or gone, handle it based on error code and not break the flow.
      return new ChangeFeedIteratorResponse([], 0, err.code, err.headers, err.substatus);
    }
  }
}
