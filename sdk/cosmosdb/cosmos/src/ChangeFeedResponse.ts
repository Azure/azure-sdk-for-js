import { Constants } from "./common";
import { IHeaders } from "./queryExecutionContext";

/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
export class ChangeFeedResponse<T> {
  /**
   * @internal
   * @hidden
   *
   * @param result
   * @param count
   * @param statusCode
   * @param headers
   */
  constructor(
    /**
     * Gets the items returned in the response from Azure Cosmos DB
     */
    public readonly result: T,
    /**
     * Gets the number of items returned in the response from Azure Cosmos DB
     */
    public readonly count: number,
    /**
     * Gets the status code of the response from Azure Cosmos DB
     */
    public readonly statusCode: number,
    headers: IHeaders
  ) {
    this.headers = Object.freeze(headers);
  }

  /**
   * Gets the request charge for this request from the Azure Cosmos DB service.
   */
  public get requestCharge(): number {
    const rus = this.headers[Constants.HttpHeaders.RequestCharge];
    return rus ? parseInt(rus, 10) : null;
  }

  /**
   * Gets the activity ID for the request from the Azure Cosmos DB service.
   */
  public get activityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId];
  }

  /**
   * Gets the continuation token to be used for continuing enumeration of the Azure Cosmos DB service.
   *
   * This is equivalent to the `etag` property.
   */
  public get continuation(): string {
    return this.etag;
  }

  /**
   * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
   */
  public get sessionToken(): string {
    return this.headers[Constants.HttpHeaders.SessionToken];
  }

  /**
   * Gets the entity tag associated with last transaction in the Azure Cosmos DB service,
   * which can be used as If-Non-Match Access condition for ReadFeed REST request or
   * `continuation` property of `ChangeFeedOptions` parameter for
   * `Items.readChangeFeed()`
   * to get feed changes since the transaction specified by this entity tag.
   *
   * This is equivalent to the `continuation` property.
   */
  public get etag(): string {
    return this.headers[Constants.HttpHeaders.ETag];
  }

  /**
   * Response headers of the response from Azure Cosmos DB
   */
  public headers: IHeaders;
}
