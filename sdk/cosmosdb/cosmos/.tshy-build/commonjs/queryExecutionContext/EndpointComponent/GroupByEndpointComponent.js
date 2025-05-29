"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupByEndpointComponent = void 0;
const hashObject_js_1 = require("../../utils/hashObject.js");
const index_js_1 = require("../Aggregators/index.js");
const headerUtils_js_1 = require("../headerUtils.js");
const emptyGroup_js_1 = require("./emptyGroup.js");
/** @hidden */
class GroupByEndpointComponent {
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
                headers: (0, headerUtils_js_1.getInitialHeader)(),
            };
        }
        const aggregateHeaders = (0, headerUtils_js_1.getInitialHeader)();
        const response = await this.executionContext.fetchMore(diagnosticNode);
        (0, headerUtils_js_1.mergeHeaders)(aggregateHeaders, response.headers);
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
                const group = item.groupByItems ? await (0, hashObject_js_1.hashObject)(item.groupByItems) : emptyGroup_js_1.emptyGroup;
                const aggregators = this.groupings.get(group);
                const payload = item.payload;
                if (aggregators) {
                    // Iterator over all results in the payload
                    for (const key of Object.keys(payload)) {
                        // in case the value of a group is null make sure we create a dummy payload with item2==null
                        const effectiveGroupByValue = payload[key]
                            ? payload[key]
                            : new Map().set("item2", null);
                        const aggregateResult = (0, emptyGroup_js_1.extractAggregateResult)(effectiveGroupByValue);
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
                        const aggregator = (0, index_js_1.createAggregator)(aggregateType);
                        grouping.set(key, aggregator);
                        if (aggregateType) {
                            const aggregateResult = (0, emptyGroup_js_1.extractAggregateResult)(payload[key]);
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
exports.GroupByEndpointComponent = GroupByEndpointComponent;
//# sourceMappingURL=GroupByEndpointComponent.js.map