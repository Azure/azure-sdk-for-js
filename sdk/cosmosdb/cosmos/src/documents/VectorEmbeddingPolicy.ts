// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Represents the policy configuration for vector embeddings in the Azure Cosmos DB service.
 */
export interface VectorEmbeddingPolicy {
  /**
   * The vector embeddings to be configured.
   */
  vectorEmbeddings: VectorEmbedding[];
}
/**
 * Represents a vector embedding.
 * A vector embedding is used to define a vector field in the documents.
 */
export interface VectorEmbedding {
  /**
   * The path to the vector field in the document.
   */
  path: string;
  /**
   * The number of dimensions in the vector.
   */
  dimensions: number;
  /**
   * The data type of the vector.
   */
  dataType: VectorEmbeddingDataType;
  /**
   * The distance function to use for distance calculation in between vectors.
   */
  distanceFunction: VectorEmbeddingDistanceFunction;
}

/**
 * Represents the data type of the vector.
 */
export enum VectorEmbeddingDataType {
  Float16 = "float16",
  Float32 = "float32",
  UInt8 = "uint8",
  Int8 = "int8",
}
/**
 * Represents the distance function to use for distance calculation in between vectors.
 */
export enum VectorEmbeddingDistanceFunction {
  Euclidean = "euclidean",
  Cosine = "cosine",
  DotProduct = "dotproduct",
}
