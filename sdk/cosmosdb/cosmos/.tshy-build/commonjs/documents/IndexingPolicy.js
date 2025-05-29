"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorIndexType = exports.SpatialType = void 0;
/* The target data type of a spatial path */
var SpatialType;
(function (SpatialType) {
    SpatialType["LineString"] = "LineString";
    SpatialType["MultiPolygon"] = "MultiPolygon";
    SpatialType["Point"] = "Point";
    SpatialType["Polygon"] = "Polygon";
})(SpatialType || (exports.SpatialType = SpatialType = {}));
/**
 * Represents the index type of the vector.
 */
var VectorIndexType;
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
})(VectorIndexType || (exports.VectorIndexType = VectorIndexType = {}));
//# sourceMappingURL=IndexingPolicy.js.map