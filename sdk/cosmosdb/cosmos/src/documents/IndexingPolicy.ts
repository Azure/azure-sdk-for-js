// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DataType, IndexingMode, IndexKind } from "./index.js";

export interface IndexingPolicy {
  /** The indexing mode (consistent or lazy) {@link IndexingMode}. */
  indexingMode?: keyof typeof IndexingMode;
  automatic?: boolean;
  /** An array of {@link IncludedPath} represents the paths to be included for indexing. */
  includedPaths?: IndexedPath[];
  /** An array of {@link IncludedPath} represents the paths to be excluded for indexing. */
  excludedPaths?: IndexedPath[];
  spatialIndexes?: SpatialIndex[];
  /** An array of {@link VectorIndex} represents the vector index paths to be included for indexing. */
  vectorIndexes?: VectorIndex[];
  /** An array of {@link CompositeIndexes} representing composite indexes to be included. */
  compositeIndexes?: CompositePath[][];
  /** An array of {@link FullTextIndex} representing full text indexes to be included. */
  fullTextIndexes?: FullTextIndex[];
}

/* The target data type of a spatial path */
export enum SpatialType {
  LineString = "LineString",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon",
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
/**
 * Represents a vector index in the Azure Cosmos DB service.
 * A vector index is used to index vector fields in the documents.
 */

export interface VectorIndex {
  /**
   * The path to the vector field in the document.
   * for example, path: "/path/to/vector".
   */
  path: string;
  /**
   * The index type of the vector.
   * Currently, flat, diskANN, and quantizedFlat are supported.
   */
  type: VectorIndexType;
  /**
   * The quantizer type for the vector index.
   * This is an optional parameter and applies to index types DiskANN and quantizedFlat.
   * Allowed values are "product" and "spherical".
   */
  quantizerType?: VectorIndexQuantizationType;
  /**
   * The number of bytes used in product quantization of the vectors.
   * This is an optional parameter and applies to index types DiskANN and quantizedFlat.
   * The allowed range for this parameter is between 1 and min(Dimensions, 512).
   */
  quantizationByteSize?: number;
  /**
   * The list of string containing the shard keys used for partitioning the vector indexes.
   * This is an optional parameter and applies to index types DiskANN and quantizedFlat.
   */
  vectorIndexShardKey?: string[];
  /**
   * The size of the candidate list of approximate neighbors stored while building
   * the diskANN index as part of the optimization processes.
   * This is an optional parameter and applies to index type DiskANN only.
   * The allowed range is between 25 and 500.
   */
  indexingSearchListSize?: number;
}

/**
 * Represents the index type of the vector.
 */
export enum VectorIndexType {
  /**
   * Represents flat index type.
   */
  Flat = "flat",
  /**
   * Represents diskANN index type.
   */
  DiskANN = "diskANN",
  /**
   * Represents quantizedFlat index type.
   */
  QuantizedFlat = "quantizedFlat",
}

/**
 * Represents the quantization type for a vector index.
 * This is an optional parameter and applies to index types DiskANN and quantizedFlat.
 */
export enum VectorIndexQuantizationType {
  /**
   * Represents a product quantizer type.
   */
  Product = "product",
  /**
   * Represents a spherical quantizer type.
   */
  Spherical = "spherical",
}

/**
 * Represents a composite path in the indexing policy.
 */
export interface CompositePath {
  /** The path in the JSON document to include in the composite index. */
  path: string;
  /** The order of the composite index, either "ascending" or "descending". */
  order: "ascending" | "descending";
}

/**
 * Represents a full text index in the indexing policy.
 */
export interface FullTextIndex {
  /** The path in the JSON document to index. */
  path: string;
}
