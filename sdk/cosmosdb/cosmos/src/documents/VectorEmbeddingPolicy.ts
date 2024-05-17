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
  dataType: "float16" | "float32" | "uint8" | "int8";
  /**
   * The distance function to use for distance calculation in between vectors.
   */
  distanceFunction: "euclidean" | "cosine" | "dotproduct";
}
