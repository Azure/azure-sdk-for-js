// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorResponse } from "../../request";

/**
 * Specifies a feed range for the changefeed.
 */
export abstract class FeedRange {
  /**
   * Min value for the feed range.
   */
  readonly minInclusive: string;
  /**
   * Max value for the feed range.
   */
  readonly maxExclusive: string;
  /**
   * @internal
   */
  protected constructor(minInclusive: string, maxExclusive: string) {
    // only way to explictly block users from creating FeedRange directly in JS
    if (new.target === FeedRange) {
      throw new ErrorResponse("Cannot instantiate abstract class FeedRange");
    }

    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
  }
}

/**
 * @hidden
 * Specifies a feed range for the changefeed.
 */
export class FeedRangeInternal extends FeedRange {
  /* eslint-disable @typescript-eslint/no-useless-constructor */
  constructor(minInclusive: string, maxExclusive: string) {
    super(minInclusive, maxExclusive);
  }
}
