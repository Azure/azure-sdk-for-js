// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";

/**
 * Represents the result structure returned by parallel query execution contexts
 * @hidden
 */
export interface ParallelQueryResult {
  /**
   * The actual query result data (documents/items)
   */
  buffer: any[];

  /**
   * Mapping of partition key ranges used during query execution
   */
  partitionKeyRangeMap: Map<string, QueryRangeMapping>;

  /**
   * Updated continuation ranges after partition split/merge operations
   */
  updatedContinuationRanges: Record<string, any>;

  /**
   * Optional array of orderBy items corresponding to each item in the buffer
   * Used for ORDER BY queries to track sorting criteria
   */
  orderByItems?: { orderByItems: any[]; _rid: string }[];
}

/**
 * Creates a new ParallelQueryResult with the specified data
 * @param buffer - The query result data
 * @param partitionKeyRangeMap - Partition key range mappings
 * @param updatedContinuationRanges - Updated continuation ranges
 * @param orderByItems - Optional array of orderBy items for each buffer item
 * @returns A new ParallelQueryResult instance
 * @hidden
 */
export function createParallelQueryResult(
  buffer: any[],
  partitionKeyRangeMap: Map<string, QueryRangeMapping>,
  updatedContinuationRanges?: Record<string, any>,
  orderByItems?: { orderByItems: any[]; _rid: string }[],
): ParallelQueryResult {
  const result: ParallelQueryResult = {
    buffer,
    partitionKeyRangeMap,
    updatedContinuationRanges,
  };

  if (orderByItems !== undefined) {
    result.orderByItems = orderByItems;
  }
  return result;
}
