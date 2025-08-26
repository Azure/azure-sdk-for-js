// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Continuation token for order by queries.
 * @internal
 */
export interface OrderByQueryContinuationToken {
  /**
   * Composite token for the query continuation
   */
  compositeToken: string;

  /**
   * Order by items for the query
   */
  orderByItems: any[];

  /**
   * Resource ID of the container for which the continuation token is issued
   */
  rid: string;

  /**
   * Number of items to skip in the query
   */
  skipCount: number;

  /**
   * Current offset value for OFFSET/LIMIT queries
   */
  offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  limit?: number;

  /**
   * Hash of the last document result for distinct order queries
   * Used to ensure duplicates are not returned across continuation boundaries
   */
  hashedLastResult?: string;
}

/**
 * Creates an OrderByQueryContinuationToken
 * @internal
 */
export function createOrderByQueryContinuationToken(
  compositeToken: string,
  orderByItems: any[],
  rid: string,
  skipCount: number,
  offset?: number,
  limit?: number,
  hashedLastResult?: string
): OrderByQueryContinuationToken {
  return {
    compositeToken,
    orderByItems,
    rid,
    skipCount,
    offset,
    limit,
    hashedLastResult,
  };
}

/**
 * Serializes an OrderByQueryContinuationToken to a JSON string
 * @internal
 */
export function serializeOrderByQueryContinuationToken(token: OrderByQueryContinuationToken): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to an OrderByQueryContinuationToken
 * @internal
 */
export function parseOrderByQueryContinuationToken(tokenString: string): OrderByQueryContinuationToken {
  return JSON.parse(tokenString);
}
