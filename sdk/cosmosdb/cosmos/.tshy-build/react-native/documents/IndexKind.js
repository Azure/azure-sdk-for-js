// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Specifies the supported Index types.
 */
export var IndexKind;
(function (IndexKind) {
    /**
     * This is supplied for a path which requires sorting.
     */
    IndexKind["Range"] = "Range";
    /**
     * This is supplied for a path which requires geospatial indexing.
     */
    IndexKind["Spatial"] = "Spatial";
})(IndexKind || (IndexKind = {}));
//# sourceMappingURL=IndexKind.js.map