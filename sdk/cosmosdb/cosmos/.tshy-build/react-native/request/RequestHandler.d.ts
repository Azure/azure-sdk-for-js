import type { RequestContext } from "./RequestContext.js";
import type { Response as CosmosResponse } from "./Response.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/**
 * @hidden
 */
declare function request<T>(requestContext: RequestContext, diagnosticNode: DiagnosticNodeInternal): Promise<CosmosResponse<T>>;
export declare const RequestHandler: {
    request: typeof request;
};
export {};
//# sourceMappingURL=RequestHandler.d.ts.map