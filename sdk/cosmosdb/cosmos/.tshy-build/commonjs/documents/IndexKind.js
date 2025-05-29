"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexKind = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Specifies the supported Index types.
 */
var IndexKind;
(function (IndexKind) {
    /**
     * This is supplied for a path which requires sorting.
     */
    IndexKind["Range"] = "Range";
    /**
     * This is supplied for a path which requires geospatial indexing.
     */
    IndexKind["Spatial"] = "Spatial";
})(IndexKind || (exports.IndexKind = IndexKind = {}));
//# sourceMappingURL=IndexKind.js.map