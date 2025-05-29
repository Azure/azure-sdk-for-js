/* The target data type of a spatial path */
export var SpatialType;
(function (SpatialType) {
    SpatialType["LineString"] = "LineString";
    SpatialType["MultiPolygon"] = "MultiPolygon";
    SpatialType["Point"] = "Point";
    SpatialType["Polygon"] = "Polygon";
})(SpatialType || (SpatialType = {}));
/**
 * Represents the index type of the vector.
 */
export var VectorIndexType;
(function (VectorIndexType) {
    /**
     * Represents flat index type.
     */
    VectorIndexType["Flat"] = "flat";
    /**
     * Represents diskANN index type.
     */
    VectorIndexType["DiskANN"] = "diskANN";
    /**
     * Represents quantizedFlat index type.
     */
    VectorIndexType["QuantizedFlat"] = "quantizedFlat";
})(VectorIndexType || (VectorIndexType = {}));
//# sourceMappingURL=IndexingPolicy.js.map