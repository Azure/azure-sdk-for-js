"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridQueryExecutionContext = exports.HybridQueryExecutionContextBaseStates = void 0;
const logger_1 = require("@azure/logger");
const hybridSearchQueryResult_js_1 = require("../request/hybridSearchQueryResult.js");
const GlobalStatisticsAggregator_js_1 = require("./Aggregators/GlobalStatisticsAggregator.js");
const headerUtils_js_1 = require("./headerUtils.js");
const parallelQueryExecutionContext_js_1 = require("./parallelQueryExecutionContext.js");
const pipelinedQueryExecutionContext_js_1 = require("./pipelinedQueryExecutionContext.js");
/** @hidden */
var HybridQueryExecutionContextBaseStates;
(function (HybridQueryExecutionContextBaseStates) {
    HybridQueryExecutionContextBaseStates["uninitialized"] = "uninitialized";
    HybridQueryExecutionContextBaseStates["initialized"] = "initialized";
    HybridQueryExecutionContextBaseStates["draining"] = "draining";
    HybridQueryExecutionContextBaseStates["done"] = "done";
})(HybridQueryExecutionContextBaseStates || (exports.HybridQueryExecutionContextBaseStates = HybridQueryExecutionContextBaseStates = {}));
class HybridQueryExecutionContext {
    constructor(clientContext, collectionLink, options, partitionedQueryExecutionInfo, correlatedActivityId, allPartitionsRanges) {
        this.clientContext = clientContext;
        this.collectionLink = collectionLink;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.correlatedActivityId = correlatedActivityId;
        this.allPartitionsRanges = allPartitionsRanges;
        this.componentsExecutionContext = [];
        this.emitRawOrderByPayload = true;
        this.buffer = [];
        this.DEFAULT_PAGE_SIZE = 10;
        this.TOTAL_WORD_COUNT_PLACEHOLDER = "documentdb-formattablehybridsearchquery-totalwordcount";
        this.HIT_COUNTS_ARRAY_PLACEHOLDER = "documentdb-formattablehybridsearchquery-hitcountsarray";
        this.TOTAL_DOCUMENT_COUNT_PLACEHOLDER = "documentdb-formattablehybridsearchquery-totaldocumentcount";
        this.RRF_CONSTANT = 60; // Constant for RRF score calculation
        this.logger = (0, logger_1.createClientLogger)("HybridQueryExecutionContext");
        this.hybridSearchResult = [];
        this.uniqueItems = new Map();
        this.isSingleComponent = false;
        this.computeRRFScore = (ranks, k, componentWeights) => {
            if (ranks.length !== componentWeights.length) {
                throw new Error("Ranks and component weights length mismatch");
            }
            let rrfScore = 0;
            for (let i = 0; i < ranks.length; i++) {
                const rank = ranks[i];
                const weight = componentWeights[i].weight;
                rrfScore += weight * (1 / (k + rank));
            }
            return rrfScore;
        };
        this.state = HybridQueryExecutionContextBaseStates.uninitialized;
        this.pageSize = this.options.maxItemCount;
        if (this.pageSize === undefined) {
            this.pageSize = this.DEFAULT_PAGE_SIZE;
        }
        if (partitionedQueryExecutionInfo.hybridSearchQueryInfo.requiresGlobalStatistics) {
            const globalStaticsQueryOptions = { maxItemCount: this.pageSize };
            this.globalStatisticsAggregator = new GlobalStatisticsAggregator_js_1.GlobalStatisticsAggregator();
            const globalStatisticsQuery = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.globalStatisticsQuery;
            const globalStatisticsQueryExecutionInfo = {
                partitionedQueryExecutionInfoVersion: 1,
                queryInfo: {
                    distinctType: "None",
                    hasSelectValue: false,
                    groupByAliasToAggregateType: {},
                    rewrittenQuery: globalStatisticsQuery,
                    hasNonStreamingOrderBy: false,
                },
                queryRanges: this.allPartitionsRanges,
            };
            this.globalStatisticsExecutionContext = new parallelQueryExecutionContext_js_1.ParallelQueryExecutionContext(this.clientContext, this.collectionLink, globalStatisticsQuery, globalStaticsQueryOptions, globalStatisticsQueryExecutionInfo, this.correlatedActivityId);
        }
        else {
            this.createComponentExecutionContexts();
            this.state = HybridQueryExecutionContextBaseStates.initialized;
        }
    }
    async nextItem(diagnosticNode) {
        const nextItemRespHeaders = (0, headerUtils_js_1.getInitialHeader)();
        while ((this.state === HybridQueryExecutionContextBaseStates.uninitialized ||
            this.state === HybridQueryExecutionContextBaseStates.initialized) &&
            this.buffer.length === 0) {
            await this.fetchMoreInternal(diagnosticNode, nextItemRespHeaders);
        }
        if (this.state === HybridQueryExecutionContextBaseStates.draining && this.buffer.length > 0) {
            return this.drainOne(nextItemRespHeaders);
        }
        else {
            return this.done(nextItemRespHeaders);
        }
    }
    hasMoreResults() {
        switch (this.state) {
            case HybridQueryExecutionContextBaseStates.uninitialized:
                return true;
            case HybridQueryExecutionContextBaseStates.initialized:
                return true;
            case HybridQueryExecutionContextBaseStates.draining:
                return this.buffer.length > 0;
            case HybridQueryExecutionContextBaseStates.done:
                return false;
            default:
                return false;
        }
    }
    async fetchMore(diagnosticNode) {
        const fetchMoreRespHeaders = (0, headerUtils_js_1.getInitialHeader)();
        return this.fetchMoreInternal(diagnosticNode, fetchMoreRespHeaders);
    }
    async fetchMoreInternal(diagnosticNode, headers) {
        switch (this.state) {
            case HybridQueryExecutionContextBaseStates.uninitialized:
                await this.initialize(diagnosticNode, headers);
                return {
                    result: [],
                    headers: headers,
                };
            case HybridQueryExecutionContextBaseStates.initialized:
                await this.executeComponentQueries(diagnosticNode, headers);
                return {
                    result: [],
                    headers: headers,
                };
            case HybridQueryExecutionContextBaseStates.draining:
                return this.drain(headers);
            case HybridQueryExecutionContextBaseStates.done:
                return this.done(headers);
            default:
                throw new Error(`Invalid state: ${this.state}`);
        }
    }
    async initialize(diagnosticNode, fetchMoreRespHeaders) {
        try {
            while (this.globalStatisticsExecutionContext.hasMoreResults()) {
                const result = await this.globalStatisticsExecutionContext.fetchMore(diagnosticNode);
                (0, headerUtils_js_1.mergeHeaders)(fetchMoreRespHeaders, result.headers);
                if (result && result.result) {
                    for (const item of result.result) {
                        const globalStatistics = item;
                        if (globalStatistics) {
                            // iterate over the components update placeholders from globalStatistics
                            this.globalStatisticsAggregator.aggregate(globalStatistics);
                        }
                    }
                }
            }
        }
        catch (error) {
            this.state = HybridQueryExecutionContextBaseStates.done;
            throw error;
        }
        // create component execution contexts for each component query
        this.createComponentExecutionContexts();
        this.state = HybridQueryExecutionContextBaseStates.initialized;
    }
    async executeComponentQueries(diagnosticNode, fetchMoreRespHeaders) {
        if (this.isSingleComponent) {
            await this.drainSingleComponent(diagnosticNode, fetchMoreRespHeaders);
            return;
        }
        try {
            if (this.options.enableQueryControl) {
                // track componentExecutionContexts with remaining results and call them in LIFO order
                if (this.componentsExecutionContext.length > 0) {
                    const componentExecutionContext = this.componentsExecutionContext.pop();
                    if (componentExecutionContext.hasMoreResults()) {
                        const result = await componentExecutionContext.fetchMore(diagnosticNode);
                        const response = result.result;
                        (0, headerUtils_js_1.mergeHeaders)(fetchMoreRespHeaders, result.headers);
                        if (response) {
                            response.forEach((item) => {
                                const hybridItem = hybridSearchQueryResult_js_1.HybridSearchQueryResult.create(item);
                                if (!this.uniqueItems.has(hybridItem.rid)) {
                                    this.uniqueItems.set(hybridItem.rid, hybridItem);
                                }
                            });
                        }
                        if (componentExecutionContext.hasMoreResults()) {
                            this.componentsExecutionContext.push(componentExecutionContext);
                        }
                    }
                }
                if (this.componentsExecutionContext.length === 0) {
                    this.processUniqueItems();
                }
            }
            else {
                for (const componentExecutionContext of this.componentsExecutionContext) {
                    while (componentExecutionContext.hasMoreResults()) {
                        const result = await componentExecutionContext.fetchMore(diagnosticNode);
                        const response = result.result;
                        (0, headerUtils_js_1.mergeHeaders)(fetchMoreRespHeaders, result.headers);
                        if (response) {
                            response.forEach((item) => {
                                const hybridItem = hybridSearchQueryResult_js_1.HybridSearchQueryResult.create(item);
                                if (!this.uniqueItems.has(hybridItem.rid)) {
                                    this.uniqueItems.set(hybridItem.rid, hybridItem);
                                }
                            });
                        }
                    }
                }
                this.processUniqueItems();
            }
        }
        catch (error) {
            this.state = HybridQueryExecutionContextBaseStates.done;
            throw error;
        }
    }
    processUniqueItems() {
        this.uniqueItems.forEach((item) => this.hybridSearchResult.push(item));
        if (this.hybridSearchResult.length === 0 || this.hybridSearchResult.length === 1) {
            // return the result as no or one element is present
            this.hybridSearchResult.forEach((item) => this.buffer.push(item.data));
            this.state = HybridQueryExecutionContextBaseStates.draining;
            return;
        }
        // Initialize an array to hold ranks for each document
        const componentWeights = this.extractComponentWeights();
        const sortedHybridSearchResult = this.sortHybridSearchResultByRRFScore(this.hybridSearchResult, componentWeights);
        // store the result to buffer
        // add only data from the sortedHybridSearchResult in the buffer
        sortedHybridSearchResult.forEach((item) => this.buffer.push(item.data));
        this.applySkipAndTakeToBuffer();
        this.state = HybridQueryExecutionContextBaseStates.draining;
    }
    applySkipAndTakeToBuffer() {
        const { skip, take } = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo;
        if (skip) {
            this.buffer = skip >= this.buffer.length ? [] : this.buffer.slice(skip);
        }
        if (take) {
            this.buffer = take <= 0 ? [] : this.buffer.slice(0, take);
        }
    }
    async drain(fetchMoreRespHeaders) {
        try {
            if (this.buffer.length === 0) {
                this.state = HybridQueryExecutionContextBaseStates.done;
                return this.done(fetchMoreRespHeaders);
            }
            const result = this.buffer.slice(0, this.pageSize);
            this.buffer = this.buffer.slice(this.pageSize);
            if (this.buffer.length === 0) {
                this.state = HybridQueryExecutionContextBaseStates.done;
            }
            return {
                result: result,
                headers: fetchMoreRespHeaders,
            };
        }
        catch (error) {
            this.state = HybridQueryExecutionContextBaseStates.done;
            throw error;
        }
    }
    async drainOne(nextItemRespHeaders) {
        try {
            if (this.buffer.length === 0) {
                this.state = HybridQueryExecutionContextBaseStates.done;
                return this.done(nextItemRespHeaders);
            }
            const result = this.buffer.shift();
            if (this.buffer.length === 0) {
                this.state = HybridQueryExecutionContextBaseStates.done;
            }
            return {
                result: result,
                headers: nextItemRespHeaders,
            };
        }
        catch (error) {
            this.state = HybridQueryExecutionContextBaseStates.done;
            throw error;
        }
    }
    done(fetchMoreRespHeaders) {
        return {
            result: undefined,
            headers: fetchMoreRespHeaders,
        };
    }
    sortHybridSearchResultByRRFScore(hybridSearchResult, componentWeights) {
        if (hybridSearchResult.length === 0) {
            return [];
        }
        const ranksArray = hybridSearchResult.map((item) => ({
            rid: item.rid,
            ranks: new Array(item.componentScores.length).fill(0),
        }));
        // Compute ranks for each component score
        for (let i = 0; i < hybridSearchResult[0].componentScores.length; i++) {
            // Sort based on the i-th component score
            hybridSearchResult.sort((a, b) => componentWeights[i].comparator(a.componentScores[i], b.componentScores[i]));
            // Assign ranks
            let rank = 1;
            for (let j = 0; j < hybridSearchResult.length; j++) {
                if (j > 0 &&
                    hybridSearchResult[j].componentScores[i] !== hybridSearchResult[j - 1].componentScores[i]) {
                    ++rank;
                }
                const rankIndex = ranksArray.findIndex((rankItem) => rankItem.rid === hybridSearchResult[j].rid);
                ranksArray[rankIndex].ranks[i] = rank; // 1-based rank
            }
        }
        // Compute RRF scores and sort based on them
        const rrfScores = ranksArray.map((item) => ({
            rid: item.rid,
            rrfScore: this.computeRRFScore(item.ranks, this.RRF_CONSTANT, componentWeights),
        }));
        // Sort based on RRF scores
        rrfScores.sort((a, b) => b.rrfScore - a.rrfScore);
        // Map sorted RRF scores back to hybridSearchResult
        const sortedHybridSearchResult = rrfScores.map((scoreItem) => hybridSearchResult.find((item) => item.rid === scoreItem.rid));
        return sortedHybridSearchResult;
    }
    async drainSingleComponent(diagNode, fetchMoreRespHeaders) {
        if (this.componentsExecutionContext && this.componentsExecutionContext.length !== 1) {
            this.logger.error("drainSingleComponent called on multiple components");
            return;
        }
        try {
            if (this.options.enableQueryControl) {
                const componentExecutionContext = this.componentsExecutionContext[0];
                if (componentExecutionContext.hasMoreResults()) {
                    const result = await componentExecutionContext.fetchMore(diagNode);
                    const response = result.result;
                    (0, headerUtils_js_1.mergeHeaders)(fetchMoreRespHeaders, result.headers);
                    if (response) {
                        response.forEach((item) => {
                            this.hybridSearchResult.push(hybridSearchQueryResult_js_1.HybridSearchQueryResult.create(item));
                        });
                    }
                }
                if (!componentExecutionContext.hasMoreResults()) {
                    this.state = HybridQueryExecutionContextBaseStates.draining;
                    this.hybridSearchResult.forEach((item) => this.buffer.push(item.data));
                    this.applySkipAndTakeToBuffer();
                    this.state = HybridQueryExecutionContextBaseStates.draining;
                }
                return;
            }
            else {
                const componentExecutionContext = this.componentsExecutionContext[0];
                const hybridSearchResult = [];
                // add check for enable query control
                while (componentExecutionContext.hasMoreResults()) {
                    const result = await componentExecutionContext.fetchMore(diagNode);
                    const response = result.result;
                    (0, headerUtils_js_1.mergeHeaders)(fetchMoreRespHeaders, result.headers);
                    if (response) {
                        response.forEach((item) => {
                            hybridSearchResult.push(hybridSearchQueryResult_js_1.HybridSearchQueryResult.create(item));
                        });
                    }
                }
                hybridSearchResult.forEach((item) => this.buffer.push(item.data));
                this.applySkipAndTakeToBuffer();
                this.state = HybridQueryExecutionContextBaseStates.draining;
            }
        }
        catch (error) {
            this.state = HybridQueryExecutionContextBaseStates.done;
            throw error;
        }
    }
    createComponentExecutionContexts() {
        // rewrite queries based on global statistics
        let queryInfos = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos;
        if (this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.requiresGlobalStatistics) {
            queryInfos = this.processComponentQueries(this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos, this.globalStatisticsAggregator.getResult());
        }
        // create component execution contexts
        for (const componentQueryInfo of queryInfos) {
            const componentPartitionExecutionInfo = {
                partitionedQueryExecutionInfoVersion: 1,
                queryInfo: componentQueryInfo,
                queryRanges: this.partitionedQueryExecutionInfo.queryRanges,
            };
            const executionContext = new pipelinedQueryExecutionContext_js_1.PipelinedQueryExecutionContext(this.clientContext, this.collectionLink, componentQueryInfo.rewrittenQuery, this.options, componentPartitionExecutionInfo, this.correlatedActivityId, this.emitRawOrderByPayload);
            this.componentsExecutionContext.push(executionContext);
        }
        this.isSingleComponent = this.componentsExecutionContext.length === 1;
    }
    processComponentQueries(componentQueryInfos, globalStats) {
        return componentQueryInfos.map((queryInfo) => {
            let rewrittenOrderByExpressions = queryInfo.orderByExpressions;
            if (queryInfo.orderBy && queryInfo.orderBy.length > 0) {
                if (!queryInfo.hasNonStreamingOrderBy) {
                    throw new Error("The component query must have a non-streaming order by clause.");
                }
                rewrittenOrderByExpressions = queryInfo.orderByExpressions.map((expr) => this.replacePlaceholdersWorkaroud(expr, globalStats, componentQueryInfos.length));
            }
            return Object.assign(Object.assign({}, queryInfo), { rewrittenQuery: this.replacePlaceholdersWorkaroud(queryInfo.rewrittenQuery, globalStats, componentQueryInfos.length), orderByExpressions: rewrittenOrderByExpressions });
        });
    }
    // This method is commented currently, but we will switch back to using this
    // once the gateway has been redeployed with the fix for placeholder indexes
    // private replacePlaceholders(query: string, globalStats: GlobalStatistics): string {
    //   // Replace total document count
    //   query = query.replace(
    //     new RegExp(`{${this.TOTAL_DOCUMENT_COUNT_PLACEHOLDER}}`, "g"),
    //     globalStats.documentCount.toString(),
    //   );
    //   // Replace total word counts and hit counts from fullTextStatistics
    //   globalStats.fullTextStatistics.forEach((stats, index) => {
    //     // Replace total word counts
    //     query = query.replace(
    //       new RegExp(`{${this.TOTAL_WORD_COUNT_PLACEHOLDER}-${index}}`, "g"),
    //       stats.totalWordCount.toString(),
    //     );
    //     // Replace hit counts
    //     query = query.replace(
    //       new RegExp(`{${this.HIT_COUNTS_ARRAY_PLACEHOLDER}-${index}}`, "g"),
    //       `[${stats.hitCounts.join(",")}]`,
    //     );
    //   });
    //   return query;
    // }
    replacePlaceholdersWorkaroud(query, globalStats, componentCount) {
        if (!globalStats ||
            !globalStats.documentCount ||
            !Array.isArray(globalStats.fullTextStatistics)) {
            throw new Error("GlobalStats validation failed");
        }
        // Replace total document count
        query = query.replace(new RegExp(`{${this.TOTAL_DOCUMENT_COUNT_PLACEHOLDER}}`, "g"), globalStats.documentCount.toString());
        let statisticsIndex = 0;
        for (let i = 0; i < componentCount; i++) {
            // Replace total word counts and hit counts from fullTextStatistics
            const wordCountPlaceholder = `{${this.TOTAL_WORD_COUNT_PLACEHOLDER}-${i}}`;
            const hitCountPlaceholder = `{${this.HIT_COUNTS_ARRAY_PLACEHOLDER}-${i}}`;
            if (!query.includes(wordCountPlaceholder)) {
                continue;
            }
            const stats = globalStats.fullTextStatistics[statisticsIndex];
            // Replace total word counts
            query = query.replace(new RegExp(wordCountPlaceholder, "g"), stats.totalWordCount.toString());
            // Replace hit counts
            query = query.replace(new RegExp(hitCountPlaceholder, "g"), `[${stats.hitCounts.join(",")}]`);
            statisticsIndex++;
        }
        return query;
    }
    extractComponentWeights() {
        const hybridSearchQueryInfo = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo;
        const useDefaultComponentWeight = !hybridSearchQueryInfo.componentWeights ||
            hybridSearchQueryInfo.componentWeights.length === 0;
        const result = [];
        for (let index = 0; index < hybridSearchQueryInfo.componentQueryInfos.length; ++index) {
            const queryInfo = hybridSearchQueryInfo.componentQueryInfos[index];
            if (queryInfo.orderBy && queryInfo.orderBy.length > 0) {
                if (!queryInfo.hasNonStreamingOrderBy) {
                    throw new Error("The component query should have a non streaming order by");
                }
                if (!queryInfo.orderByExpressions || queryInfo.orderByExpressions.length !== 1) {
                    throw new Error("The component query should have exactly one order by expression");
                }
            }
            const componentWeight = useDefaultComponentWeight
                ? 1
                : hybridSearchQueryInfo.componentWeights[index];
            const hasOrderBy = queryInfo.orderBy && queryInfo.orderBy.length > 0;
            const sortOrder = hasOrderBy && queryInfo.orderBy[0].includes("Ascending") ? 1 : -1;
            result.push({
                weight: componentWeight,
                comparator: (x, y) => sortOrder * (x - y),
            });
        }
        return result;
    }
}
exports.HybridQueryExecutionContext = HybridQueryExecutionContext;
//# sourceMappingURL=hybridQueryExecutionContext.js.map