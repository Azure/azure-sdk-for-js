// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// tslint:disable:max-line-length
/**
 * Range for Blob Service Operations.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-the-range-header-for-blob-service-operations
 */
export interface Range {
  /**
   * StartByte, larger than or equal 0.
   */
  offset: number;
  /**
   * Optional. Count of bytes, larger than 0.
   * If not provided, will return bytes from offset to the end.
   */
  count?: number;
}

/**
 * Generate a range string. For example:
 *
 * "bytes=255-" or "bytes=0-511"
 *
 * @param iRange -
 */
export function rangeToString(iRange: Range): string {
  if (iRange.offset < 0) {
    throw new RangeError(`Range.offset cannot be smaller than 0.`);
  }
  if (iRange.count && iRange.count <= 0) {
    throw new RangeError(
      `Range.count must be larger than 0. Leave it undefined if you want a range from offset to the end.`
    );
  }
  return iRange.count
    ? `bytes=${iRange.offset}-${iRange.offset + iRange.count - 1}`
    : `bytes=${iRange.offset}-`;
}
