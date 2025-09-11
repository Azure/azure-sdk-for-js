// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeWithContinuationToken } from "./CompositeQueryContinuationToken.js";

/**
 * Continuation token for order by queries.
 * @internal
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
 * @internal
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
  return {
    rangeMappings,
    orderByItems,
    rid,
    skipCount,
    offset,
    limit,
    hashedLastResult,
    documentRid
  };
}

/**
 * Serializes an OrderByQueryContinuationToken to a JSON string
 * @internal
 */
export function serializeOrderByQueryContinuationToken(
  token: OrderByQueryContinuationToken,
): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to an OrderByQueryContinuationToken
 * @internal
 */
export function parseOrderByQueryContinuationToken(
  tokenString: string,
): OrderByQueryContinuationToken {
  return JSON.parse(tokenString);
}

/**
 * Gets all range mappings from the OrderBy continuation token
 * @param token - The OrderBy continuation token
 * @returns Array of QueryRangeWithContinuationToken
 * @internal
 */
export function getRangeMappingsFromOrderByToken(
  token: OrderByQueryContinuationToken,
): QueryRangeWithContinuationToken[] {
  return token.rangeMappings || [];
}
