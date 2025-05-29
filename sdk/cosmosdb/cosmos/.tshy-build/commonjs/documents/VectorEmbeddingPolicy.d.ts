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
export declare enum VectorEmbeddingDataType {
    /**
     * 32-bit floating point number.
     */
    Float32 = "float32",
    /**
     * 8-bit unsigned integer.
     */
    UInt8 = "uint8",
    /**
     * 8-bit signed integer.
     */
    Int8 = "int8"
}
/**
 * Represents the distance function to use for distance calculation in between vectors.
 */
export declare enum VectorEmbeddingDistanceFunction {
    /**
     * Represents euclidean distance function.
     */
    Euclidean = "euclidean",
    /**
     * Represents cosine distance function.
     */
    Cosine = "cosine",
    /**
     * Represents dot product distance function.
     */
    DotProduct = "dotproduct"
}
//# sourceMappingURL=VectorEmbeddingPolicy.d.ts.map