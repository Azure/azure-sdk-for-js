// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Specifies the supported Index types.
 */
export enum IndexKind {
  /**
   * This is supplied for a path which requires sorting.
   */
  Range = "Range",
  /**
   * This is supplied for a path which requires geospatial indexing.
   */
  Spatial = "Spatial",
}
