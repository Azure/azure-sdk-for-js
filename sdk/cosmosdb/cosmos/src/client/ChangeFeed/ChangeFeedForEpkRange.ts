// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChangeFeedRange } from "./ChangeFeedRange";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import { PartitionKeyRangeCache, QueryRange } from "../../routing";
import { FeedRangeQueue } from "./FeedRangeQueue";
import { ClientContext } from "../../ClientContext";
import { Container, Resource } from "../../client";
import {
  Constants,
  SubStatusCodes,
  StatusCodes,
  ResourceType,
  addContainerRid,
} from "../../common";
import { Response, FeedOptions, ErrorResponse } from "../../request";
import { CompositeContinuationToken } from "./CompositeContinuationToken";
import { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator";
import { extractOverlappingRanges } from "./changeFeedUtils";
import { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
/**
 * @hidden
 * Provides iterator for change feed for entire container or an epk range.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedForEpkRange<T> implements ChangeFeedPullModelIterator<T> {
  private continuationToken?: CompositeContinuationToken;
  private queue: FeedRangeQueue<ChangeFeedRange>;
  private startTime: string;
  private isInstantiated: boolean;
  private rId: string;
  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private container: Container,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
    private resourceId: string,
    private resourceLink: string,
    private url: string,
    private changeFeedOptions: InternalChangeFeedIteratorOptions,
    private epkRange: QueryRange,
  ) {
    this.queue = new FeedRangeQueue<ChangeFeedRange>();
    this.continuationToken = changeFeedOptions.continuationToken
      ? JSON.parse(changeFeedOptions.continuationToken)
      : undefined;
    this.startTime = changeFeedOptions.startTime
      ? changeFeedOptions.startTime.toUTCString()
      : undefined;
    this.isInstantiated = false;
  }

  private async setIteratorRid(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    const { resource } = await this.container.readInternal(diagnosticNode);
    this.rId = resource._rid;
  }

  private continuationTokenRidMatchContainerRid(): boolean {
    if (this.continuationToken.rid !== this.rId) {
      return false;
    }
    return true;
  }

  private async fillChangeFeedQueue(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this.continuationToken) {
      // fill the queue with feed ranges in continuation token.
      await this.fetchContinuationTokenFeedRanges(diagnosticNode);
    } else {
      // fill the queue with feed ranges overlapping the given epk range.
      await this.fetchOverLappingFeedRanges(diagnosticNode);
    }
    this.isInstantiated = true;
  }

  /**
   * Fill the queue with the feed ranges overlapping with the given epk range.
   */
  private async fetchOverLappingFeedRanges(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    try {
      const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
        this.url,
        this.epkRange,
        diagnosticNode,
      );
      for (const overLappingRange of overLappingRanges) {
        const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(
          this.epkRange,
          overLappingRange,
        );
        const feedRange: ChangeFeedRange = new ChangeFeedRange(
          overLappingRange.minInclusive,
          overLappingRange.maxExclusive,
          "",
          epkMinHeader,
          epkMaxHeader,
        );
        this.queue.enqueue(feedRange);
      }
    } catch (err) {
      throw new ErrorResponse(err.message);
    }
  }
  /**
   * Fill the queue with feed ranges from continuation token
   */
  private async fetchContinuationTokenFeedRanges(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<void> {
    const contToken = this.continuationToken;
    if (!this.continuationTokenRidMatchContainerRid()) {
      throw new ErrorResponse("The continuation token is not for the current container definition");
    } else {
      for (const cToken of contToken.Continuation) {
        const queryRange = new QueryRange(cToken.minInclusive, cToken.maxExclusive, true, false);
        try {
          const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
            this.url,
            queryRange,
            diagnosticNode,
          );
          for (const overLappingRange of overLappingRanges) {
            // check if the epk range present in continuation token entirely covers the overlapping range.
            // If yes, minInclusive and maxExclusive of the overlapping range will be set.
            // If no, i.e. there is only partial overlap, epkMinHeader and epkMaxHeader are set as min and max of overlap.
            // This will be used when we make a call to fetch change feed.
            const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(
              queryRange,
              overLappingRange,
            );
            const feedRange: ChangeFeedRange = new ChangeFeedRange(
              overLappingRange.minInclusive,
              overLappingRange.maxExclusive,
              cToken.continuationToken,
              epkMinHeader,
              epkMaxHeader,
            );
            this.queue.enqueue(feedRange);
          }
        } catch (err) {
          throw new ErrorResponse(err.message);
        }
      }
    }
  }

  /**
   * Change feed is an infinite feed. hasMoreResults is always true.
   */
  get hasMoreResults(): boolean {
    return true;
  }

  /**
   * Gets an async iterator which will yield change feed results.
   */
  public async *getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    do {
      const result = await this.readNext();
      yield result;
    } while (this.hasMoreResults);
  }

  /**
   * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
   *
   * Keeps iterating over the feedranges and checks if any feed range has new result. Keeps note of the last feed range which returned non 304 result.
   *
   * When same feed range is reached and no new changes are found, a 304 (not Modified) is returned to the end user. Then starts process all over again.
   */
  public async readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      // validate if the internal queue is filled up with feed ranges.
      if (!this.isInstantiated) {
        await this.setIteratorRid(diagnosticNode);
        await this.fillChangeFeedQueue(diagnosticNode);
      }

      // stores the last feedRange for which statusCode is not 304 i.e. there were new changes in that feed range.
      let firstNotModifiedFeedRange: [string, string] = undefined;
      let result: ChangeFeedIteratorResponse<Array<T & Resource>>;
      do {
        const [processedFeedRange, response] = await this.fetchNext(diagnosticNode);
        result = response;

        if (result !== undefined) {
          {
            if (firstNotModifiedFeedRange === undefined) {
              firstNotModifiedFeedRange = processedFeedRange;
            }
            // move current feed range to end of queue to fetch result of next feed range.
            // This is done to fetch changes in breadth first manner and avoid starvation.
            this.queue.moveFirstElementToTheEnd();
            // check if there are new results for the given feed range.
            if (result.statusCode === StatusCodes.Ok) {
              result.headers[Constants.HttpHeaders.ContinuationToken] =
                this.generateContinuationToken();

              if (this.clientContext.enableEncryption) {
                for (let item of result.result) {
                  item = await this.container.encryptionProcessor.decrypt(item);
                }
              }
              return result;
            }
          }
        }
      } while (!this.checkedAllFeedRanges(firstNotModifiedFeedRange));
      // set the continuation token after processing.
      result.headers[Constants.HttpHeaders.ContinuationToken] = this.generateContinuationToken();
      return result;
    }, this.clientContext);
  }

  private generateContinuationToken = (): string => {
    return JSON.stringify(new CompositeContinuationToken(this.rId, this.queue.returnSnapshot()));
  };

  /**
   * Read feed and retrieves the next page of results in Azure Cosmos DB.
   */
  private async fetchNext(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<[[string, string], ChangeFeedIteratorResponse<Array<T & Resource>>]> {
    const feedRange = this.queue.peek();
    if (feedRange) {
      // fetch results for feed range at the beginning of the queue.
      const result = await this.getFeedResponse(feedRange, diagnosticNode);

      // check if results need to be fetched again depending on status code returned.
      // Eg. in case of paritionSplit, results need to be fetched for the child partitions.
      const shouldRetry: boolean = await this.shouldRetryOnFailure(
        feedRange,
        result,
        diagnosticNode,
      );

      if (shouldRetry) {
        this.queue.dequeue();
        return this.fetchNext(diagnosticNode);
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
    response: ChangeFeedIteratorResponse<Array<T & Resource>>,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<boolean> {
    if (response.statusCode === StatusCodes.Ok || response.statusCode === StatusCodes.NotModified) {
      return false;
    }

    const partitionSplit =
      response.statusCode === StatusCodes.Gone &&
      (response.subStatusCode === SubStatusCodes.PartitionKeyRangeGone ||
        response.subStatusCode === SubStatusCodes.CompletingSplit);

    if (partitionSplit) {
      const queryRange = new QueryRange(
        feedRange.minInclusive,
        feedRange.maxExclusive,
        true,
        false,
      );
      const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
        this.url,
        queryRange,
        diagnosticNode,
        true,
      );
      if (resolvedRanges.length < 1) {
        throw new ErrorResponse("Partition split/merge detected but no overlapping ranges found.");
      }
      // This covers both cases of merge and split.
      // resolvedRanges.length > 1 in case of split.
      // resolvedRanges.length === 1 in case of merge. EpkRange headers will be added in this case.
      if (resolvedRanges.length >= 1) {
        await this.handleSplit(false, resolvedRanges, queryRange, feedRange.continuationToken);
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
    oldFeedRange: QueryRange,
    continuationToken: string,
  ): Promise<void> {
    let flag = 0;
    if (shiftLeft) {
      // This section is only applicable when handleSplit is called by getPartitionRangeId().
      // used only when existing partition key range cache is used to check for any overlapping ranges.
      // Modifies the first element with the first overlapping range.
      const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(
        oldFeedRange,
        resolvedRanges[0],
      );
      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[0].minInclusive,
        resolvedRanges[0].maxExclusive,
        continuationToken,
        epkMinHeader,
        epkMaxHeader,
      );

      this.queue.modifyFirstElement(newFeedRange);
      flag = 1;
    }
    // Enqueue the overlapping ranges.
    for (let i = flag; i < resolvedRanges.length; i++) {
      const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(
        oldFeedRange,
        resolvedRanges[i],
      );

      const newFeedRange = new ChangeFeedRange(
        resolvedRanges[i].minInclusive,
        resolvedRanges[i].maxExclusive,
        continuationToken,
        epkMinHeader,
        epkMaxHeader,
      );
      this.queue.enqueue(newFeedRange);
    }
  }

  /**
   * Fetch the partitionKeyRangeId for the given feed range.
   *
   * This partitionKeyRangeId is passed to queryFeed to fetch the results.
   */
  private async getPartitionRangeId(
    feedRange: ChangeFeedRange,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<string> {
    const min = feedRange.epkMinHeader ? feedRange.epkMinHeader : feedRange.minInclusive;
    const max = feedRange.epkMaxHeader ? feedRange.epkMaxHeader : feedRange.maxExclusive;
    const queryRange = new QueryRange(min, max, true, false);
    const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(
      this.url,
      queryRange,
      diagnosticNode,
      false,
    );
    if (resolvedRanges.length < 1) {
      throw new ErrorResponse("No overlapping ranges found.");
    }
    const firstResolvedRange = resolvedRanges[0];
    if (resolvedRanges.length > 1) {
      await this.handleSplit(true, resolvedRanges, queryRange, feedRange.continuationToken);
    }
    return firstResolvedRange.id;
  }

  private async getFeedResponse(
    feedRange: ChangeFeedRange,
    diagnosticNode: DiagnosticNodeInternal,
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
    const rangeId = await this.getPartitionRangeId(feedRange, diagnosticNode);
    if (this.clientContext.enableEncryption) {
      addContainerRid(this.container);
      feedOptions.containerRid = this.container._rid;
    }
    try {
      // startEpk and endEpk are only valid in case we want to fetch result for a part of partition and not the entire partition.
      const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
        path: this.resourceLink,
        resourceType: ResourceType.item,
        resourceId: this.resourceId,
        resultFn: (result) => (result ? result.Documents : []),
        query: undefined,
        options: feedOptions,
        diagnosticNode,
        partitionKey: undefined,
        partitionKeyRangeId: rangeId,
        startEpk: feedRange.epkMinHeader,
        endEpk: feedRange.epkMaxHeader,
      }) as Promise<any>);

      return new ChangeFeedIteratorResponse(
        response.result,
        response.result ? response.result.length : 0,
        response.code,
        response.headers,
        getEmptyCosmosDiagnostics(),
      );
    } catch (err) {
      // If any errors are encountered, eg. partition split or gone, handle it based on error code and not break the flow.
      return new ChangeFeedIteratorResponse(
        [],
        0,
        err.code,
        err.headers,
        getEmptyCosmosDiagnostics(),
        err.substatus,
      );
    }
  }
}
