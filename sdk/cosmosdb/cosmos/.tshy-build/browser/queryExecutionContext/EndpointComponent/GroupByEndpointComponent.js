import { hashObject } from "../../utils/hashObject.js";
import { createAggregator } from "../Aggregators/index.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import { emptyGroup, extractAggregateResult } from "./emptyGroup.js";
/** @hidden */
export class GroupByEndpointComponent {
    constructor(executionContext, queryInfo) {
        this.executionContext = executionContext;
        this.queryInfo = queryInfo;
        this.groupings = new Map();
        this.aggregateResultArray = [];
        this.completed = false;
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
            // If there are any groupings, consolidate and return them
            if (this.groupings.size > 0) {
                return this.consolidateGroupResults(aggregateHeaders);
            }
            return { result: undefined, headers: aggregateHeaders };
        }
        for (const item of response.result) {
            // If it exists, process it via aggregators
            if (item) {
                const group = item.groupByItems ? await hashObject(item.groupByItems) : emptyGroup;
                const aggregators = this.groupings.get(group);
                const payload = item.payload;
                if (aggregators) {
                    // Iterator over all results in the payload
                    for (const key of Object.keys(payload)) {
                        // in case the value of a group is null make sure we create a dummy payload with item2==null
                        const effectiveGroupByValue = payload[key]
                            ? payload[key]
                            : new Map().set("item2", null);
                        const aggregateResult = extractAggregateResult(effectiveGroupByValue);
                        aggregators.get(key).aggregate(aggregateResult);
                    }
                }
                else {
                    // This is the first time we have seen a grouping. Setup the initial result without aggregate values
                    const grouping = new Map();
                    this.groupings.set(group, grouping);
                    // Iterator over all results in the payload
                    for (const key of Object.keys(payload)) {
                        const aggregateType = this.queryInfo.groupByAliasToAggregateType[key];
                        // Create a new aggregator for this specific aggregate field
                        const aggregator = createAggregator(aggregateType);
                        grouping.set(key, aggregator);
                        if (aggregateType) {
                            const aggregateResult = extractAggregateResult(payload[key]);
                            aggregator.aggregate(aggregateResult);
                        }
                        else {
                            aggregator.aggregate(payload[key]);
                        }
                    }
                }
            }
        }
        if (this.executionContext.hasMoreResults()) {
            return {
                result: [],
                headers: aggregateHeaders,
            };
        }
        else {
            return this.consolidateGroupResults(aggregateHeaders);
        }
    }
    consolidateGroupResults(aggregateHeaders) {
        for (const grouping of this.groupings.values()) {
            const groupResult = {};
            for (const [aggregateKey, aggregator] of grouping.entries()) {
                groupResult[aggregateKey] = aggregator.getResult();
            }
            this.aggregateResultArray.push(groupResult);
        }
        this.completed = true;
        return { result: this.aggregateResultArray, headers: aggregateHeaders };
    }
}
//# sourceMappingURL=GroupByEndpointComponent.js.map