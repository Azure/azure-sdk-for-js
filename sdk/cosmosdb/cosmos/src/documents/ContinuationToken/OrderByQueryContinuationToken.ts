// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeWithContinuationToken } from "./CompositeQueryContinuationToken.js";

/**
 * Continuation token for order by queries.
 * @hidden
 */
export interface OrderByQueryContinuationToken {
  /**
   * List of query ranges with their continuation tokens
   */
  rangeMappings: QueryRangeWithContinuationToken[];

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
   * Document ID of the last document result
   */
  documentRid: string;

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
 * @hidden
 */
export function createOrderByQueryContinuationToken(
  rangeMappings: QueryRangeWithContinuationToken[],
  orderByItems: any[],
  rid: string,
  skipCount: number,
  documentRid?: string,
  offset?: number,
  limit?: number,
  hashedLastResult?: string,
): OrderByQueryContinuationToken {
  if (!rangeMappings || rangeMappings.length === 0) {
    throw new Error("rangeMappings must contain at least one element");
  }

  if (!orderByItems || orderByItems.length === 0) {
    throw new Error("orderByItems must contain at least one element");
  }

  return {
    rangeMappings,
    orderByItems,
    rid,
    skipCount,
    documentRid,
    offset,
    limit,
    hashedLastResult,
  } as OrderByQueryContinuationToken;
}

/**
 * Serializes an OrderByQueryContinuationToken to a JSON string
 * @hidden
 */
export function serializeOrderByQueryContinuationToken(
  token: OrderByQueryContinuationToken,
): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to an OrderByQueryContinuationToken
 * @hidden
 */
export function parseOrderByQueryContinuationToken(
  tokenString: string,
): OrderByQueryContinuationToken {
  return JSON.parse(tokenString);
}
