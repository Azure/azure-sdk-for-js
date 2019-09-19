/**
 * Specifies the supported Index types.
 */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export enum IndexKind {
  /**
   * This is supplied for a path which requires sorting.
   */
  Range = "Range",
  /**
   * This is supplied for a path which requires geospatial indexing.
   */
  Spatial = "Spatial"
}
