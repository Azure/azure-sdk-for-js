// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @hidden
 * Specifies a feed range for the changefeed.
 */
export class FeedRangeInternal implements FeedRange {
  /**
   * Min value for the feed range.
   */
  minInclusive: string;
  /**
   * Max value for the feed range.
   */
  maxExclusive: string;

  constructor(minInclusive: string, maxExclusive: string) {
    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
  }
}

export interface FeedRange {
  /**
   * Min value for the feed range.
   */
  minInclusive: string;
  /**
   * Max value for the feed range.
   */
  maxExclusive: string;
}
