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
