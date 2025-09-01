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
}

/**
 * Creates a new ParallelQueryResult with the specified data
 * @param buffer - The query result data
 * @param partitionKeyRangeMap - Partition key range mappings
 * @param updatedContinuationRanges - Updated continuation ranges
 * @returns A new ParallelQueryResult instance
 * @hidden
 */
export function createParallelQueryResult(
  buffer: any[],
  partitionKeyRangeMap: Map<string, QueryRangeMapping>,
  updatedContinuationRanges: Record<string, any>
): ParallelQueryResult {
  return {
    buffer,
    partitionKeyRangeMap,
    updatedContinuationRanges
  };
}

/**
 * Creates an empty ParallelQueryResult
 * @returns An empty ParallelQueryResult instance
 * @hidden
 */
export function createEmptyParallelQueryResult(): ParallelQueryResult {
  return {
    buffer: [],
    partitionKeyRangeMap: new Map(),
    updatedContinuationRanges: {}
  };
}
