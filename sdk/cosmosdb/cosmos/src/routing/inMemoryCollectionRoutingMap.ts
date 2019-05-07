import * as bs from "binary-search-bounds"; // TODO: missing types
import { Constants } from "../common";
import { Range } from "../range";
import { QueryRange } from "./QueryRange";

/** @hidden */
export class InMemoryCollectionRoutingMap {
  private rangeById: Range[];
  private rangeByInfo: string;
  private orderedPartitionKeyRanges: any[];
  private orderedRanges: QueryRange[];
  // TODO: chrande made this public, even though it is implementation detail for a test
  public orderedPartitionInfo: any;
  private collectionUniqueId: any;

  /**
   * Represents a InMemoryCollectionRoutingMap Object,
   * Stores partition key ranges in an efficient way with some additional information and provides
   * convenience methods for working with set of ranges.
   */
  constructor(
    rangeById: Range[],
    rangeByInfo: string,
    orderedPartitionKeyRanges: any[],
    orderedPartitionInfo: any,
    collectionUniqueId: string
  ) {
    this.rangeById = rangeById;
    this.rangeByInfo = rangeByInfo;
    this.orderedPartitionKeyRanges = orderedPartitionKeyRanges;
    this.orderedRanges = orderedPartitionKeyRanges.map(pkr => {
      return new QueryRange(
        pkr[Constants.PartitionKeyRange.MinInclusive],
        pkr[Constants.PartitionKeyRange.MaxExclusive],
        true,
        false
      );
    });
    this.orderedPartitionInfo = orderedPartitionInfo;
    this.collectionUniqueId = collectionUniqueId;
  }
  public getOrderedParitionKeyRanges() {
    return this.orderedPartitionKeyRanges;
  }

  public getRangeByEffectivePartitionKey(effectivePartitionKeyValue: string) {
    if (Constants.EffectiveParitionKeyConstants.MinimumInclusiveEffectivePartitionKey === effectivePartitionKeyValue) {
      return this.orderedPartitionKeyRanges[0];
    }

    if (Constants.EffectiveParitionKeyConstants.MaximumExclusiveEffectivePartitionKey === effectivePartitionKeyValue) {
      return undefined;
    }

    const sortedLow = this.orderedRanges.map(r => {
      return { v: r.min, b: !r.isMinInclusive };
    });

    const index = bs.le(
      sortedLow,
      { v: effectivePartitionKeyValue, b: true },
      InMemoryCollectionRoutingMap._vbCompareFunction
    );
    // that's an error
    if (index < 0) {
      throw new Error("error in collection routing map, queried partition key is less than the start range.");
    }

    return this.orderedPartitionKeyRanges[index];
  }

  private static _vbCompareFunction(x: any, y: any) {
    // TODO: What is x & y? A bs type?
    if (x.v > y.v) {
      return 1;
    }
    if (x.v < y.v) {
      return -1;
    }
    if (x.b > y.b) {
      return 1;
    }
    if (x.b < y.b) {
      return -1;
    }
    return 0;
  }

  public getOverlappingRanges(providedQueryRanges: QueryRange | QueryRange[]) {
    const pqr: QueryRange[] = Array.isArray(providedQueryRanges) ? providedQueryRanges : [providedQueryRanges];
    const minToPartitionRange: any = {}; // TODO: any
    const sortedLow = this.orderedRanges.map(r => {
      return { v: r.min, b: !r.isMinInclusive };
    });
    const sortedHigh = this.orderedRanges.map(r => {
      return { v: r.max, b: r.isMaxInclusive };
    });

    // this for loop doesn't invoke any async callback
    for (const queryRange of pqr) {
      if (queryRange.isEmpty()) {
        continue;
      }
      const minIndex = bs.le(
        sortedLow,
        { v: queryRange.min, b: !queryRange.isMinInclusive },
        InMemoryCollectionRoutingMap._vbCompareFunction
      );

      if (minIndex < 0) {
        throw new Error("error in collection routing map, queried value is less than the start range.");
      }

      const maxIndex = bs.ge(
        sortedHigh,
        { v: queryRange.max, b: queryRange.isMaxInclusive },
        InMemoryCollectionRoutingMap._vbCompareFunction
      );
      if (maxIndex > sortedHigh.length) {
        throw new Error("error in collection routing map, queried value is greater than the end range.");
      }

      // the for loop doesn't invoke any async callback
      for (let j = minIndex; j < maxIndex + 1; j++) {
        if (queryRange.overlaps(this.orderedRanges[j])) {
          minToPartitionRange[
            this.orderedPartitionKeyRanges[j][Constants.PartitionKeyRange.MinInclusive]
          ] = this.orderedPartitionKeyRanges[j];
        }
      }
    }

    const overlappingPartitionKeyRanges = Object.keys(minToPartitionRange).map(k => minToPartitionRange[k]);

    return overlappingPartitionKeyRanges.sort(r => {
      return r[Constants.PartitionKeyRange.MinInclusive];
    });
  }
}
