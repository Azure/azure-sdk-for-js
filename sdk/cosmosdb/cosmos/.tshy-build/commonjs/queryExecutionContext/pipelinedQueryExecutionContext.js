"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinedQueryExecutionContext = void 0;
const ErrorResponse_js_1 = require("../request/ErrorResponse.js");
const OffsetLimitEndpointComponent_js_1 = require("./EndpointComponent/OffsetLimitEndpointComponent.js");
const OrderByEndpointComponent_js_1 = require("./EndpointComponent/OrderByEndpointComponent.js");
const OrderedDistinctEndpointComponent_js_1 = require("./EndpointComponent/OrderedDistinctEndpointComponent.js");
const UnorderedDistinctEndpointComponent_js_1 = require("./EndpointComponent/UnorderedDistinctEndpointComponent.js");
const GroupByEndpointComponent_js_1 = require("./EndpointComponent/GroupByEndpointComponent.js");
const headerUtils_js_1 = require("./headerUtils.js");
const orderByQueryExecutionContext_js_1 = require("./orderByQueryExecutionContext.js");
const parallelQueryExecutionContext_js_1 = require("./parallelQueryExecutionContext.js");
const GroupByValueEndpointComponent_js_1 = require("./EndpointComponent/GroupByValueEndpointComponent.js");
const NonStreamingOrderByDistinctEndpointComponent_js_1 = require("./EndpointComponent/NonStreamingOrderByDistinctEndpointComponent.js");
const NonStreamingOrderByEndpointComponent_js_1 = require("./EndpointComponent/NonStreamingOrderByEndpointComponent.js");
/** @hidden */
class PipelinedQueryExecutionContext {
    constructor(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo, correlatedActivityId, emitRawOrderByPayload = false) {
        this.clientContext = clientContext;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.emitRawOrderByPayload = emitRawOrderByPayload;
        this.vectorSearchBufferSize = 0;
        this.nonStreamingOrderBy = false;
        this.endpoint = null;
        this.pageSize = options["maxItemCount"];
        if (this.pageSize === undefined) {
            this.pageSize = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
        }
        // Pick between Nonstreaming and streaming endpoints
        this.nonStreamingOrderBy = partitionedQueryExecutionInfo.queryInfo.hasNonStreamingOrderBy;
        // Pick between parallel vs order by execution context
        const sortOrders = partitionedQueryExecutionInfo.queryInfo.orderBy;
        // TODO: Currently we don't get any field from backend to determine streaming queries
        if (this.nonStreamingOrderBy) {
            if (!options.allowUnboundedNonStreamingQueries) {
                this.checkQueryConstraints(partitionedQueryExecutionInfo.queryInfo);
            }
            this.vectorSearchBufferSize = this.calculateVectorSearchBufferSize(partitionedQueryExecutionInfo.queryInfo, options);
            const maxBufferSize = options["vectorSearchBufferSize"]
                ? options["vectorSearchBufferSize"]
                : PipelinedQueryExecutionContext.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;
            if (this.vectorSearchBufferSize > maxBufferSize) {
                throw new ErrorResponse_js_1.ErrorResponse(`Executing a vector search query with TOP or OFFSET + LIMIT value ${this.vectorSearchBufferSize} larger than the vectorSearchBufferSize ${maxBufferSize} ` +
                    `is not allowed`);
            }
            const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
            const context = new parallelQueryExecutionContext_js_1.ParallelQueryExecutionContext(this.clientContext, this.collectionLink, this.query, this.options, this.partitionedQueryExecutionInfo, correlatedActivityId);
            if (distinctType === "None") {
                this.endpoint = new NonStreamingOrderByEndpointComponent_js_1.NonStreamingOrderByEndpointComponent(context, sortOrders, this.vectorSearchBufferSize, partitionedQueryExecutionInfo.queryInfo.offset, this.emitRawOrderByPayload);
            }
            else {
                this.endpoint = new NonStreamingOrderByDistinctEndpointComponent_js_1.NonStreamingOrderByDistinctEndpointComponent(context, partitionedQueryExecutionInfo.queryInfo, this.vectorSearchBufferSize, this.emitRawOrderByPayload);
            }
        }
        else {
            if (Array.isArray(sortOrders) && sortOrders.length > 0) {
                // Need to wrap orderby execution context in endpoint component, since the data is nested as a \
                //      "payload" property.
                this.endpoint = new OrderByEndpointComponent_js_1.OrderByEndpointComponent(new orderByQueryExecutionContext_js_1.OrderByQueryExecutionContext(this.clientContext, this.collectionLink, this.query, this.options, this.partitionedQueryExecutionInfo, correlatedActivityId), this.emitRawOrderByPayload);
            }
            else {
                this.endpoint = new parallelQueryExecutionContext_js_1.ParallelQueryExecutionContext(this.clientContext, this.collectionLink, this.query, this.options, this.partitionedQueryExecutionInfo, correlatedActivityId);
            }
            if (Object.keys(partitionedQueryExecutionInfo.queryInfo.groupByAliasToAggregateType).length >
                0 ||
                partitionedQueryExecutionInfo.queryInfo.aggregates.length > 0 ||
                partitionedQueryExecutionInfo.queryInfo.groupByExpressions.length > 0) {
                if (partitionedQueryExecutionInfo.queryInfo.hasSelectValue) {
                    this.endpoint = new GroupByValueEndpointComponent_js_1.GroupByValueEndpointComponent(this.endpoint, partitionedQueryExecutionInfo.queryInfo);
                }
                else {
                    this.endpoint = new GroupByEndpointComponent_js_1.GroupByEndpointComponent(this.endpoint, partitionedQueryExecutionInfo.queryInfo);
                }
            }
            // If distinct then add that to the pipeline
            const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
            if (distinctType === "Ordered") {
                this.endpoint = new OrderedDistinctEndpointComponent_js_1.OrderedDistinctEndpointComponent(this.endpoint);
            }
            if (distinctType === "Unordered") {
                this.endpoint = new UnorderedDistinctEndpointComponent_js_1.UnorderedDistinctEndpointComponent(this.endpoint);
            }
            // If top then add that to the pipeline. TOP N is effectively OFFSET 0 LIMIT N
            const top = partitionedQueryExecutionInfo.queryInfo.top;
            if (typeof top === "number") {
                this.endpoint = new OffsetLimitEndpointComponent_js_1.OffsetLimitEndpointComponent(this.endpoint, 0, top);
            }
            // If offset+limit then add that to the pipeline
            const limit = partitionedQueryExecutionInfo.queryInfo.limit;
            const offset = partitionedQueryExecutionInfo.queryInfo.offset;
            if (typeof limit === "number" && typeof offset === "number") {
                this.endpoint = new OffsetLimitEndpointComponent_js_1.OffsetLimitEndpointComponent(this.endpoint, offset, limit);
            }
        }
        this.fetchBuffer = [];
    }
    hasMoreResults() {
        return this.fetchBuffer.length !== 0 || this.endpoint.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        this.fetchMoreRespHeaders = (0, headerUtils_js_1.getInitialHeader)();
        return this._fetchMoreImplementation(diagnosticNode);
    }
    async _fetchMoreImplementation(diagnosticNode) {
        try {
            if (this.fetchBuffer.length >= this.pageSize) {
                const temp = this.fetchBuffer.slice(0, this.pageSize);
                this.fetchBuffer = this.fetchBuffer.slice(this.pageSize);
                return { result: temp, headers: this.fetchMoreRespHeaders };
            }
            else {
                const response = await this.endpoint.fetchMore(diagnosticNode);
                (0, headerUtils_js_1.mergeHeaders)(this.fetchMoreRespHeaders, response.headers);
                if (response === undefined || response.result === undefined) {
                    if (this.fetchBuffer.length > 0) {
                        const temp = this.fetchBuffer;
                        this.fetchBuffer = [];
                        return { result: temp, headers: this.fetchMoreRespHeaders };
                    }
                    else {
                        return { result: undefined, headers: this.fetchMoreRespHeaders };
                    }
                }
                this.fetchBuffer.push(...response.result);
                if (this.options.enableQueryControl) {
                    if (this.fetchBuffer.length >= this.pageSize) {
                        const temp = this.fetchBuffer.slice(0, this.pageSize);
                        this.fetchBuffer = this.fetchBuffer.slice(this.pageSize);
                        return { result: temp, headers: this.fetchMoreRespHeaders };
                    }
                    else {
                        const temp = this.fetchBuffer;
                        this.fetchBuffer = [];
                        return { result: temp, headers: this.fetchMoreRespHeaders };
                    }
                }
                // Recursively fetch more results to ensure the pageSize number of results are returned
                // to maintain compatibility with the previous implementation
                return this._fetchMoreImplementation(diagnosticNode);
            }
        }
        catch (err) {
            (0, headerUtils_js_1.mergeHeaders)(this.fetchMoreRespHeaders, err.headers);
            err.headers = this.fetchMoreRespHeaders;
            if (err) {
                throw err;
            }
        }
    }
    calculateVectorSearchBufferSize(queryInfo, options) {
        if (queryInfo.top === 0 || queryInfo.limit === 0)
            return 0;
        return queryInfo.top
            ? queryInfo.top
            : queryInfo.limit
                ? queryInfo.offset + queryInfo.limit
                : options["vectorSearchBufferSize"] && options["vectorSearchBufferSize"] > 0
                    ? options["vectorSearchBufferSize"]
                    : PipelinedQueryExecutionContext.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;
    }
    checkQueryConstraints(queryInfo) {
        const hasTop = queryInfo.top || queryInfo.top === 0;
        const hasLimit = queryInfo.limit || queryInfo.limit === 0;
        if (!hasTop && !hasLimit) {
            throw new ErrorResponse_js_1.ErrorResponse("Executing a non-streaming search query without TOP or LIMIT can consume a large number of RUs " +
                "very fast and have long runtimes. Please ensure you are using one of the above two filters " +
                "with your vector search query.");
        }
        return;
    }
}
exports.PipelinedQueryExecutionContext = PipelinedQueryExecutionContext;
PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE = 10;
PipelinedQueryExecutionContext.DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE = 50000;
//# sourceMappingURL=pipelinedQueryExecutionContext.js.map