import { getInitialHeader } from "../headerUtils.js";
import { hashObject } from "../../utils/hashObject.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import { NonStreamingOrderByMap } from "../../utils/nonStreamingOrderByMap.js";
import { OrderByComparator } from "../orderByComparator.js";
/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by distinct query.
 */
export class NonStreamingOrderByDistinctEndpointComponent {
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
        const comparator = new OrderByComparator(this.sortOrders);
        this.aggregateMap = new NonStreamingOrderByMap((a, b) => {
            return comparator.compareItems(a, b);
        });
        this.nonStreamingOrderByPQ = new FixedSizePriorityQueue((a, b) => {
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
                headers: getInitialHeader(),
            };
        }
        let resHeaders = getInitialHeader();
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
                    const key = await hashObject(item === null || item === void 0 ? void 0 : item.payload);
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
//# sourceMappingURL=NonStreamingOrderByDistinctEndpointComponent.js.map