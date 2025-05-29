"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryIterator = void 0;
const tslib_1 = require("tslib");
const DiagnosticNodeInternal_js_1 = require("./diagnostics/DiagnosticNodeInternal.js");
const index_js_1 = require("./common/index.js");
const index_js_2 = require("./queryExecutionContext/index.js");
const FeedResponse_js_1 = require("./request/FeedResponse.js");
const diagnostics_js_1 = require("./utils/diagnostics.js");
const CosmosDiagnostics_js_1 = require("./CosmosDiagnostics.js");
const core_util_1 = require("@azure/core-util");
const hybridQueryExecutionContext_js_1 = require("./queryExecutionContext/hybridQueryExecutionContext.js");
const index_js_3 = require("./routing/index.js");
/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
class QueryIterator {
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
        this.fetchAllLastResHeaders = (0, index_js_2.getInitialHeader)();
        this.reset();
        this.isInitialized = false;
        this.partitionKeyRangeCache = new index_js_3.PartitionKeyRangeCache(this.clientContext);
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
        return tslib_1.__asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            const diagnosticNode = new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(this.clientContext.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
            yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(this.getAsyncIteratorInternal(diagnosticNode))));
        });
    }
    /**
     * @internal
     */
    getAsyncIteratorInternal(diagnosticNode) {
        return tslib_1.__asyncGenerator(this, arguments, function* getAsyncIteratorInternal_1() {
            this.reset();
            this.queryPlanPromise = this.fetchQueryPlan(diagnosticNode);
            while (this.queryExecutionContext.hasMoreResults()) {
                let response;
                try {
                    response = yield tslib_1.__await(this.queryExecutionContext.fetchMore(diagnosticNode));
                }
                catch (error) {
                    if (this.needsQueryPlan(error)) {
                        yield tslib_1.__await(this.createExecutionContext(diagnosticNode));
                        try {
                            response = yield tslib_1.__await(this.queryExecutionContext.fetchMore(diagnosticNode));
                        }
                        catch (queryError) {
                            this.handleSplitError(queryError);
                        }
                    }
                    else {
                        throw error;
                    }
                }
                const feedResponse = new FeedResponse_js_1.FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults(), diagnosticNode.toDiagnostic(this.clientContext.getClientConfig()));
                diagnosticNode = new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(this.clientContext.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
                if (response.result !== undefined) {
                    yield yield tslib_1.__await(feedResponse);
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
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
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
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            return this.fetchNextInternal(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * @internal
     */
    async fetchNextInternal(diagnosticNode) {
        this.queryPlanPromise = (0, diagnostics_js_1.withMetadataDiagnostics)(async (metadataNode) => {
            return this.fetchQueryPlan(metadataNode);
        }, diagnosticNode, CosmosDiagnostics_js_1.MetadataLookUpType.QueryPlanLookUp);
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
        return new FeedResponse_js_1.FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults(), (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
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
        this.correlatedActivityId = (0, core_util_1.randomUUID)();
        this.queryPlanPromise = undefined;
        this.fetchAllLastResHeaders = (0, index_js_2.getInitialHeader)();
        this.fetchAllTempResources = [];
        this.queryExecutionContext = new index_js_2.DefaultQueryExecutionContext(this.options, this.fetchFunctions, this.correlatedActivityId);
    }
    async toArrayImplementation(diagnosticNode) {
        this.queryPlanPromise = (0, diagnostics_js_1.withMetadataDiagnostics)(async (metadataNode) => {
            return this.fetchQueryPlan(metadataNode);
        }, diagnosticNode, CosmosDiagnostics_js_1.MetadataLookUpType.QueryPlanLookUp);
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
            (0, index_js_2.mergeHeaders)(this.fetchAllLastResHeaders, headers);
            if (result) {
                this.fetchAllTempResources.push(...result);
            }
        }
        return new FeedResponse_js_1.FeedResponse(this.fetchAllTempResources, this.fetchAllLastResHeaders, this.queryExecutionContext.hasMoreResults(), (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
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
        this.queryExecutionContext = new hybridQueryExecutionContext_js_1.HybridQueryExecutionContext(this.clientContext, this.resourceLink, this.options, queryPlan, this.correlatedActivityId, queryRanges);
    }
    async createPipelinedExecutionContext(queryPlan) {
        const queryInfo = queryPlan.queryInfo;
        if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
            throw new Error("Aggregate queries must use the VALUE keyword");
        }
        this.queryExecutionContext = new index_js_2.PipelinedQueryExecutionContext(this.clientContext, this.resourceLink, this.query, this.options, queryPlan, this.correlatedActivityId);
    }
    async fetchQueryPlan(diagnosticNode) {
        if (!this.queryPlanPromise && this.resourceType === index_js_1.ResourceType.item) {
            return this.clientContext
                .getQueryPlan((0, index_js_1.getPathFromLink)(this.resourceLink) + "/docs", index_js_1.ResourceType.item, this.resourceLink, this.query, this.options, diagnosticNode, this.correlatedActivityId)
                .catch((error) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
        }
        return this.queryPlanPromise;
    }
    needsQueryPlan(error) {
        var _a;
        if (((_a = error.body) === null || _a === void 0 ? void 0 : _a.additionalErrorInfo) ||
            error.message.includes("Cross partition query only supports")) {
            return error.code === index_js_1.StatusCodes.BadRequest && this.resourceType === index_js_1.ResourceType.item;
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
        if (this.options.forceQueryPlan === true && this.resourceType === index_js_1.ResourceType.item) {
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
exports.QueryIterator = QueryIterator;
//# sourceMappingURL=queryIterator.js.map