import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { QueryInfo } from "../../request/ErrorResponse.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare class GroupByEndpointComponent implements ExecutionContext {
    private executionContext;
    private queryInfo;
    constructor(executionContext: ExecutionContext, queryInfo: QueryInfo);
    private readonly groupings;
    private readonly aggregateResultArray;
    private completed;
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    private consolidateGroupResults;
}
//# sourceMappingURL=GroupByEndpointComponent.d.ts.map