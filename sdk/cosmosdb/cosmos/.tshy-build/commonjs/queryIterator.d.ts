import type { ClientContext } from "./ClientContext.js";
import { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
import { ResourceType } from "./common/index.js";
import type { FetchFunctionCallback, SqlQuerySpec } from "./queryExecutionContext/index.js";
import type { FeedOptions } from "./request/FeedOptions.js";
import { FeedResponse } from "./request/FeedResponse.js";
/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export declare class QueryIterator<T> {
    private clientContext;
    private query;
    private options;
    private fetchFunctions;
    private resourceLink?;
    private resourceType?;
    private fetchAllTempResources;
    private fetchAllLastResHeaders;
    private queryExecutionContext;
    private queryPlanPromise;
    private isInitialized;
    private correlatedActivityId;
    private partitionKeyRangeCache;
    /**
     * @hidden
     */
    constructor(clientContext: ClientContext, query: SqlQuerySpec | string, options: FeedOptions, fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[], resourceLink?: string, resourceType?: ResourceType);
    /**
     * Gets an async iterator that will yield results until completion.
     *
     * NOTE: AsyncIterators are a very new feature and you might need to
     * use polyfils/etc. in order to use them in your code.
     *
     * If you're using TypeScript, you can use the following polyfill as long
     * as you target ES6 or higher and are running on Node 6 or higher.
     *
     * ```ts snippet:ignore
     * if (!Symbol || !Symbol.asyncIterator) {
     *   (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
     * }
     * ```
     *
     * @example Iterate over all databases
     * ```ts snippet:QueryIteratorIterateDatabases
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * for await (const { resources: db } of client.databases.readAll().getAsyncIterator()) {
     *   console.log(`Got ${db} from AsyncIterator`);
     * }
     * ```
     */
    getAsyncIterator(): AsyncIterable<FeedResponse<T>>;
    /**
     * Determine if there are still remaining resources to process based on the value of the continuation token or the
     * elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the QueryIterator.
     */
    hasMoreResults(): boolean;
    /**
     * Fetch all pages for the query and return a single FeedResponse.
     * @example
     * ```ts snippet:ReadmeSampleQueryDatabase
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resources } = await container.items
     *   .query("SELECT * from c WHERE c.isCapitol = true")
     *   .fetchAll();
     * ```
     */
    fetchAll(): Promise<FeedResponse<T>>;
    /**
     * @hidden
     */
    fetchAllInternal(diagnosticNode: DiagnosticNodeInternal): Promise<FeedResponse<T>>;
    /**
     * Retrieve the next batch from the feed.
     *
     * This may or may not fetch more pages from the backend depending on your settings
     * and the type of query. Aggregate queries will generally fetch all backend pages
     * before returning the first batch of responses.
     *
     * @example
     * ```ts snippet:ReadmeSampleNonStreamableCrossPartitionQuery
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec = {
     *   query: "SELECT c.status, COUNT(c.id) AS count FROM c GROUP BY c.status",
     * };
     * const queryOptions = {
     *   maxItemCount: 10, // maximum number of items to return per page
     *   enableCrossPartitionQuery: true,
     * };
     * const queryIterator = container.items.query(querySpec, queryOptions);
     * while (queryIterator.hasMoreResults()) {
     *   const { resources: result } = await queryIterator.fetchNext();
     *   // process results
     * }
     * ```
     */
    fetchNext(): Promise<FeedResponse<T>>;
    /**
     * Reset the QueryIterator to the beginning and clear all the resources inside it
     * @example
     * ```ts snippet:QueryIteratorReset
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec = {
     *   query: "SELECT c.status, COUNT(c.id) AS count FROM c GROUP BY c.status",
     * };
     * const queryIterator = container.items.query(querySpec);
     * while (queryIterator.hasMoreResults()) {
     *   const { resources: result } = await queryIterator.fetchNext();
     *   // process results
     * }
     * queryIterator.reset();
     * ```
     *
     */
    reset(): void;
    private toArrayImplementation;
    private createExecutionContext;
    private createHybridQueryExecutionContext;
    private createPipelinedExecutionContext;
    private fetchQueryPlan;
    private needsQueryPlan;
    private initPromise;
    private _init;
    private handleSplitError;
}
//# sourceMappingURL=queryIterator.d.ts.map