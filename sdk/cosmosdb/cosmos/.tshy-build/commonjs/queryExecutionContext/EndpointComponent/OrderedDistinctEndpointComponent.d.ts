import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare class OrderedDistinctEndpointComponent implements ExecutionContext {
    private executionContext;
    private hashedLastResult;
    constructor(executionContext: ExecutionContext);
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
}
//# sourceMappingURL=OrderedDistinctEndpointComponent.d.ts.map