import type { CosmosDiagnostics } from "./CosmosDiagnostics.js";
import type { CosmosHeaders } from "./queryExecutionContext/index.js";
/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
export declare class ChangeFeedResponse<T> {
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
    readonly diagnostics: CosmosDiagnostics;
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
     *
     * This is equivalent to the `etag` property.
     */
    get continuation(): string;
    /**
     * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
     */
    get sessionToken(): string;
    /**
     * Gets the entity tag associated with last transaction in the Azure Cosmos DB service,
     * which can be used as If-Non-Match Access condition for ReadFeed REST request or
     * `continuation` property of `ChangeFeedOptions` parameter for
     * `Items.changeFeed()`
     * to get feed changes since the transaction specified by this entity tag.
     *
     * This is equivalent to the `continuation` property.
     */
    get etag(): string;
    /**
     * Response headers of the response from Azure Cosmos DB
     */
    headers: CosmosHeaders;
}
//# sourceMappingURL=ChangeFeedResponse.d.ts.map