// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StatusCodes } from "../common/statusCodes.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { RetryCallback } from "../utils/batch.js";
import type { Batcher } from "./Batcher.js";
import type { PartitionMetric } from "./PartitionMetric.js";
import type { ItemOperation } from "./ItemOperation.js";

export type Task<T = any> = () => Promise<T>;

interface QueueItem {
  batcher: Batcher;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null = null;
  public prev: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  public head: ListNode<T> | null = null;
  public tail: ListNode<T> | null = null;
  public length = 0;

  public push(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }

  public shift(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  public clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }
}

/**
 * Returns a function that will schedule the given callback using the best available method.
 */
function scheduleCallback(fn: () => void): void {
  if (typeof process !== "undefined" && typeof process.nextTick === "function") {
    process.nextTick(fn);
  } else if (typeof setImmediate === "function") {
    setImmediate(fn);
  } else {
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
export class LimiterQueue {
  // maximum number of tasks allowed to run concurrently
  public concurrency: number;
  // number of tasks currently executing
  private running = 0;
  // doubly linked list to store batchers and resolve/reject functions for dispatch tasks
  private tasks: DoublyLinkedList<QueueItem> = new DoublyLinkedList();
  // boolean flag that indicates whether the queue has been permanently paused
  private terminated = false;
  // value to resolve with when the queue is terminated
  private terminatedValue: any;
  // indicates if the processing cycle has been scheduled via the asynchronous scheduler
  private scheduled = false;
  // indicates whether the queue is currently in the process of dequeueing and executing tasks
  private processing = false;
  // retry callback to retry all the queued operations in case of split/merge error
  private retrier: RetryCallback;
  // partiton metric for collecting metrics for the requests
  private partitionMetric: PartitionMetric;
  // callback used to refresh the partition key range cache in case of split/merge error
  private readonly refreshPartitionKeyRangeCache: (diagnosticNode: any) => Promise<void>;
  private refreshPKRangeCachePromise: Promise<void> | undefined = undefined;
  /**
   * Creates a new HighPerformanceQueue.
   */
  constructor(
    concurrency: number,
    partitionMetric: PartitionMetric,
    retrier: RetryCallback,
    refreshPartitionKeyRangeCache: (diagnosticNode: any) => Promise<void>,
  ) {
    this.concurrency = concurrency;
    this.partitionMetric = partitionMetric;
    this.retrier = retrier;
    this.refreshPartitionKeyRangeCache = refreshPartitionKeyRangeCache;
  }

  /**
   * Enqueue a task and return a Promise that resolves or rejects when the task completes.
   * If the queue has been terminated via pauseAndClear, the promise resolves immediately with the terminated value.
   */
  public push(batcher: Batcher): Promise<any> {
    if (this.terminated) {
      const ops = batcher.getOperations();
      ops.forEach((op) => this.retrier(op, op.operationContext.diagnosticNode));
      return Promise.resolve(this.terminatedValue);
    }
    return new Promise<any>((resolve, reject) => {
      this.tasks.push({ batcher, resolve, reject });
      this.scheduleProcess();
    });
  }

  /**
   * Permanently pauses processing and clears the queue.
   * All queued tasks and subsequent push() calls will immediately resolve with the provided custom value.
   */
  public async pauseAndClear<T = any>(
    customValue: T,
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<void> {
    this.terminated = true;
    this.terminatedValue = customValue;
    const operationsList: ItemOperation[] = [];
    while (!this.tasks.isEmpty()) {
      const queueItem = this.tasks.shift();
      if (!queueItem) break;
      if (customValue === StatusCodes.Gone) {
        const operations = queueItem.batcher.getOperations();
        operationsList.push(...operations);
      }
      queueItem.resolve(customValue);
    }
    if (customValue === StatusCodes.Gone) {
      // Multiple requests could result in 410 error for one partition based on degree of concurrency.
      // The refreshPKRangeCachePromise is added to ensure that only one refreshPartitionKeyRangeCache() call is made
      // to backend for one partition.
      if (this.refreshPKRangeCachePromise) {
        await this.refreshPKRangeCachePromise;
      } else {
        this.refreshPKRangeCachePromise = this.refreshPartitionKeyRangeCache(diagnosticNode);
        await this.refreshPKRangeCachePromise;
      }
      for (const operation of operationsList) {
        await this.retrier(operation, operation.operationContext.diagnosticNode);
      }
    }
  }

  /**
   * Schedules the processing loop using the best available asynchronous scheduler.
   */
  private scheduleProcess(): void {
    if (this.scheduled || this.processing || this.terminated) return;
    this.scheduled = true;
    scheduleCallback(() => {
      this.scheduled = false;
      this.process();
    });
  }

  /**
   * Processes tasks up to the concurrency limit.
   */
  private process(): void {
    if (this.terminated) return;
    this.processing = true;

    try {
      while (!this.terminated && this.running < this.concurrency && !this.tasks.isEmpty()) {
        const queueItem = this.tasks.shift();
        if (!queueItem) break;

        this.running++;

        // Handle synchronous exceptions
        let dispatchPromise: Promise<any>;
        try {
          dispatchPromise = queueItem.batcher.dispatch(this.partitionMetric);
        } catch (err) {
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
    } catch (err) {
      console.error("Unexpected error in task queue processing:", err);
    } finally {
      this.processing = false;
    }
  }

  /**
   * Dynamically updates the concurrency limit.
   */
  public setConcurrency(newConcurrency: number): void {
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
