// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface VectorEmbeddingPolicy {
  vectorEmbeddings: VectorEmbedding[];
  additionalProperties?: { [key: string]: any };
}
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
  dataType: VectorDataType;
  /**
   * The distance function to use for distance calculation in between vectors.
   */
  distanceFunction: DistanceFunction;
  /**
   * Additional properties for the vector embedding.
   * This contains additional values for scenarios where the SDK is not aware of new fields.
   * This ensures that if resource is read and updated none of the fields will be lost in the process.
   */
  additionalProperties?: { [key: string]: any };
}

/**
 * Represents the data type for vector embeddings.
 */
export enum VectorDataType {
  Float16 = "float16",
  Float32 = "float32",
  Uint8 = "uint8",
  Int8 = "int8",
}

/**
 * Defines the distance function for a vector index specification in the
 * Azure Cosmos DB service.
 */
export enum DistanceFunction {
  Euclidean = "euclidean",
  Cosine = "cosine",
  DotProduct = "dotproduct",
}
