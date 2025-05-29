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
export declare enum SpatialType {
    LineString = "LineString",
    MultiPolygon = "MultiPolygon",
    Point = "Point",
    Polygon = "Polygon"
}
export interface SpatialIndex {
    path: string;
    types: SpatialType[];
    boundingBox: {
        xmin: number;
        ymin: number;
        xmax: number;
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
export declare enum VectorIndexType {
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
    QuantizedFlat = "quantizedFlat"
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
//# sourceMappingURL=IndexingPolicy.d.ts.map