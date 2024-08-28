// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 * FeedRange for which change feed is being requested.
 */
export class ChangeFeedRange {
  /**
   * Min value for the range.
   */
  public minInclusive: string;
  /**
   * Max value for the range.
   */
  public maxExclusive: string;
  /**
   * Continuation token from where to start reading changes.
   */
  public continuationToken?: string;
  /**
   * Min epk value to begin reading changes from in case changefeed of entire partition is not requested.
   */
  public epkMinHeader?: string;
  /**
   * Max epk value to begin reading changes from in case changefeed of entire partition is not requested.
   */
  public epkMaxHeader?: string;

  constructor(
    minInclusive: string,
    maxExclusive: string,
    continuationToken?: string,
    epkMinHeader?: string,
    epkMaxHeader?: string,
  ) {
    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
    this.continuationToken = continuationToken;
    this.epkMinHeader = epkMinHeader;
    this.epkMaxHeader = epkMaxHeader;
  }
}
