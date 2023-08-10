// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Specifies a custom epk range for changefeed.
 */
export interface EpkRange {
  /**
   * Min value for the custom epk range.
   */
  minInclusive: string;
  /**
   * Max value for the custom epk range.
   */
  maxExclusive: string;
}
