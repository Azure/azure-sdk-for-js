// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { DiagnosticNodeInternal, DiagnosticNodeType, } from "./diagnostics/DiagnosticNodeInternal.js";
import { getPathFromLink, ResourceType, StatusCodes } from "./common/index.js";
import { DefaultQueryExecutionContext, getInitialHeader, mergeHeaders, PipelinedQueryExecutionContext, } from "./queryExecutionContext/index.js";
import { FeedResponse } from "./request/FeedResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics, withMetadataDiagnostics, } from "./utils/diagnostics.js";
import { MetadataLookUpType } from "./CosmosDiagnostics.js";
import { randomUUID } from "@azure/core-util";
import { HybridQueryExecutionContext } from "./queryExecutionContext/hybridQueryExecutionContext.js";
import { PartitionKeyRangeCache } from "./routing/index.js";
/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator {
    /**
     * @hidden
     */
    constructor(clientContext, query, options, fetchFunctions, resourceLink, resourceType) {
        this.clientContext = clientContext;
        this.query = query;
        this.options = options;
        this.fetchFunctions = fetchFunctions;
        this.resourceLink = resourceLink;
        this.resourceType = resourceType;
        this.query = query;
        this.fetchFunctions = fetchFunctions;
        this.options = options || {};
        this.resourceLink = resourceLink;
        this.fetchAllLastResHeaders = getInitialHeader();
        this.reset();
        this.isInitialized = false;
        this.partitionKeyRangeCache = new PartitionKeyRangeCache(this.clientContext);
    }
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
    getAsyncIterator() {
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            const diagnosticNode = new DiagnosticNodeInternal(this.clientContext.diagnosticLevel, DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
            yield __await(yield* __asyncDelegator(__asyncValues(this.getAsyncIteratorInternal(diagnosticNode))));
        });
    }
    /**
     * @internal
     */
    getAsyncIteratorInternal(diagnosticNode) {
        return __asyncGenerator(this, arguments, function* getAsyncIteratorInternal_1() {
            this.reset();
            this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
            while (this.queryExecutionContext.hasMoreResults()) {
                let response;
                try {
                    response = yield __await(this.queryExecutionContext.fetchMore(diagnosticNode));
                }
                catch (error) {
                    if (this.needsQueryPlan(error)) {
                        yield __await(this.createExecutionContext(diagnosticNode));
                        try {
                            response = yield __await(this.queryExecutionContext.fetchMore(diagnosticNode));
                        }
                        catch (queryError) {
                            this.handleSplitError(queryError);
                        }
                    }
                    else {
                        throw error;
                    }
                }
                const feedResponse = new FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults(), diagnosticNode.toDiagnostic(this.clientContext.getClientConfig()));
                diagnosticNode = new DiagnosticNodeInternal(this.clientContext.diagnosticLevel, DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
                if (response.result !== undefined) {
                    yield yield __await(feedResponse);
                }
            }
        });
    }
    /**
     * Determine if there are still remaining resources to process based on the value of the continuation token or the
     * elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the QueryIterator.
     */
    hasMoreResults() {
        return this.queryExecutionContext.hasMoreResults();
    }
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
    async fetchAll() {
        return withDiagnostics(async (diagnosticNode) => {
            return this.fetchAllInternal(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * @hidden
     */
    async fetchAllInternal(diagnosticNode) {
        this.reset();
        let response;
        try {
            response = await this.toArrayImplementation(diagnosticNode);
        }
        catch (error) {
            this.handleSplitError(error);
        }
        return response;
    }
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
    async fetchNext() {
        return withDiagnostics(async (diagnosticNode) => {
            return this.fetchNextInternal(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * @internal
     */
    async fetchNextInternal(diagnosticNode) {
        this.queryPlanPromise = withMetadataDiagnostics(async (metadataNode) => {
            return this.fetchQueryPlan(metadataNode);
        }, diagnosticNode, MetadataLookUpType.QueryPlanLookUp);
        if (!this.isInitialized) {
            await this.init(diagnosticNode);
        }
        let response;
        try {
            response = await this.queryExecutionContext.fetchMore(diagnosticNode);
        }
        catch (error) {
            if (this.needsQueryPlan(error)) {
                await this.createExecutionContext(diagnosticNode);
                try {
                    response = await this.queryExecutionContext.fetchMore(diagnosticNode);
                }
                catch (queryError) {
                    this.handleSplitError(queryError);
                }
            }
            else {
                throw error;
            }
        }
        return new FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults(), getEmptyCosmosDiagnostics());
    }
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
    reset() {
        this.correlatedActivityId = randomUUID();
        this.queryPlanPromise = undefined;
        this.fetchAllLastResHeaders = getInitialHeader();
        this.fetchAllTempResources = [];
        this.queryExecutionContext = new DefaultQueryExecutionContext(this.options, this.fetchFunctions, this.correlatedActivityId);
    }
    async toArrayImplementation(diagnosticNode) {
        this.queryPlanPromise = withMetadataDiagnostics(async (metadataNode) => {
            return this.fetchQueryPlan(metadataNode);
        }, diagnosticNode, MetadataLookUpType.QueryPlanLookUp);
        // this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
        if (!this.isInitialized) {
            await this.init(diagnosticNode);
        }
        while (this.queryExecutionContext.hasMoreResults()) {
            let response;
            try {
                response = await this.queryExecutionContext.fetchMore(diagnosticNode);
            }
            catch (error) {
                if (this.needsQueryPlan(error)) {
                    await this.createExecutionContext(diagnosticNode);
                    response = await this.queryExecutionContext.fetchMore(diagnosticNode);
                }
                else {
                    throw error;
                }
            }
            const { result, headers } = response;
            // concatenate the results and fetch more
            mergeHeaders(this.fetchAllLastResHeaders, headers);
            if (result) {
                this.fetchAllTempResources.push(...result);
            }
        }
        return new FeedResponse(this.fetchAllTempResources, this.fetchAllLastResHeaders, this.queryExecutionContext.hasMoreResults(), getEmptyCosmosDiagnostics());
    }
    async createExecutionContext(diagnosticNode) {
        const queryPlanResponse = await this.queryPlanPromise;
        // We always coerce queryPlanPromise to resolved. So if it errored, we need to manually inspect the resolved value
        if (queryPlanResponse instanceof Error) {
            throw queryPlanResponse;
        }
        const queryPlan = queryPlanResponse.result;
        if (queryPlan.hybridSearchQueryInfo && queryPlan.hybridSearchQueryInfo !== null) {
            await this.createHybridQueryExecutionContext(queryPlan, diagnosticNode);
        }
        else {
            await this.createPipelinedExecutionContext(queryPlan);
        }
    }
    async createHybridQueryExecutionContext(queryPlan, diagnosticNode) {
        const allPartitionKeyRanges = (await this.partitionKeyRangeCache.onCollectionRoutingMap(this.resourceLink, diagnosticNode)).getOrderedParitionKeyRanges();
        // convert allPartitionKeyRanges to QueryRanges
        const queryRanges = allPartitionKeyRanges.map((partitionKeyRange) => {
            return {
                min: partitionKeyRange.minInclusive,
                max: partitionKeyRange.maxExclusive,
                isMinInclusive: true,
                isMaxInclusive: false,
            };
        });
        this.queryExecutionContext = new HybridQueryExecutionContext(this.clientContext, this.resourceLink, this.options, queryPlan, this.correlatedActivityId, queryRanges);
    }
    async createPipelinedExecutionContext(queryPlan) {
        const queryInfo = queryPlan.queryInfo;
        if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
            throw new Error("Aggregate queries must use the VALUE keyword");
        }
        this.queryExecutionContext = new PipelinedQueryExecutionContext(this.clientContext, this.resourceLink, this.query, this.options, queryPlan, this.correlatedActivityId);
    }
    async fetchQueryPlan(diagnosticNode) {
        if (!this.queryPlanPromise && this.resourceType === ResourceType.item) {
            return this.clientContext
                .getQueryPlan(getPathFromLink(this.resourceLink) + "/docs", ResourceType.item, this.resourceLink, this.query, this.options, diagnosticNode, this.correlatedActivityId)
                .catch((error) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
        }
        return this.queryPlanPromise;
    }
    needsQueryPlan(error) {
        var _a;
        if (((_a = error.body) === null || _a === void 0 ? void 0 : _a.additionalErrorInfo) ||
            error.message.includes("Cross partition query only supports")) {
            return error.code === StatusCodes.BadRequest && this.resourceType === ResourceType.item;
        }
        else {
            throw error;
        }
    }
    /**
     * @internal
     */
    async init(diagnosticNode) {
        if (this.isInitialized === true) {
            return;
        }
        if (this.initPromise === undefined) {
            this.initPromise = this._init(diagnosticNode);
        }
        return this.initPromise;
    }
    async _init(diagnosticNode) {
        if (this.options.forceQueryPlan === true && this.resourceType === ResourceType.item) {
            await this.createExecutionContext(diagnosticNode);
        }
        this.isInitialized = true;
    }
    handleSplitError(err) {
        if (err.code === 410) {
            const error = new Error("Encountered partition split and could not recover. This request is retryable");
            error.code = 503;
            error.originalError = err;
            throw error;
        }
        else {
            throw err;
        }
    }
}
//# sourceMappingURL=queryIterator.js.map