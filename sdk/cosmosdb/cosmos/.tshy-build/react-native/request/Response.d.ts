import type { CosmosDiagnostics, CosmosHeaders } from "../index.js";
/**
 * @hidden
 */
export interface Response<T> {
    headers: CosmosHeaders;
    result?: T;
    code?: number;
    substatus?: number;
    diagnostics?: CosmosDiagnostics;
}
//# sourceMappingURL=Response.d.ts.map