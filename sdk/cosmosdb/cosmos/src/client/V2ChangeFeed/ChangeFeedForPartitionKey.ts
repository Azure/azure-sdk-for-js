// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { ChangeFeedOptionsV2 } from "./ChangeFeedOptions";
import { ChangeFeedResponseV2 } from "./ChangeFeedResponse";
import { Resource } from "../../client";
import { ClientContext } from "../../ClientContext";
import { Constants, ResourceType, StatusCodes } from "../../common";
import { FeedOptions, Response, ErrorResponse } from "../../request";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey";
import { base64Encode, base64Decode } from "../../utils/base64EncodeDecode";
import { ChangeFeedIteratorV2 } from "./ChangeFeedIterator";
import { PartitionKey } from "../../documents";

/**
 * Provides iterator for change feed.
 *
 * Use `Items.changeFeed()` to get an instance of the iterator.
 */
export class ChangeFeedForPartitionKey<T> extends ChangeFeedIteratorV2<T> {
  private continuationToken: ContinuationTokenForPartitionKey;
  private startTime: string;
  private lastStatusCode: number;

  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private resourceId: string,
    private resourceLink: string,
    private rId: string,
    private partitionKey: PartitionKey,
    private changeFeedOptions: ChangeFeedOptionsV2
  ) {
    super();
    let canUseStartFromBeginning = true;
    if (changeFeedOptions.continuationToken) {
      canUseStartFromBeginning = false;
      this.continuationToken = JSON.parse(base64Decode(changeFeedOptions.continuationToken));
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
        throw new ErrorResponse("Container rid does not match with the continuation token rid");
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
   * Gets a value indicating whether there are potentially additional results that can be retrieved.
   *
   * Initially returns true. This value is set based on whether the last execution returned a continuation token.
   *
   * @returns Boolean value representing if whether there are potentially additional results that can be retrieved.
   */
  get hasMoreResults(): boolean {
    return this.lastStatusCode !== StatusCodes.NotModified;
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

  /**
   * Read feed and retrieves the next page of results in Azure Cosmos DB.
   */
  public async fetchNext(): Promise<ChangeFeedResponseV2<Array<T & Resource>>> {
    const response = await this.getFeedResponse();
    this.lastStatusCode = response.statusCode;
    this.continuationToken.Continuation = response.headers[Constants.HttpHeaders.ETag];
    response.headers[Constants.HttpHeaders.ContinuationToken] = base64Encode(
      JSON.stringify(this.continuationToken)
    );
    return response;
  }

  private async getFeedResponse(): Promise<ChangeFeedResponseV2<Array<T & Resource>>> {
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

    return new ChangeFeedResponseV2(
      response.result,
      response.result ? response.result.length : 0,
      response.code,
      response.headers
    );
  }

  public async fetchOverLappingFeedRanges(_epkRange: any): Promise<void> {
    throw new ErrorResponse(`Method not implemented..id`);
  }
}
