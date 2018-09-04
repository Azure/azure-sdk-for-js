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
   * @memberof IPRange
   */
  offset: number;
  /**
   * Optional. Count of bytes, larger than 0.
   * If not provided, will return bytes from offset to the end.
   *
   * @type {string}
   * @memberof IPRange
   */
  count?: number;
}

/**
 * Generate a range string. For example:
 *
 * "bytes=255-" or "bytes=0-511"
 *
 * @export
 * @param {IRange} ipRange
 * @returns {string}
 */
export function rangeToString(ipRange: IRange): string {
  if (ipRange.offset < 0) {
    throw new RangeError(`IPRange.offset cannot be smaller than 0.`);
  }
  if (ipRange.count && ipRange.count <= 0) {
    throw new RangeError(
      `IPRange.count must be larger than 0. Leave it undefined if you want a range from offset to the end.`
    );
  }
  return ipRange.count
    ? `bytes=${ipRange.offset}-${ipRange.offset + ipRange.count - 1}`
    : `bytes=${ipRange.offset}-`;
}
