// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../client/index.js";

/** @hidden */
export interface LogicalPartitionRange {
  partitionKeyRange: PartitionKeyRange;
  minInclusive: string;
  maxExclusive: string;
}

/** @hidden */
export function getLogicalPartitionRange(
  partitionKeyRange: PartitionKeyRange,
  minInclusive?: string,
  maxExclusive?: string,
): LogicalPartitionRange {
  return {
    partitionKeyRange,
    minInclusive: minInclusive ?? partitionKeyRange.minInclusive,
    maxExclusive: maxExclusive ?? partitionKeyRange.maxExclusive,
  };
}

/** @hidden */
export function intersectPartitionKeyRange(
  partitionKeyRange: PartitionKeyRange,
  minInclusive: string,
  maxExclusive: string,
): LogicalPartitionRange | undefined {
  const intersectionMin =
    partitionKeyRange.minInclusive > minInclusive ? partitionKeyRange.minInclusive : minInclusive;
  const intersectionMax =
    partitionKeyRange.maxExclusive < maxExclusive ? partitionKeyRange.maxExclusive : maxExclusive;

  if (intersectionMin >= intersectionMax) {
    return undefined;
  }

  return getLogicalPartitionRange(partitionKeyRange, intersectionMin, intersectionMax);
}

/** @hidden */
export function intersectPartitionKeyRanges(
  partitionKeyRanges: PartitionKeyRange[],
  minInclusive: string,
  maxExclusive: string,
): LogicalPartitionRange[] {
  return partitionKeyRanges
    .map((partitionKeyRange) =>
      intersectPartitionKeyRange(partitionKeyRange, minInclusive, maxExclusive),
    )
    .filter((range): range is LogicalPartitionRange => !!range);
}

/** @hidden */
export function getUncoveredPartitionKeyRanges(
  partitionKeyRanges: PartitionKeyRange[],
  coveredRanges: { minInclusive: string; maxExclusive: string }[],
  minInclusive: string,
  maxExclusive: string,
): LogicalPartitionRange[] {
  const sortedCoveredRanges = [...coveredRanges]
    .map((range) => ({
      minInclusive: range.minInclusive < minInclusive ? minInclusive : range.minInclusive,
      maxExclusive: range.maxExclusive > maxExclusive ? maxExclusive : range.maxExclusive,
    }))
    .filter((range) => range.minInclusive < range.maxExclusive)
    .sort((left, right) => left.minInclusive.localeCompare(right.minInclusive));
  const uncoveredRanges: LogicalPartitionRange[] = [];
  let cursor = minInclusive;

  for (const range of sortedCoveredRanges) {
    if (cursor < range.minInclusive) {
      uncoveredRanges.push(
        ...intersectPartitionKeyRanges(partitionKeyRanges, cursor, range.minInclusive),
      );
    }
    if (range.maxExclusive > cursor) {
      cursor = range.maxExclusive;
    }
  }
  if (cursor < maxExclusive) {
    uncoveredRanges.push(...intersectPartitionKeyRanges(partitionKeyRanges, cursor, maxExclusive));
  }
  return uncoveredRanges;
}

/** @hidden */
export function isPartitionRangeBounded(range: LogicalPartitionRange): boolean {
  return (
    range.minInclusive !== range.partitionKeyRange.minInclusive ||
    range.maxExclusive !== range.partitionKeyRange.maxExclusive
  );
}

/** @hidden */
export function toEffectivePartitionKeyRange(range: LogicalPartitionRange): PartitionKeyRange {
  if (!isPartitionRangeBounded(range)) {
    return range.partitionKeyRange;
  }

  return {
    ...range.partitionKeyRange,
    minInclusive: range.minInclusive,
    maxExclusive: range.maxExclusive,
  };
}
