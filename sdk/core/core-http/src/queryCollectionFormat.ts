// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The format that will be used to join an array of values together for a query parameter value.
 */
export enum QueryCollectionFormat {
  Csv = ",",
  Ssv = " ",
  Tsv = "\t",
  Pipes = "|",
  Multi = "Multi"
}
