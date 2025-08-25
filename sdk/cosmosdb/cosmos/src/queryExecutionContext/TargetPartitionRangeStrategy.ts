// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";

/**
 * Represents the result of partition range filtering
 * @hidden
 */
export interface PartitionRangeFilterResult {
  /**
   * The filtered partition key ranges ready for query execution
   */
  filteredRanges: PartitionKeyRange[];

  /**
   * continuation token for resuming query execution
   */
  continuationToken?: string[];

  /**
   * Optional filtering conditions applied to the ranges
   * This can include conditions based on ORDER BY items, sort orders, or other query-specific
   */
  filteringConditions?: string[];
}

/**
 * Strategy interface for filtering target partition ranges based on query type and continuation token
 * @hidden
 */
export interface TargetPartitionRangeStrategy {
  /**
   * Gets the strategy type identifier
   */
  getStrategyType(): string;

  /**
   * Filters target partition ranges based on the continuation token and query-specific logic
   * @param targetRanges - All available target partition ranges
   * @param continuationToken - The continuation token to resume from (if any)
   * @param queryInfo - Additional query information for filtering decisions
   * @returns Filtered partition ranges and metadata
   */
  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
    queryInfo?: Record<string, unknown>,
  ): PartitionRangeFilterResult;

  /**
   * Validates if the continuation token is compatible with this strategy
   * @param continuationToken - The continuation token to validate
   * @returns true if the token is valid for this strategy
   */
  validateContinuationToken(continuationToken: string): boolean;
}
