// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Allowed IP range for a SAS.
 *
 * @export
 * @interface SasIPRange
 */
export interface SasIPRange {
  /**
   * Starting IP address in the IP range.
   * If end IP doesn't provide, start IP will the only IP allowed.
   *
   * @type {string}
   * @memberof SasIPRange
   */
  start: string;
  /**
   * Optional. IP address that ends the IP range.
   * If not provided, start IP will the only IP allowed.
   *
   * @type {string}
   * @memberof SasIPRange
   */
  end?: string;
}

/**
 * Generate SasIPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @export
 * @param {SasIPRange} ipRange
 * @returns {string}
 */
export function ipRangeToString(ipRange: SasIPRange): string {
  return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
