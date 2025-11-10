// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryRange } from "../../routing/QueryRange.js";
import type { QueryRangeMapping } from "../../queryExecutionContext/queryRangeMapping.js";

/**
 * @hidden
 * Simplified query range for continuation tokens
 */
export interface SimplifiedQueryRange {
  /**
   * Minimum boundary (inclusive)
   */
  min: string;
  /**
   * Maximum boundary (exclusive)
   */
  max: string;
}

/**
 * @hidden
 * Composite continuation token for parallel query execution across multiple partition ranges
 */
export interface CompositeQueryContinuationToken {
  /**
   * Resource ID of the container for which the continuation token is issued
   */
  rid: string;

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
  rangeMappings: QueryRangeWithContinuationToken[],
  offset?: number,
  limit?: number,
): CompositeQueryContinuationToken {
  if (!rangeMappings || rangeMappings.length === 0) {
    throw new Error(
      "Failed to create composite continuation token: No partition range mappings provided. " +
        "This typically indicates an issue with query execution context initialization or partition key range resolution. " +
        "Ensure the query is properly configured and the container has valid partition ranges.",
    );
  }

  return {
    rid,
    rangeMappings: rangeMappings,
    offset,
    limit,
  };
}

/**
 * Serializes the composite continuation token to a JSON string
 * @hidden
 */
export function serializeCompositeToken(token: CompositeQueryContinuationToken): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to a CompositeQueryContinuationToken
 * @hidden
 */
export function parseCompositeQueryContinuationToken(
  tokenString: string,
): CompositeQueryContinuationToken {
  return JSON.parse(tokenString);
}

/**
 * @hidden
 * Represents a query range with its associated continuation token
 */
export interface QueryRangeWithContinuationToken {
  /**
   * The simplified query range containing min/max boundaries
   */
  queryRange: SimplifiedQueryRange;

  /**
   * The continuation token for this specific range
   */
  continuationToken: string | null;
}

/**
 * Converts QueryRangeMapping to QueryRangeWithContinuationToken using simplified range format
 * @param rangeMapping - The QueryRangeMapping to convert
 * @returns QueryRangeWithContinuationToken with simplified boundaries and continuation token
 * @hidden
 */
export function convertRangeMappingToQueryRange(
  rangeMapping: QueryRangeMapping,
): QueryRangeWithContinuationToken {
  if (!rangeMapping.partitionKeyRange) {
    throw new Error(
      "Failed to convert range mapping: Missing partition key range information. " +
        "The QueryRangeMapping object must contain a valid partitionKeyRange with min and max boundaries. " +
        "This may indicate an incomplete partition key range resolution during query setup.",
    );
  }

  const pkRange = rangeMapping.partitionKeyRange;

  // Create simplified range assuming min is inclusive and max is exclusive
  const simplifiedRange: SimplifiedQueryRange = {
    min: pkRange.minInclusive,
    max: pkRange.maxExclusive,
  };

  return {
    queryRange: simplifiedRange,
    continuationToken: rangeMapping.continuationToken,
  };
}

/**
 * Converts an array of QueryRangeMapping to an array of QueryRangeWithContinuationToken
 * @param rangeMappings - Array of QueryRangeMapping to convert
 * @returns Array of QueryRangeWithContinuationToken with simplified boundaries and continuation tokens
 * @hidden
 */
export function convertRangeMappingsToQueryRangesWithTokens(
  rangeMappings: QueryRangeMapping[],
): QueryRangeWithContinuationToken[] {
  return rangeMappings.map((mapping) => convertRangeMappingToQueryRange(mapping));
}

/**
 * Converts a SimplifiedQueryRange back to a QueryRange for internal use
 * @param simplifiedRange - The simplified range to convert
 * @returns QueryRange with standard assumptions (min inclusive, max exclusive)
 * @hidden
 */
export function convertSimplifiedRangeToQueryRange(
  simplifiedRange: SimplifiedQueryRange,
): QueryRange {
  return new QueryRange(
    simplifiedRange.min,
    simplifiedRange.max,
    true, // minInclusive = true (assumption)
    false, // maxInclusive = false (max is exclusive, assumption)
  );
}
