// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The format that will be used to join an array of values together for a query parameter value.
 */
export enum QueryCollectionFormat {
  /**
   * CSV: Each pair of segments joined by a single comma.
   */
  Csv = ",",
  /**
   * SSV: Each pair of segments joined by a single whitespace.
   */
  Ssv = " ",
  /**
   * TSV: Each pair of segments joined by a single tab.
   */
  Tsv = "\t",
  /**
   * Pipes: Each pair of segments joined by a single pipe character.
   */
  Pipes = "|",
  /**
   * Pairs of segments may join with multiple formats.
   */
  Multi = "Multi"
}
