// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryRange } from "../routing/QueryRange.js";
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
   * List of query ranges with their continuation tokens
   */
  rangeMappings: QueryRangeWithContinuationToken[];

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
  const queryRanges = convertRangeMappingsToQueryRangesWithTokens(rangeMappings);
  
  return {
    rid,
    rangeMappings: queryRanges,
    offset,
    limit,
  };
}/**
 * Adds a range mapping to the continuation token by converting it to QueryRange
 * @hidden
 */
export function addRangeMappingToCompositeToken(token: CompositeQueryContinuationToken, rangeMapping: QueryRangeMapping): void {
  // Convert the QueryRangeMapping to QueryRange before adding
  const queryRange = convertRangeMappingToQueryRange(rangeMapping);
  token.rangeMappings.push(queryRange);
}

/**
 * Serializes the composite continuation token to a JSON string
 * @hidden
 */
export function compositeTokenToString(token: CompositeQueryContinuationToken): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to a CompositeQueryContinuationToken
 * @hidden
 */
export function compositeTokenFromString(tokenString: string): CompositeQueryContinuationToken {
  const parsed = JSON.parse(tokenString);
  
  // Convert the parsed rangeMappings back to QueryRangeWithContinuationToken objects
  const queryRanges = (parsed.rangeMappings || []).map((rangeData: any) => {
    const queryRange = new QueryRange(
      rangeData.queryRange?.min , // Handle both new and old format
      rangeData.queryRange?.max ,
      rangeData.queryRange?.isMinInclusive  || true,
      rangeData.queryRange?.isMaxInclusive  || false
    );

    return {
      queryRange,
      continuationToken: rangeData.continuationToken || null,  
    } as QueryRangeWithContinuationToken;
  });
  
  return {
    rid: parsed.rid,
    rangeMappings: queryRanges,
    offset: parsed.offset,
    limit: parsed.limit,
  };
}



/**
 * @hidden
 * Represents a query range with its associated continuation token
 */
export interface QueryRangeWithContinuationToken {
  /**
   * The query range containing min/max boundaries (with EPK preference)
   */
  queryRange: QueryRange;

  /**
   * The continuation token for this specific range
   */
  continuationToken: string | null;
}

/**
 * Converts QueryRangeMapping to QueryRangeWithContinuationToken, giving preference to EPK boundaries if present
 * @param rangeMapping - The QueryRangeMapping to convert
 * @returns QueryRangeWithContinuationToken with appropriate boundaries and continuation token
 * @hidden
 */
export function convertRangeMappingToQueryRange(rangeMapping: QueryRangeMapping): QueryRangeWithContinuationToken {
  if (!rangeMapping.partitionKeyRange) {
    throw new Error("QueryRangeMapping must have a partitionKeyRange");
  }

  const pkRange = rangeMapping.partitionKeyRange;
  
  // Prefer EPK boundaries if they exist, otherwise use logical boundaries
  const minInclusive = pkRange.epkMin || pkRange.minInclusive;
  const maxExclusive = pkRange.epkMax || pkRange.maxExclusive;

  const queryRange = new QueryRange(
    minInclusive,
    maxExclusive,
    true,  // minInclusive is always true for our use case
    false  // maxInclusive is always false for our use case (maxExclusive)
  );

  return {
    queryRange,
    continuationToken: rangeMapping.continuationToken,
  };
}

/**
 * Converts an array of QueryRangeMapping to an array of QueryRangeWithContinuationToken
 * @param rangeMappings - Array of QueryRangeMapping to convert
 * @returns Array of QueryRangeWithContinuationToken with appropriate boundaries and continuation tokens
 * @hidden
 */
export function convertRangeMappingsToQueryRangesWithTokens(rangeMappings: QueryRangeMapping[]): QueryRangeWithContinuationToken[] {
  return rangeMappings.map(mapping => convertRangeMappingToQueryRange(mapping));
}
