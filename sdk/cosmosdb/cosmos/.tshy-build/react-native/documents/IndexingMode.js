// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Specifies the supported indexing modes.
 */
export var IndexingMode;
(function (IndexingMode) {
    /**
     * Index is updated synchronously with a create or update operation.
     *
     * With consistent indexing, query behavior is the same as the default consistency level for the container.
     * The index is always kept up to date with the data.
     */
    IndexingMode["consistent"] = "consistent";
    /**
     * Index is updated asynchronously with respect to a create or update operation.
     *
     * With lazy indexing, queries are eventually consistent. The index is updated when the container is idle.
     */
    IndexingMode["lazy"] = "lazy";
    /** No Index is provided. */
    IndexingMode["none"] = "none";
})(IndexingMode || (IndexingMode = {}));
//# sourceMappingURL=IndexingMode.js.map