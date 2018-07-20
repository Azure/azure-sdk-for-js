import { PartitionKey } from "../documents";

/** @hidden */
export type CompareFunction = (x: Point, y: Point) => number;

/** @hidden */
export type Point = number | string;

/** @hidden */
export class Range {
  public readonly low: Point;
  public readonly high: Point;

  /**
   * Represents a range object used by the RangePartitionResolver in the Azure Cosmos DB database service.
   * @class Range
   * @param {object} options                   - The Range constructor options.
   * @param {any} options.low                  - The low value in the range.
   * @param {any} options.high                 - The high value in the range.
   */
  constructor(options?: any) {
    // TODO: any options
    if (options === undefined) {
      options = {};
    }
    if (options === null) {
      throw new Error("Invalid argument: 'options' is null");
    }
    if (typeof options !== "object") {
      throw new Error("Invalid argument: 'options' is not an object");
    }
    if (options.high === undefined) {
      options.high = options.low;
    }
    this.low = options.low;
    this.high = options.high;

    Object.freeze(this);
  }

  // TODO: private?
  public _compare(x: Point, y: Point, compareFunction?: CompareFunction) {
    // Same semantics as Array.sort
    // http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare
    if (x === undefined && y === undefined) {
      return 0;
    }
    if (x === undefined) {
      return 1;
    }
    if (y === undefined) {
      return -1;
    }
    if (compareFunction !== undefined) {
      const v = Number(compareFunction(x, y));
      if (Number.isNaN(v)) {
        return 0;
      }
      return v;
    }
    const xString = String(x);
    const yString = String(y);
    if (xString < yString) {
      return -1;
    }
    if (xString > yString) {
      return 1;
    }
    return 0;
  }

  // TODO: This is an alias for backwards compatibility. Need to decide if this is public surface area or not
  // tslint:disable-next-line:variable-name
  public _contains = this.contains;

  public contains(other: Point | Range, compareFunction?: CompareFunction) {
    if (Range.isRange(other)) {
      return this._containsRange(other as Range, compareFunction);
    } else {
      return this._containsPoint(other as number, compareFunction);
    }
  }

  // TODO: private?
  public _containsPoint(point: Point, compareFunction?: CompareFunction) {
    return (
      this._compare(point, this.low, compareFunction) >= 0 && this._compare(point, this.high, compareFunction) <= 0
    );
  }

  // TODO: private?
  public _containsRange(range: Range, compareFunction?: CompareFunction) {
    return (
      this._compare(range.low, this.low, compareFunction) >= 0 &&
      this._compare(range.high, this.high, compareFunction) <= 0
    );
  }

  // TODO: alias for backwards compat
  // tslint:disable-next-line:variable-name
  public _intersect = this.intersect;

  public intersect(range: Range, compareFunction?: CompareFunction) {
    if (range === undefined || range === null) {
      throw new Error("Invalid Argument: 'other' is undefined or null");
    }
    const maxLow = this._compare(this.low, range.low, compareFunction) >= 0 ? this.low : range.low;
    const minHigh = this._compare(this.high, range.high, compareFunction) <= 0 ? this.high : range.high;
    return this._compare(maxLow, minHigh, compareFunction) <= 0;
  }

  // TODO: alias for backwards compat
  // tslint:disable-next-line:variable-name
  public _toString = this.toString;

  public toString() {
    return String(this.low) + "," + String(this.high);
  }

  // TODO: alias for backwards compat
  // tslint:disable-next-line:variable-name
  public static _isRange = Range.isRange;

  public static isRange(pointOrRange: Point | Range | PartitionKey) {
    if (pointOrRange === undefined) {
      return false;
    }
    if (pointOrRange === null) {
      return false;
    }
    if (typeof pointOrRange !== "object") {
      return false;
    }
    return pointOrRange instanceof Range;
  }
}
