// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Continuation token for order by queries.
 * @internal
 */
export class OrderByQueryContinuationToken {
  /**
   * Property name constants for serialization
   */
  public static readonly CompositeToken = "compositeToken";
  public static readonly OrderByItems = "orderByItems";
  public static readonly Rid = "rid";
  public static readonly SkipCount = "skipCount";
  public static readonly Offset = "offset";
  public static readonly Limit = "limit";
  public static readonly HashedLastResult = "hashedLastResult";

  /**
   * Composite token for the query continuation
   */
  public readonly compositeToken: string;

  /**
   * Order by items for the query
   */
  public readonly orderByItems: any[];

  /**
   * Resource ID of the container for which the continuation token is issued
   */
  public readonly rid: string;

  /**
   * Number of items to skip in the query
   */
  public readonly skipCount: number;

  /**
   * Current offset value for OFFSET/LIMIT queries
   */
  public readonly offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  public readonly limit?: number;

  /**
   * Hash of the last document result for distinct order queries
   * Used to ensure duplicates are not returned across continuation boundaries
   */
  public readonly hashedLastResult?: string;



  constructor(
    compositeToken: string, 
    orderByItems: any[], 
    rid: string, 
    skipCount: number,
    offset?: number,
    limit?: number,
    hashedLastResult?: string
  ) {
    this.compositeToken = compositeToken;
    this.orderByItems = orderByItems;
    this.rid = rid;
    this.skipCount = skipCount;
    this.offset = offset;
    this.limit = limit;
    this.hashedLastResult = hashedLastResult;
  }

  /**
   * Serializes the OrderBy continuation token to a JSON string
   */
  public toString(): string {
    const tokenObj: any = {
      [OrderByQueryContinuationToken.CompositeToken]: this.compositeToken,
      [OrderByQueryContinuationToken.OrderByItems]: this.orderByItems,
      [OrderByQueryContinuationToken.Rid]: this.rid,
      [OrderByQueryContinuationToken.SkipCount]: this.skipCount,
    };

    if (this.offset !== undefined) {
      tokenObj[OrderByQueryContinuationToken.Offset] = this.offset;
    }

    if (this.limit !== undefined) {
      tokenObj[OrderByQueryContinuationToken.Limit] = this.limit;
    }

    if (this.hashedLastResult !== undefined) {
      tokenObj[OrderByQueryContinuationToken.HashedLastResult] = this.hashedLastResult;
    }

    return JSON.stringify(tokenObj);
  }

  /**
   * Deserializes a JSON string to an OrderByQueryContinuationToken
   */
  public static fromString(tokenString: string): OrderByQueryContinuationToken {
    const parsed = JSON.parse(tokenString);
    return new OrderByQueryContinuationToken(
      parsed[OrderByQueryContinuationToken.CompositeToken],
      parsed[OrderByQueryContinuationToken.OrderByItems],
      parsed[OrderByQueryContinuationToken.Rid],
      parsed[OrderByQueryContinuationToken.SkipCount],
      parsed[OrderByQueryContinuationToken.Offset],
      parsed[OrderByQueryContinuationToken.Limit],
      parsed[OrderByQueryContinuationToken.HashedLastResult],
    );
  }
}
