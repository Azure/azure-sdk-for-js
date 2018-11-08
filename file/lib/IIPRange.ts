/**
 * Allowed IP range for a SAS.
 *
 * @export
 * @interface IIPRange
 */
export interface IIPRange {
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
 * @param {IIPRange} ipRange
 * @returns {string}
 */
export function ipRangeToString(ipRange: IIPRange): string {
  return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
