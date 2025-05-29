import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { QueryInfo } from "../../request/ErrorResponse.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare class GroupByValueEndpointComponent implements ExecutionContext {
    private executionContext;
    private queryInfo;
    private readonly aggregators;
    private readonly aggregateResultArray;
    private aggregateType;
    private completed;
    constructor(executionContext: ExecutionContext, queryInfo: QueryInfo);
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    private generateAggregateResponse;
}
//# sourceMappingURL=GroupByValueEndpointComponent.d.ts.map