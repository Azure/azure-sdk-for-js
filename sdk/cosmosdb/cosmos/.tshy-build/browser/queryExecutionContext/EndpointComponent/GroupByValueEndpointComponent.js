import { hashObject } from "../../utils/hashObject.js";
import { createAggregator } from "../Aggregators/index.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import { emptyGroup, extractAggregateResult } from "./emptyGroup.js";
/** @hidden */
export class GroupByValueEndpointComponent {
    constructor(executionContext, queryInfo) {
        this.executionContext = executionContext;
        this.queryInfo = queryInfo;
        this.aggregators = new Map();
        this.aggregateResultArray = [];
        this.completed = false;
        // VALUE queries will only every have a single grouping
        this.aggregateType = this.queryInfo.aggregates[0];
    }
    hasMoreResults() {
        return this.executionContext.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        if (this.completed) {
            return {
                result: undefined,
                headers: getInitialHeader(),
            };
        }
        const aggregateHeaders = getInitialHeader();
        const response = await this.executionContext.fetchMore(diagnosticNode);
        mergeHeaders(aggregateHeaders, response.headers);
        if (response === undefined || response.result === undefined) {
            if (this.aggregators.size > 0) {
                return this.generateAggregateResponse(aggregateHeaders);
            }
            return { result: undefined, headers: aggregateHeaders };
        }
        for (const item of response.result) {
            if (item) {
                let grouping = emptyGroup;
                let payload = item;
                if (item.groupByItems) {
                    // If the query contains a GROUP BY clause, it will have a payload property and groupByItems
                    payload = item.payload;
                    grouping = await hashObject(item.groupByItems);
                }
                const aggregator = this.aggregators.get(grouping);
                if (!aggregator) {
                    // This is the first time we have seen a grouping so create a new aggregator
                    this.aggregators.set(grouping, createAggregator(this.aggregateType));
                }
                if (this.aggregateType) {
                    const aggregateResult = extractAggregateResult(payload[0]);
                    // if aggregate result is null, we need to short circuit aggregation and return undefined
                    if (aggregateResult === null) {
                        this.completed = true;
                    }
                    this.aggregators.get(grouping).aggregate(aggregateResult);
                }
                else {
                    // Queries with no aggregates pass the payload directly to the aggregator
                    // Example: SELECT VALUE c.team FROM c GROUP BY c.team
                    this.aggregators.get(grouping).aggregate(payload);
                }
            }
        }
        // We bail early since we got an undefined result back `[{}]`
        if (this.completed) {
            return {
                result: undefined,
                headers: aggregateHeaders,
            };
        }
        if (this.executionContext.hasMoreResults()) {
            return { result: [], headers: aggregateHeaders };
        }
        else {
            // If no results are left in the underlying execution context, convert our aggregate results to an array
            return this.generateAggregateResponse(aggregateHeaders);
        }
    }
    generateAggregateResponse(aggregateHeaders) {
        for (const aggregator of this.aggregators.values()) {
            const result = aggregator.getResult();
            if (result !== undefined) {
                this.aggregateResultArray.push(result);
            }
        }
        this.completed = true;
        return {
            result: this.aggregateResultArray,
            headers: aggregateHeaders,
        };
    }
}
//# sourceMappingURL=GroupByValueEndpointComponent.js.map