// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";

/**
 * @hidden
 * Composite continuation token for parallel query execution across multiple partition ranges
 */
export interface CompositeQueryContinuationToken {
  /**
   * Resource ID of the container for which the continuation token is issued
   */
  readonly rid: string;

  /**
   * List of query range mappings part of the continuation token
   */
  // TODO: either create a sperate object or just include min-max ranges while createing continuation token
  rangeMappings: QueryRangeMapping[];

  /**
   * Current offset value for OFFSET/LIMIT queries
   */
  offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  limit?: number;

}

/**
 * Creates a new CompositeQueryContinuationToken
 * @hidden
 */
export function createCompositeQueryContinuationToken(
  rid: string, 
  rangeMappings: QueryRangeMapping[], 
  offset?: number,
  limit?: number
): CompositeQueryContinuationToken {
  return {
    rid,
    rangeMappings,
    offset,
    limit,
  };
}

/**
 * Adds a range mapping to the continuation token
 * @hidden
 */
export function addRangeMappingToCompositeToken(token: CompositeQueryContinuationToken, rangeMapping: QueryRangeMapping): void {
  token.rangeMappings.push(rangeMapping);
}

/**
 * Serializes the composite continuation token to a JSON string
 * @hidden
 */
export function compositeTokenToString(token: CompositeQueryContinuationToken): string {
  return JSON.stringify({
    rid: token.rid,
    rangeMappings: token.rangeMappings,
    offset: token.offset,
    limit: token.limit,
  });
}

/**
 * Deserializes a JSON string to a CompositeQueryContinuationToken
 * @hidden
 */
export function compositeTokenFromString(tokenString: string): CompositeQueryContinuationToken {
  const parsed = JSON.parse(tokenString);
  return createCompositeQueryContinuationToken(
    parsed.rid,
    parsed.rangeMappings,
    parsed.offset,
    parsed.limit,
  );
}
