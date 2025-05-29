import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
export declare class ChangeFeedIteratorResponse<T> {
    /**
     * Gets the items returned in the response from Azure Cosmos DB
     */
    readonly result: T;
    /**
     * Gets the number of items returned in the response from Azure Cosmos DB
     */
    readonly count: number;
    /**
     * Gets the status code of the response from Azure Cosmos DB
     */
    readonly statusCode: number;
    /**
     * Cosmos Diagnostic Object.
     */
    readonly diagnostics: CosmosDiagnostics;
    /**
     * Gets the subStatusCodes of the response from Azure Cosmos DB. Useful in partition split or partition gone.
     */
    readonly subStatusCode?: number;
    /**
     * Gets the request charge for this request from the Azure Cosmos DB service.
     */
    get requestCharge(): number;
    /**
     * Gets the activity ID for the request from the Azure Cosmos DB service.
     */
    get activityId(): string;
    /**
     * Gets the continuation token to be used for continuing enumeration of the Azure Cosmos DB service.
     */
    get continuationToken(): string;
    /**
     * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
     */
    get sessionToken(): string;
    /**
     * Response headers of the response from Azure Cosmos DB
     */
    headers: CosmosHeaders;
}
//# sourceMappingURL=ChangeFeedIteratorResponse.d.ts.map