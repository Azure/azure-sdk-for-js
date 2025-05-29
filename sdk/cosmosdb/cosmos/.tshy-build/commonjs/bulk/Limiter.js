"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiterQueue = void 0;
const statusCodes_js_1 = require("../common/statusCodes.js");
class ListNode {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) {
        const node = new ListNode(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }
    shift() {
        if (!this.head)
            return null;
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        }
        else {
            this.tail = null;
        }
        this.length--;
        return value;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    isEmpty() {
        return this.length === 0;
    }
}
/**
 * Returns a function that will schedule the given callback using the best available method.
 */
function scheduleCallback(fn) {
    if (typeof process !== "undefined" && typeof process.nextTick === "function") {
        process.nextTick(fn);
    }
    else if (typeof setImmediate === "function") {
        setImmediate(fn);
    }
    else {
        // eslint-disable-next-line promise/catch-or-return
        Promise.resolve().then(fn);
    }
}
/**
 * HighPerformanceQueue processes tasks concurrently.
 * If pauseAndClear() is called, it permanently halts processing,
 * clears queued tasks (resolving them with a custom value), and
 * any subsequent push() calls will immediately resolve with that value.
 */
class LimiterQueue {
    /**
     * Creates a new HighPerformanceQueue.
     */
    constructor(concurrency, partitionMetric, retrier, refreshPartitionKeyRangeCache) {
        // number of tasks currently executing
        this.running = 0;
        // doubly linked list to store batchers and resolve/reject functions for dispatch tasks
        this.tasks = new DoublyLinkedList();
        // boolean flag that indicates whether the queue has been permanently paused
        this.terminated = false;
        // indicates if the processing cycle has been scheduled via the asynchronous scheduler
        this.scheduled = false;
        // indicates whether the queue is currently in the process of dequeueing and executing tasks
        this.processing = false;
        this.concurrency = concurrency;
        this.partitionMetric = partitionMetric;
        this.retrier = retrier;
        this.refreshPartitionKeyRangeCache = refreshPartitionKeyRangeCache;
    }
    /**
     * Enqueue a task and return a Promise that resolves or rejects when the task completes.
     * If the queue has been terminated via pauseAndClear, the promise resolves immediately with the terminated value.
     */
    push(batcher) {
        if (this.terminated) {
            return Promise.resolve(this.terminatedValue);
        }
        return new Promise((resolve, reject) => {
            this.tasks.push({ batcher, resolve, reject });
            this.scheduleProcess();
        });
    }
    /**
     * Permanently pauses processing and clears the queue.
     * All queued tasks and subsequent push() calls will immediately resolve with the provided custom value.
     */
    async pauseAndClear(customValue, diagnosticNode) {
        this.terminated = true;
        this.terminatedValue = customValue;
        const operationsList = [];
        while (!this.tasks.isEmpty()) {
            const queueItem = this.tasks.shift();
            if (!queueItem)
                break;
            if (customValue === statusCodes_js_1.StatusCodes.Gone) {
                const operations = queueItem.batcher.getOperations();
                operationsList.push(...operations);
            }
            queueItem.resolve(customValue);
        }
        if (customValue === statusCodes_js_1.StatusCodes.Gone) {
            await this.refreshPartitionKeyRangeCache(diagnosticNode);
            for (const operation of operationsList) {
                await this.retrier(operation, operation.operationContext.diagnosticNode);
            }
        }
    }
    /**
     * Schedules the processing loop using the best available asynchronous scheduler.
     */
    scheduleProcess() {
        if (this.scheduled || this.processing || this.terminated)
            return;
        this.scheduled = true;
        scheduleCallback(() => {
            this.scheduled = false;
            this.process();
        });
    }
    /**
     * Processes tasks up to the concurrency limit.
     */
    process() {
        if (this.terminated)
            return;
        this.processing = true;
        try {
            while (!this.terminated && this.running < this.concurrency && !this.tasks.isEmpty()) {
                const queueItem = this.tasks.shift();
                if (!queueItem)
                    break;
                this.running++;
                // Handle synchronous exceptions
                let dispatchPromise;
                try {
                    dispatchPromise = queueItem.batcher.dispatch(this.partitionMetric);
                }
                catch (err) {
                    // Handle synchronous errors
                    queueItem.reject(err);
                    this.running--;
                    continue;
                }
                void dispatchPromise
                    // eslint-disable-next-line promise/always-return
                    .then((result) => {
                    queueItem.resolve(result);
                })
                    .catch((err) => {
                    queueItem.reject(err);
                })
                    .finally(() => {
                    this.running--;
                    if (!this.terminated && this.running < this.concurrency && !this.tasks.isEmpty()) {
                        this.scheduleProcess();
                    }
                });
            }
        }
        catch (err) {
            console.error("Unexpected error in task queue processing:", err);
        }
        finally {
            this.processing = false;
        }
    }
    /**
     * Dynamically updates the concurrency limit.
     */
    setConcurrency(newConcurrency) {
        if (newConcurrency < 1) {
            throw new Error("Concurrency must be at least 1");
        }
        this.concurrency = newConcurrency;
        if (!this.terminated && this.running < this.concurrency) {
            // Use the scheduleCallback helper for consistency
            this.scheduleProcess();
        }
    }
}
exports.LimiterQueue = LimiterQueue;
//# sourceMappingURL=Limiter.js.map