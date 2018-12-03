/// <reference lib="esnext.asynciterable" />
import { ChangeFeedOptions } from "./ChangeFeedOptions";
import { ChangeFeedResponse } from "./ChangeFeedResponse";
import { Resource } from "./client";
import { ClientContext } from "./ClientContext";
import { Constants, ResourceType, StatusCodes } from "./common";
import { FeedOptions } from "./request";
import { Response } from "./request";

/**
 * Provides iterator for change feed.
 *
 * Use `Items.readChangeFeed()` to get an instance of the iterator.
 */
export class ChangeFeedIterator<T> {
  private static readonly IfNoneMatchAllHeaderValue = "*";
  private nextIfNoneMatch: string;
  private ifModifiedSince: string;
  private lastStatusCode: number;
  private isPartitionSpecified: boolean;

  /**
   * @internal
   * @hidden
   *
   * @param clientContext
   * @param resourceId
   * @param resourceLink
   * @param isPartitionedContainer
   * @param changeFeedOptions
   */
  constructor(
    private clientContext: ClientContext,
    private resourceId: string,
    private resourceLink: string,
    private partitionKey: string | number | boolean,
    private isPartitionedContainer: () => Promise<boolean>,
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
    while (this.hasMoreResults) {
      const result = await this.executeNext();
      yield result;
    }
  }

  /**
   * Read feed and retrieves the next page of results in Azure Cosmos DB.
   */
  public async executeNext(): Promise<ChangeFeedResponse<Array<T & Resource>>> {
    const response = await this.getFeedResponse();
    this.lastStatusCode = response.statusCode;
    this.nextIfNoneMatch = response.headers[Constants.HttpHeaders.ETag];
    return response;
  }

  private async getFeedResponse(): Promise<ChangeFeedResponse<Array<T & Resource>>> {
    const isParittionedContainer = await this.isPartitionedContainer();
    if (!this.isPartitionSpecified && isParittionedContainer) {
      throw new Error("Container is partitioned, but no partition key or partition key range id was specified.");
    }
    const feedOptions: FeedOptions = { initialHeaders: {}, a_im: "Incremental feed" };

    if (typeof this.changeFeedOptions.maxItemCount === "number") {
      feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
    }

    if (this.changeFeedOptions.sessionToken) {
      feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
    }

    if (this.nextIfNoneMatch) {
      feedOptions.accessCondition = {
        type: Constants.HttpHeaders.IfNoneMatch,
        condition: this.nextIfNoneMatch
      };
    }

    if (this.ifModifiedSince) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.ifModifiedSince;
    }

    if (this.partitionKey !== undefined) {
      feedOptions.partitionKey = this.partitionKey as any; // TODO: our partition key is too restrictive on the main object
    }

    const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>(
      this.resourceLink,
      ResourceType.item,
      this.resourceId,
      result => (result ? result.Documents : []),
      undefined,
      feedOptions
    ) as Promise<any>); // TODO: some funky issues with query feed. Probably need to change it up.

    return new ChangeFeedResponse(
      response.result,
      response.result ? response.result.length : 0,
      response.statusCode,
      response.headers
    );
  }
}
