import type { CosmosHeaders } from "../queryExecutionContext/headerUtils.js";
import type { CosmosDiagnostics } from "../CosmosDiagnostics.js";
export declare class FeedResponse<TResource> {
    readonly resources: TResource[];
    private readonly headers;
    readonly hasMoreResults: boolean;
    readonly diagnostics: CosmosDiagnostics;
    constructor(resources: TResource[], headers: CosmosHeaders, hasMoreResults: boolean, diagnostics: CosmosDiagnostics);
    get continuation(): string;
    get continuationToken(): string;
    get queryMetrics(): string;
    get requestCharge(): number;
    get activityId(): string;
    get correlatedActivityId(): string;
    get indexMetrics(): string;
}
//# sourceMappingURL=FeedResponse.d.ts.map