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

  constructor(compositeToken: string, orderByItems: any[], rid: string, skipCount: number) {
    this.compositeToken = compositeToken;
    this.orderByItems = orderByItems;
    this.rid = rid;
    this.skipCount = skipCount;
  }
}
