"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonStreamingOrderByDistinctEndpointComponent = void 0;
const headerUtils_js_1 = require("../headerUtils.js");
const hashObject_js_1 = require("../../utils/hashObject.js");
const fixedSizePriorityQueue_js_1 = require("../../utils/fixedSizePriorityQueue.js");
const nonStreamingOrderByMap_js_1 = require("../../utils/nonStreamingOrderByMap.js");
const orderByComparator_js_1 = require("../orderByComparator.js");
/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by distinct query.
 */
class NonStreamingOrderByDistinctEndpointComponent {
    constructor(executionContext, queryInfo, priorityQueueBufferSize, emitRawOrderByPayload = false) {
        this.executionContext = executionContext;
        this.queryInfo = queryInfo;
        this.priorityQueueBufferSize = priorityQueueBufferSize;
        this.emitRawOrderByPayload = emitRawOrderByPayload;
        /**
         * Flag to determine if all results are fetched from backend and results can be returned.
         */
        this.isCompleted = false;
        this.sortOrders = this.queryInfo.orderBy;
        const comparator = new orderByComparator_js_1.OrderByComparator(this.sortOrders);
        this.aggregateMap = new nonStreamingOrderByMap_js_1.NonStreamingOrderByMap((a, b) => {
            return comparator.compareItems(a, b);
        });
        this.nonStreamingOrderByPQ = new fixedSizePriorityQueue_js_1.FixedSizePriorityQueue((a, b) => {
            return comparator.compareItems(b, a);
        }, this.priorityQueueBufferSize);
    }
    /**
     * Build final sorted result array from which responses will be served.
     */
    async buildFinalResultArray() {
        var _a;
        // Fetch all distinct values from the map and store in priority queue.
        const allValues = this.aggregateMap.getAllValuesAndReset();
        for (const value of allValues) {
            this.nonStreamingOrderByPQ.enqueue(value);
        }
        // Compute the final result array size based on offset and limit.
        const offSet = this.queryInfo.offset ? this.queryInfo.offset : 0;
        const queueSize = this.nonStreamingOrderByPQ.size();
        const finalArraySize = queueSize - offSet;
        if (finalArraySize <= 0) {
            this.finalResultArray = [];
        }
        else {
            this.finalResultArray = new Array(finalArraySize);
            // Only keep the final result array size number of items in the final result array and discard the rest.
            for (let count = finalArraySize - 1; count >= 0; count--) {
                if (this.emitRawOrderByPayload) {
                    this.finalResultArray[count] = this.nonStreamingOrderByPQ.dequeue();
                }
                else {
                    this.finalResultArray[count] = (_a = this.nonStreamingOrderByPQ.dequeue()) === null || _a === void 0 ? void 0 : _a.payload;
                }
            }
        }
    }
    hasMoreResults() {
        if (this.priorityQueueBufferSize === 0)
            return false;
        return this.executionContext.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        if (this.isCompleted) {
            return {
                result: undefined,
                headers: (0, headerUtils_js_1.getInitialHeader)(),
            };
        }
        let resHeaders = (0, headerUtils_js_1.getInitialHeader)();
        // if size is 0, just return undefined to signal to more results. Valid if query is TOP 0 or LIMIT 0
        if (this.priorityQueueBufferSize <= 0) {
            return {
                result: undefined,
                headers: resHeaders,
            };
        }
        // If there are more results in backend, keep filling map.
        if (this.executionContext.hasMoreResults()) {
            // Grab the next result
            const response = await this.executionContext.fetchMore(diagnosticNode);
            if (response === undefined || response.result === undefined) {
                this.isCompleted = true;
                if (this.aggregateMap.size() > 0) {
                    await this.buildFinalResultArray();
                    return {
                        result: this.finalResultArray,
                        headers: response.headers,
                    };
                }
                return { result: undefined, headers: response.headers };
            }
            resHeaders = response.headers;
            for (const item of response.result) {
                if (item) {
                    const key = await (0, hashObject_js_1.hashObject)(item === null || item === void 0 ? void 0 : item.payload);
                    this.aggregateMap.set(key, item);
                }
            }
            // return [] to signal that there are more results to fetch.
            if (this.executionContext.hasMoreResults()) {
                return {
                    result: [],
                    headers: resHeaders,
                };
            }
        }
        // If all results are fetched from backend, prepare final results
        if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
            this.isCompleted = true;
            await this.buildFinalResultArray();
            return {
                result: this.finalResultArray,
                headers: resHeaders,
            };
        }
        // Signal that there are no more results.
        return {
            result: undefined,
            headers: resHeaders,
        };
    }
}
exports.NonStreamingOrderByDistinctEndpointComponent = NonStreamingOrderByDistinctEndpointComponent;
//# sourceMappingURL=NonStreamingOrderByDistinctEndpointComponent.js.map