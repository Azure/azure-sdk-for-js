// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import { Resource } from "../../client";
import { ClientContext } from "../../ClientContext";
import { Constants, ResourceType } from "../../common";
import { FeedOptions, Response, ErrorResponse } from "../../request";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey";
import { ChangeFeedIteratorV2 } from "./ChangeFeedIteratorV2";
import { PartitionKey } from "../../documents";

/**
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedForPartitionKey<T> extends ChangeFeedIteratorV2<T> {
  private continuationToken: ContinuationTokenForPartitionKey;
  private startTime: string;

  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private resourceId: string,
    private resourceLink: string,
    private rId: string,
    private partitionKey: PartitionKey,
    private changeFeedOptions: ChangeFeedIteratorOptions
  ) {
    super();
    let canUseStartFromBeginning = true;
    if (changeFeedOptions.continuationToken) {
      canUseStartFromBeginning = false;
      this.continuationToken = JSON.parse(changeFeedOptions.continuationToken);
    } else {
      this.continuationToken = new ContinuationTokenForPartitionKey(rId, partitionKey, "");
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
      if (!this.continuationTokenRidMatchContainerRid()) {
        throw new ErrorResponse("The continuation is not for the current container definition.");
      }
    }
  }
  private continuationTokenRidMatchContainerRid(): boolean {
    if (this.continuationToken.rid !== this.rId) {
      return false;
    }
    return true;
  }

  /**
   * Change feed is an infinite feed. hasMoreResults is always true.
   */
  get hasMoreResults(): boolean {
    return true;
  }

  /**
   * Returns the result of change feed from Azure Cosmos DB.
   */
  public async ReadNextAsync(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    const result = await this.fetchNext();
    return result;
  }

  /**
   * Read feed and retrieves the next set of results in Azure Cosmos DB.
   */
  private async fetchNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    const response = await this.getFeedResponse();
    this.continuationToken.Continuation = response.headers[Constants.HttpHeaders.ETag];
    response.headers[Constants.HttpHeaders.ContinuationToken] = JSON.stringify(
      this.continuationToken
    );
    return response;
  }

  private async getFeedResponse(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    const feedOptions: FeedOptions = { initialHeaders: {}, useIncrementalFeed: true };

    if (typeof this.changeFeedOptions.maxItemCount === "number") {
      feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
    }

    if (this.changeFeedOptions.sessionToken) {
      feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
    }

    let continuation = this.continuationToken.Continuation;
    if (continuation) {
      feedOptions.accessCondition = {
        type: Constants.HttpHeaders.IfNoneMatch,
        condition: continuation,
      };
    }

    if (this.startTime) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.startTime;
    }

    const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
      path: this.resourceLink,
      resourceType: ResourceType.item,
      resourceId: this.resourceId,
      resultFn: (result) => (result ? result.Documents : []),
      query: undefined,
      options: feedOptions,
      partitionKey: this.partitionKey,
    }) as Promise<any>);

    return new ChangeFeedIteratorResponse(
      response.result,
      response.result ? response.result.length : 0,
      response.code,
      response.headers
    );
  }

  async fetchOverLappingFeedRanges(_epkRange: any): Promise<void> {
    throw new ErrorResponse(`Method not implemented`);
  }

  async fetchContinuationTokenFeedRanges(_continuationToken: string): Promise<boolean> {
    throw new ErrorResponse(`Method not implemented`);
  }
}
