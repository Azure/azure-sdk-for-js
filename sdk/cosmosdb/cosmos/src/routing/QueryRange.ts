// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PartitionKeyRange } from "../client/Container/PartitionKeyRange";
import { Constants } from "../common";
import { QueryRange as ResponseQueryRange } from "../request/ErrorResponse";

/** @hidden */
export class QueryRange {
  public min: string;
  public max: string;
  public isMinInclusive: boolean;
  public isMaxInclusive: boolean;

  /**
   * Represents a QueryRange.
   *
   * @param rangeMin                - min
   * @param rangeMin                - max
   * @param isMinInclusive         - isMinInclusive
   * @param isMaxInclusive         - isMaxInclusive
   * @hidden
   */
  constructor(
    rangeMin: string,
    rangeMax: string,
    isMinInclusive: boolean,
    isMaxInclusive: boolean
  ) {
    this.min = rangeMin;
    this.max = rangeMax;
    this.isMinInclusive = isMinInclusive;
    this.isMaxInclusive = isMaxInclusive;
  }
  public overlaps(other: QueryRange): boolean {
    // tslint:disable-next-line:no-this-assignment
    const range1 = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const range2 = other;
    if (range1 === undefined || range2 === undefined) {
      return false;
    }
    if (range1.isEmpty() || range2.isEmpty()) {
      return false;
    }

    if (range1.min <= range2.max || range2.min <= range1.max) {
      if (
        (range1.min === range2.max && !(range1.isMinInclusive && range2.isMaxInclusive)) ||
        (range2.min === range1.max && !(range2.isMinInclusive && range1.isMaxInclusive))
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  public isFullRange(): boolean {
    return (
      this.min === Constants.EffectiveParitionKeyConstants.MinimumInclusiveEffectivePartitionKey &&
      this.max === Constants.EffectiveParitionKeyConstants.MaximumExclusiveEffectivePartitionKey &&
      this.isMinInclusive === true &&
      this.isMaxInclusive === false
    );
  }

  public isEmpty(): boolean {
    return !(this.isMinInclusive && this.isMaxInclusive) && this.min === this.max;
  }
  /**
   * Parse a QueryRange from a partitionKeyRange
   * @returns QueryRange
   * @hidden
   */
  public static parsePartitionKeyRange(partitionKeyRange: PartitionKeyRange): QueryRange {
    return new QueryRange(
      partitionKeyRange[Constants.PartitionKeyRange.MinInclusive],
      partitionKeyRange[Constants.PartitionKeyRange.MaxExclusive],
      true,
      false
    );
  }
  /**
   * Parse a QueryRange from a dictionary
   * @returns QueryRange
   * @hidden
   */
  public static parseFromDict(queryRangeDict: ResponseQueryRange): QueryRange {
    return new QueryRange(
      queryRangeDict.min,
      queryRangeDict.max,
      queryRangeDict.isMinInclusive,
      queryRangeDict.isMaxInclusive
    );
  }
}
