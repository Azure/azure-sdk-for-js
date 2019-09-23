// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DataType, IndexingMode, IndexKind } from "./index";

export interface IndexingPolicy {
  /** The indexing mode (consistent or lazy) {@link IndexingMode}. */
  indexingMode?: keyof typeof IndexingMode;
  automatic?: boolean;
  /** An array of {@link IncludedPath} represents the paths to be included for indexing. */
  includedPaths?: IndexedPath[];
  /** An array of {@link IncludedPath} represents the paths to be excluded for indexing. */
  excludedPaths?: IndexedPath[];
}

export interface IndexedPath {
  path: string;
  indexes?: Index[];
}

export interface Index {
  kind: keyof typeof IndexKind;
  dataType: keyof typeof DataType;
  precision?: number;
}
