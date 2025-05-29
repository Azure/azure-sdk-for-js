"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelQueryExecutionContext = void 0;
const parallelQueryExecutionContextBase_js_1 = require("./parallelQueryExecutionContextBase.js");
/**
 * Provides the ParallelQueryExecutionContext.
 * This class is capable of handling parallelized queries and derives from ParallelQueryExecutionContextBase.
 * @hidden
 */
class ParallelQueryExecutionContext extends parallelQueryExecutionContextBase_js_1.ParallelQueryExecutionContextBase {
    // Instance members are inherited
    // Overriding documentProducerComparator for ParallelQueryExecutionContexts
    /**
     * Provides a Comparator for document producers using the min value of the corresponding target partition.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1, docProd2) {
        return docProd1.generation - docProd2.generation;
    }
    /**
     * Fetches more results from the query execution context.
     * @param diagnosticNode - Optional diagnostic node for tracing.
     * @returns A promise that resolves to the fetched results.
     * @hidden
     */
    async fetchMore(diagnosticNode) {
        try {
            // Buffer document producers and fill buffer from the queue
            await this.bufferDocumentProducers(diagnosticNode);
            await this.fillBufferFromBufferQueue();
            // Drain buffered items
            return this.drainBufferedItems();
        }
        catch (error) {
            // Handle any errors that occur during fetching
            console.error("Error fetching more documents:", error);
            throw error;
        }
    }
}
exports.ParallelQueryExecutionContext = ParallelQueryExecutionContext;
//# sourceMappingURL=parallelQueryExecutionContext.js.map