// tslint:disable:max-line-length
/**
 * Range for Service Operations.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-the-range-header-for-file-service-operations
 *
 * @export
 * @interface Range
 */
export interface Range {
  /**
   * StartByte, larger than or equal 0.
   *
   * @type {string}
   * @memberof Range
   */
  offset: number;
  /**
   * Optional. Count of bytes, larger than 0.
   * If not provided, will return bytes from offset to the end.
   *
   * @type {string}
   * @memberof Range
   */
  count?: number;
}

/**
 * Generate a range string. For example:
 *
 * "bytes=255-" or "bytes=0-511"
 *
 * @export
 * @param {Range} range
 * @returns {string}
 */
export function rangeToString(range: Range): string {
  if (range.offset < 0) {
    throw new RangeError(`Range.offset cannot be smaller than 0.`);
  }
  if (range.count && range.count <= 0) {
    throw new RangeError(
      `Range.count must be larger than 0. Leave it undefined if you want a range from offset to the end.`
    );
  }
  return range.count
    ? `bytes=${range.offset}-${range.offset + range.count - 1}`
    : `bytes=${range.offset}-`;
}
