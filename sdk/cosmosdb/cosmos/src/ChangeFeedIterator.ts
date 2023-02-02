// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { ChangeFeedOptions } from "./ChangeFeedOptions";
import { ChangeFeedResponse } from "./ChangeFeedResponse";
import { Resource } from "./client";
import { ClientContext } from "./ClientContext";
import { Constants, ResourceType, StatusCodes } from "./common";
import { PartitionKey } from "./documents";
import { FeedOptions } from "./request";
import { Response } from "./request";

/**
 * Provides iterator for change feed.
 *
 * Use `Items.changeFeed()` to get an instance of the iterator.
 */
export class ChangeFeedIterator<T> {
  private static readonly IfNoneMatchAllHeaderValue = "*";
  private nextIfNoneMatch: string;
  private ifModifiedSince: string;
  private lastStatusCode: number;
  private isPartitionSpecified: boolean;

  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private resourceId: string,
    private resourceLink: string,
    private partitionKey: PartitionKey,
    private changeFeedOptions: ChangeFeedOptions
  ) {
    // partition key XOR partition key range id
    const partitionKeyValid = partitionKey !== undefined;
    this.isPartitionSpecified = partitionKeyValid;

    let canUseStartFromBeginning = true;
    if (changeFeedOptions.continuation) {
      this.nextIfNoneMatch = changeFeedOptions.continuation;
      canUseStartFromBeginning = false;
    }

    if (changeFeedOptions.startTime) {
      // .toUTCString() is platform specific, but most platforms use RFC 1123.
      // In ECMAScript 2018, this was standardized to RFC 1123.
      // See for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
      this.ifModifiedSince = changeFeedOptions.startTime.toUTCString();
      canUseStartFromBeginning = false;
    }

    if (canUseStartFromBeginning && !changeFeedOptions.startFromBeginning) {
      this.nextIfNoneMatch = ChangeFeedIterator.IfNoneMatchAllHeaderValue;
    }
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
  public async *getAsyncIterator(): AsyncIterable<ChangeFeedResponse<Array<T & Resource>>> {
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
  public async fetchNext(): Promise<ChangeFeedResponse<Array<T & Resource>>> {
    const response = await this.getFeedResponse();
    this.lastStatusCode = response.statusCode;
    this.nextIfNoneMatch = response.headers[Constants.HttpHeaders.ETag];
    return response;
  }

  private async getFeedResponse(): Promise<ChangeFeedResponse<Array<T & Resource>>> {
    if (!this.isPartitionSpecified) {
      throw new Error(
        "Container is partitioned, but no partition key or partition key range id was specified."
      );
    }
    const feedOptions: FeedOptions = { initialHeaders: {}, useIncrementalFeed: true };

    if (typeof this.changeFeedOptions.maxItemCount === "number") {
      feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
    }

    if (this.changeFeedOptions.sessionToken) {
      feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
    }

    if (this.nextIfNoneMatch) {
      feedOptions.accessCondition = {
        type: Constants.HttpHeaders.IfNoneMatch,
        condition: this.nextIfNoneMatch,
      };
    }

    if (this.ifModifiedSince) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.ifModifiedSince;
    }

    const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
      path: this.resourceLink,
      resourceType: ResourceType.item,
      resourceId: this.resourceId,
      resultFn: (result) => (result ? result.Documents : []),
      query: undefined,
      options: feedOptions,
      partitionKey: this.partitionKey,
    }) as Promise<any>); // TODO: some funky issues with query feed. Probably need to change it up.

    return new ChangeFeedResponse(
      response.result,
      response.result ? response.result.length : 0,
      response.code,
      response.headers
    );
  }
}
