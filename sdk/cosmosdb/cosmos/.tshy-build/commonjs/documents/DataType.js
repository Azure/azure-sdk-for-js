"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** Defines a target data type of an index path specification in the Azure Cosmos DB service. */
var DataType;
(function (DataType) {
    /** Represents a numeric data type. */
    DataType["Number"] = "Number";
    /** Represents a string data type. */
    DataType["String"] = "String";
    /** Represents a point data type. */
    DataType["Point"] = "Point";
    /** Represents a line string data type. */
    DataType["LineString"] = "LineString";
    /** Represents a polygon data type. */
    DataType["Polygon"] = "Polygon";
    /** Represents a multi-polygon data type. */
    DataType["MultiPolygon"] = "MultiPolygon";
})(DataType || (exports.DataType = DataType = {}));
//# sourceMappingURL=DataType.js.map