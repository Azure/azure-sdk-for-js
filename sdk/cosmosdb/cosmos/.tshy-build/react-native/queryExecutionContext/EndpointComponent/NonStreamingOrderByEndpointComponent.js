import { OrderByComparator } from "../orderByComparator.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import { getInitialHeader } from "../headerUtils.js";
/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by query.
 */
export class NonStreamingOrderByEndpointComponent {
    /**
     * Represents an endpoint in handling an non-streaming order by query. For each processed orderby
     * result it returns 'payload' item of the result
     *
     * @param executionContext - Underlying Execution Context
     * @hidden
     */
    constructor(executionContext, sortOrders, priorityQueueBufferSize, offset = 0, emitRawOrderByPayload = false) {
        this.executionContext = executionContext;
        this.sortOrders = sortOrders;
        this.priorityQueueBufferSize = priorityQueueBufferSize;
        this.offset = offset;
        this.emitRawOrderByPayload = emitRawOrderByPayload;
        /**
         * Flag to determine if all results are fetched from backend and results can be returned from priority queue.
         */
        this.isCompleted = false;
        const comparator = new OrderByComparator(this.sortOrders);
        this.nonStreamingOrderByPQ = new FixedSizePriorityQueue((a, b) => {
            return comparator.compareItems(b, a);
        }, this.priorityQueueBufferSize);
    }
    /**
     * Determine if there are still remaining resources to processs.
     * @returns true if there is other elements to process in the NonStreamingOrderByEndpointComponent.
     */
    hasMoreResults() {
        return this.priorityQueueBufferSize > 0 && this.executionContext.hasMoreResults();
    }
    /**
     * Fetches the next batch of the result from the target container.
     * @param diagnosticNode - The diagnostic information for the request.
     */
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
        // If there are more results in backend, keep filling pq.
        if (this.executionContext.hasMoreResults()) {
            const response = await this.executionContext.fetchMore(diagnosticNode);
            resHeaders = response.headers;
            if (response === undefined || response.result === undefined) {
                this.isCompleted = true;
                if (!this.nonStreamingOrderByPQ.isEmpty()) {
                    return this.buildFinalResultArray(resHeaders);
                }
                return { result: undefined, headers: resHeaders };
            }
            for (const item of response.result) {
                if (item !== undefined) {
                    this.nonStreamingOrderByPQ.enqueue(item);
                }
            }
        }
        // If the backend has more results to fetch, return [] to signal that there are more results to fetch.
        if (this.executionContext.hasMoreResults()) {
            return {
                result: [],
                headers: resHeaders,
            };
        }
        // If all results are fetched from backend, prepare final results
        if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
            this.isCompleted = true;
            return this.buildFinalResultArray(resHeaders);
        }
        // If pq is empty, return undefined to signal that there are no more results.
        return {
            result: undefined,
            headers: resHeaders,
        };
    }
    async buildFinalResultArray(resHeaders) {
        var _a;
        // Set isCompleted to true.
        this.isCompleted = true;
        // Reverse the priority queue to get the results in the correct order
        this.nonStreamingOrderByPQ = this.nonStreamingOrderByPQ.reverse();
        // For offset limit case we set the size of priority queue to offset + limit
        // and we drain offset number of items from the priority queue
        while (this.offset < this.priorityQueueBufferSize &&
            this.offset > 0 &&
            !this.nonStreamingOrderByPQ.isEmpty()) {
            this.nonStreamingOrderByPQ.dequeue();
            this.offset--;
        }
        // If pq is not empty, return the result from pq.
        if (!this.nonStreamingOrderByPQ.isEmpty()) {
            const buffer = [];
            if (this.emitRawOrderByPayload) {
                while (!this.nonStreamingOrderByPQ.isEmpty()) {
                    buffer.push(this.nonStreamingOrderByPQ.dequeue());
                }
            }
            else {
                while (!this.nonStreamingOrderByPQ.isEmpty()) {
                    buffer.push((_a = this.nonStreamingOrderByPQ.dequeue()) === null || _a === void 0 ? void 0 : _a.payload);
                }
            }
            return {
                result: buffer,
                headers: resHeaders,
            };
        }
    }
}
//# sourceMappingURL=NonStreamingOrderByEndpointComponent.js.map