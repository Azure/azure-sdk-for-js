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
  spatialIndexes?: SpatialIndex[];
}

/* The target data type of a spatial path */
export enum SpatialType {
  LineString = "LineString",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon"
}

export interface SpatialIndex {
  /* Path in JSON document to index */
  path: string;
  types: SpatialType[];
  /* Bounding box for geometry spatial path */
  boundingBox: {
    /* X-coordinate of the lower-left corner of the bounding box. */
    xmin: number;
    /* Y-coordinate of the lower-left corner of the bounding box. */
    ymin: number;
    /* X-coordinate of the upper-right corner of the bounding box. */
    xmax: number;
    /* Y-coordinate of the upper-right corner of the bounding box. */
    ymax: number;
  };
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
