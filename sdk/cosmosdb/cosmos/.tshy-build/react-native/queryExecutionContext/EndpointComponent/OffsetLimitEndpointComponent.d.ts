import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
/** @hidden */
export declare class OffsetLimitEndpointComponent implements ExecutionContext {
    private executionContext;
    private offset;
    private limit;
    constructor(executionContext: ExecutionContext, offset: number, limit: number);
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
}
//# sourceMappingURL=OffsetLimitEndpointComponent.d.ts.map