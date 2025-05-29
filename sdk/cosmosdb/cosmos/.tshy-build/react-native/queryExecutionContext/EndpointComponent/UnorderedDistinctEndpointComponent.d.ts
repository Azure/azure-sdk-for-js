import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare class UnorderedDistinctEndpointComponent implements ExecutionContext {
    private executionContext;
    private hashedResults;
    constructor(executionContext: ExecutionContext);
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
}
//# sourceMappingURL=UnorderedDistinctEndpointComponent.d.ts.map