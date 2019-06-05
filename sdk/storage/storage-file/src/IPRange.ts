// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Allowed IP range for a SAS.
 *
 * @export
 * @interface IPRange
 */
export interface IPRange {
  /**
   * Starting IP address in the IP range.
   * If end IP doesn't provide, start IP will the only IP allowed.
   *
   * @type {string}
   * @memberof IPRange
   */
  start: string;
  /**
   * Optional. IP address that ends the IP range.
   * If not provided, start IP will the only IP allowed.
   *
   * @type {string}
   * @memberof IPRange
   */
  end?: string;
}

/**
 * Generate IPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @export
 * @param {IPRange} ipRange
 * @returns {string}
 */
export function ipRangeToString(ipRange: IPRange): string {
  return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
