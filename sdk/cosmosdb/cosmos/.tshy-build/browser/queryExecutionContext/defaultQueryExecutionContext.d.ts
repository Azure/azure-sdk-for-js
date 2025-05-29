import type { FeedOptions, Response } from "../request/index.js";
import type { ExecutionContext } from "./index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export type FetchFunctionCallback = (diagnosticNode: DiagnosticNodeInternal, options: FeedOptions, correlatedActivityId: string) => Promise<Response<any>>;
/** @hidden */
export declare class DefaultQueryExecutionContext implements ExecutionContext {
    private static readonly STATES;
    private resources;
    private currentIndex;
    private currentPartitionIndex;
    private fetchFunctions;
    private options;
    continuationToken: string;
    get continuation(): string;
    private state;
    private nextFetchFunction;
    private correlatedActivityId;
    /**
     * Provides the basic Query Execution Context.
     * This wraps the internal logic query execution using provided fetch functions
     *
     * @param clientContext  - Is used to read the partitionKeyRanges for split proofing
     * @param query          - A SQL query.
     * @param options        - Represents the feed options.
     * @param fetchFunctions - A function to retrieve each page of data.
     *                          An array of functions may be used to query more than one partition.
     * @hidden
     */
    constructor(options: FeedOptions, fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[], correlatedActivityId: string);
    /**
     * Execute a provided callback on the next element in the execution context.
     */
    nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    /**
     * Retrieve the current element on the execution context.
     */
    current(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    /**
     * Determine if there are still remaining resources to processs based on
     * the value of the continuation token or the elements remaining on the current batch in the execution context.
     *
     * @returns true if there is other elements to process in the DefaultQueryExecutionContext.
     */
    hasMoreResults(): boolean;
    /**
     * Fetches the next batch of the feed and pass them as an array to a callback
     */
    fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    private _canFetchMore;
}
//# sourceMappingURL=defaultQueryExecutionContext.d.ts.map