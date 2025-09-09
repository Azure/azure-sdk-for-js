// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type { PartitionRangeWithContinuationToken } from "./TargetPartitionRangeManager.js";

/**
 * Represents the result of partition range filtering
 * @hidden
 */
export interface PartitionRangeFilterResult {
  /**
   * The filtered partition ranges with their associated continuation tokens and filtering conditions
   */
  rangeTokenPairs: PartitionRangeWithContinuationToken[];
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
   * @returns Filtered partition ranges and metadata
   */
  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationRanges?: PartitionRangeWithContinuationToken[],
    queryInfo?: Record<string, unknown>,
  ): PartitionRangeFilterResult;
}
