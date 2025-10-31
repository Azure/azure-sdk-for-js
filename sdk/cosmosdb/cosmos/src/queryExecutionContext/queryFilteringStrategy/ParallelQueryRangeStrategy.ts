// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import type { PartitionRangeWithContinuationToken } from "./TargetPartitionRangeManager.js";

/**
 * Strategy for filtering partition ranges in parallel query execution context
 * Supports resuming from composite continuation tokens with multi-range aggregation
 * @hidden
 */
export class ParallelQueryRangeStrategy implements TargetPartitionRangeStrategy {
  getStrategyType(): string {
    return "ParallelQuery";
  }

  validateContinuationToken(continuationToken: string): boolean {
    // Check for null, undefined, or empty string inputs
    if (!continuationToken) {
      return false;
    }

    try {
      const parsed = JSON.parse(continuationToken);
      // Check if it's a composite continuation token (has rangeMappings)
      if (!parsed || !Array.isArray(parsed.rangeMappings)) {
        return false;
      }

      // Validate each range mapping has a non-null partitionKeyRange
      for (const rangeMapping of parsed.rangeMappings) {
        if (!rangeMapping || !rangeMapping.partitionKeyRange) {
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationRanges?: PartitionRangeWithContinuationToken[],
  ): PartitionRangeFilterResult {
    if (!targetRanges || targetRanges.length === 0) {
      return { rangeTokenPairs: [] };
    }

    // If no continuation ranges, return all ranges as range-token pairs
    if (!continuationRanges || continuationRanges.length === 0) {
      const rangeTokenPairs = targetRanges.map((range) => ({
        range,
        continuationToken: undefined as string | undefined,
        filteringCondition: undefined as string | undefined,
      }));
      return { rangeTokenPairs };
    }

    const rangeTokenPairs: PartitionRangeWithContinuationToken[] = [];
    let lastProcessedRange: PartitionKeyRange | null = null;

    // sort continuationRanges in ascending order using their minInclusive values
    continuationRanges.sort((a, b) => {
      return a.range.minInclusive.localeCompare(b.range.minInclusive);
    });

    for (const range of continuationRanges) {
      // Always track the last processed range, even if it's exhausted
      lastProcessedRange = range.range;

      if (range && !this.isPartitionExhausted(range.continuationToken)) {
        rangeTokenPairs.push({
          range: range.range,
          continuationToken: range.continuationToken,
          filteringCondition: range.filteringCondition,
        });
      }
    }

    // Add any new target ranges that come after the last processed range
    if (lastProcessedRange) {
      for (const targetRange of targetRanges) {
        // Only include ranges whose minInclusive value is greater than or equal to maxExclusive of lastProcessedRange
        if (targetRange.minInclusive >= lastProcessedRange.maxExclusive) {
          rangeTokenPairs.push({
            range: targetRange,
            continuationToken: undefined as string | undefined,
            filteringCondition: undefined as string | undefined,
          });
        }
      }
    } else {
      // If no ranges were processed from continuation token, add all target ranges
      for (const targetRange of targetRanges) {
        rangeTokenPairs.push({
          range: targetRange,
          continuationToken: undefined as string | undefined,
          filteringCondition: undefined as string | undefined,
        });
      }
    }

    return {
      rangeTokenPairs,
    };
  }

  /**
   * Checks if a partition is exhausted based on its continuation token
   */
  private isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === null ||
      continuationToken.toLowerCase() === "null"
    );
  }
}
