import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import { Response } from "../request/index.js";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/**
 * Provides the ParallelQueryExecutionContext.
 * This class is capable of handling parallelized queries and derives from ParallelQueryExecutionContextBase.
 * @hidden
 */
export declare class ParallelQueryExecutionContext extends ParallelQueryExecutionContextBase implements ExecutionContext {
    /**
     * Provides a Comparator for document producers using the min value of the corresponding target partition.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer): number;
    /**
     * Fetches more results from the query execution context.
     * @param diagnosticNode - Optional diagnostic node for tracing.
     * @returns A promise that resolves to the fetched results.
     * @hidden
     */
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
}
//# sourceMappingURL=parallelQueryExecutionContext.d.ts.map