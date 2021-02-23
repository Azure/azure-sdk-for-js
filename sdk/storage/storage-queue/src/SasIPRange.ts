// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Allowed IP range for a SAS.
 */
export interface SasIPRange {
  /**
   * Starting IP address in the IP range.
   * If end IP doesn't provide, start IP will the only IP allowed.
   */
  start: string;
  /**
   * Optional. IP address that ends the IP range.
   * If not provided, start IP will the only IP allowed.
   */
  end?: string;
}

/**
 * Generate SasIPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @param ipRange -
 */
export function ipRangeToString(ipRange: SasIPRange): string {
  return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
