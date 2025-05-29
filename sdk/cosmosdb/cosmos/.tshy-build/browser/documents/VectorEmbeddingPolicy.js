/**
 * Represents the data type of the vector.
 */
export var VectorEmbeddingDataType;
(function (VectorEmbeddingDataType) {
    /**
     * 32-bit floating point number.
     */
    VectorEmbeddingDataType["Float32"] = "float32";
    /**
     * 8-bit unsigned integer.
     */
    VectorEmbeddingDataType["UInt8"] = "uint8";
    /**
     * 8-bit signed integer.
     */
    VectorEmbeddingDataType["Int8"] = "int8";
})(VectorEmbeddingDataType || (VectorEmbeddingDataType = {}));
/**
 * Represents the distance function to use for distance calculation in between vectors.
 */
export var VectorEmbeddingDistanceFunction;
(function (VectorEmbeddingDistanceFunction) {
    /**
     * Represents euclidean distance function.
     */
    VectorEmbeddingDistanceFunction["Euclidean"] = "euclidean";
    /**
     * Represents cosine distance function.
     */
    VectorEmbeddingDistanceFunction["Cosine"] = "cosine";
    /**
     * Represents dot product distance function.
     */
    VectorEmbeddingDistanceFunction["DotProduct"] = "dotproduct";
})(VectorEmbeddingDistanceFunction || (VectorEmbeddingDistanceFunction = {}));
//# sourceMappingURL=VectorEmbeddingPolicy.js.map