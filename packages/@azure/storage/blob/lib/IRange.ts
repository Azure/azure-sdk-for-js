// tslint:disable:max-line-length
/**
 * Range for Blob Service Operations.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-the-range-header-for-blob-service-operations
 *
 * @export
 * @interface IRange
 */
export interface IRange {
  /**
   * StartByte, larger than or equal 0.
   *
   * @type {string}
   * @memberof IRange
   */
  offset: number;
  /**
   * Optional. Count of bytes, larger than 0.
   * If not provided, will return bytes from offset to the end.
   *
   * @type {string}
   * @memberof IRange
   */
  count?: number;
}

/**
 * Generate a range string. For example:
 *
 * "bytes=255-" or "bytes=0-511"
 *
 * @export
 * @param {IRange} iRange
 * @returns {string}
 */
export function rangeToString(iRange: IRange): string {
  if (iRange.offset < 0) {
    throw new RangeError(`IRange.offset cannot be smaller than 0.`);
  }
  if (iRange.count && iRange.count <= 0) {
    throw new RangeError(
      `IRange.count must be larger than 0. Leave it undefined if you want a range from offset to the end.`
    );
  }
  return iRange.count
    ? `bytes=${iRange.offset}-${iRange.offset + iRange.count - 1}`
    : `bytes=${iRange.offset}-`;
}
