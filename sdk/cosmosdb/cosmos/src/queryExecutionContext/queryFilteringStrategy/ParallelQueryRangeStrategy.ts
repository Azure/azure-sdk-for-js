// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import type { PartitionRangeWithContinuationToken } from "./TargetPartitionRangeManager.js";
import { isPartitionRangeActive } from "../PartitionRangeManager.js";
import {
  getLogicalPartitionRange,
  getUncoveredPartitionKeyRanges,
} from "../logicalPartitionRange.js";

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
    continuationRanges.sort((left, right) => {
      const leftRange = getLogicalPartitionRange(left.range, left.epkMin, left.epkMax);
      const rightRange = getLogicalPartitionRange(right.range, right.epkMin, right.epkMax);
      return leftRange.minInclusive.localeCompare(rightRange.minInclusive);
    });

    for (const range of continuationRanges) {
      if (isPartitionRangeActive(range.continuationToken, range.isActive)) {
        rangeTokenPairs.push({ ...range, isContinuationRange: true });
      }
    }

    const sortedTargetRanges = [...targetRanges].sort((left, right) =>
      left.minInclusive.localeCompare(right.minInclusive),
    );
    const firstLogicalRange = getLogicalPartitionRange(
      continuationRanges[0].range,
      continuationRanges[0].epkMin,
      continuationRanges[0].epkMax,
    );
    const queryMax = sortedTargetRanges[sortedTargetRanges.length - 1].maxExclusive;
    const coveredRanges = continuationRanges.map((range) =>
      getLogicalPartitionRange(range.range, range.epkMin, range.epkMax),
    );
    const uncoveredRanges = getUncoveredPartitionKeyRanges(
      sortedTargetRanges,
      coveredRanges,
      firstLogicalRange.minInclusive,
      queryMax,
    );
    rangeTokenPairs.push(
      ...uncoveredRanges.map((range) => ({
        range: range.partitionKeyRange,
        continuationToken: undefined as string | undefined,
        filteringCondition: undefined as string | undefined,
        epkMin: range.minInclusive,
        epkMax: range.maxExclusive,
        isContinuationRange: false,
      })),
    );

    return {
      rangeTokenPairs,
    };
  }
}
