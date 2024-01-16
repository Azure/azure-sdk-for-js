// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PartitionKeyRange } from "../client";
import { Constants } from "../common";
import { QueryRange } from "./QueryRange";

/** @hidden */
export class InMemoryCollectionRoutingMap {
  private orderedPartitionKeyRanges: PartitionKeyRange[];
  private orderedRanges: QueryRange[];
  // TODO: chrande made this public, even though it is implementation detail for a test
  public orderedPartitionInfo: unknown;

  /**
   * Represents a InMemoryCollectionRoutingMap Object,
   * Stores partition key ranges in an efficient way with some additional information and provides
   * convenience methods for working with set of ranges.
   */
  constructor(orderedPartitionKeyRanges: PartitionKeyRange[], orderedPartitionInfo: unknown) {
    this.orderedPartitionKeyRanges = orderedPartitionKeyRanges;
    this.orderedRanges = orderedPartitionKeyRanges.map((pkr) => {
      return new QueryRange(
        pkr[Constants.PartitionKeyRange.MinInclusive],
        pkr[Constants.PartitionKeyRange.MaxExclusive],
        true,
        false
      );
    });
    this.orderedPartitionInfo = orderedPartitionInfo;
  }
  public getOrderedParitionKeyRanges(): PartitionKeyRange[] {
    return this.orderedPartitionKeyRanges;
  }

  public getOverlappingRanges(providedQueryRanges: QueryRange | QueryRange[]): PartitionKeyRange[] {
    // TODO This code has all kinds of smells. Multiple iterations and sorts just to grab overlapping ranges
    // stfaul attempted to bring it down to one for-loop and failed
    const pqr: QueryRange[] = Array.isArray(providedQueryRanges)
      ? providedQueryRanges
      : [providedQueryRanges];
    const minToPartitionRange: any = {}; // TODO: any

    // this for loop doesn't invoke any async callback
    for (const queryRange of pqr) {
      if (queryRange.isEmpty()) {
        continue;
      }

      if (queryRange.isFullRange()) {
        return this.orderedPartitionKeyRanges;
      }

      const minIndex = this.orderedRanges.findIndex((range) => {
        if (queryRange.min > range.min && queryRange.min < range.max) {
          return true;
        }
        if (queryRange.min === range.min) {
          return true;
        }
        if (queryRange.min === range.max) {
          return true;
        }
      });

      if (minIndex < 0) {
        throw new Error(
          "error in collection routing map, queried value is less than the start range."
        );
      }

      // Start at the end and work backwards
      let maxIndex: number;
      for (let i = this.orderedRanges.length - 1; i >= 0; i--) {
        const range = this.orderedRanges[i];
        if (queryRange.max > range.min && queryRange.max < range.max) {
          maxIndex = i;
          break;
        }
        if (queryRange.max === range.min) {
          maxIndex = i;
          break;
        }
        if (queryRange.max === range.max) {
          maxIndex = i;
          break;
        }
      }

      if (maxIndex > this.orderedRanges.length) {
        throw new Error(
          "error in collection routing map, queried value is greater than the end range."
        );
      }

      for (let j = minIndex; j < maxIndex + 1; j++) {
        if (queryRange.overlaps(this.orderedRanges[j])) {
          minToPartitionRange[
            this.orderedPartitionKeyRanges[j][Constants.PartitionKeyRange.MinInclusive]
          ] = this.orderedPartitionKeyRanges[j];
        }
      }
    }

    const overlappingPartitionKeyRanges = Object.keys(minToPartitionRange).map(
      (k) => minToPartitionRange[k]
    );

    return overlappingPartitionKeyRanges.sort((a, b) => {
      return a[Constants.PartitionKeyRange.MinInclusive].localeCompare(
        b[Constants.PartitionKeyRange.MinInclusive]
      );
    });
  }
}
