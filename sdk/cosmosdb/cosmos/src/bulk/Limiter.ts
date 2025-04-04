// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type Task<T = any> = () => Promise<T>;

interface QueueItem<T = any> {
  task: Task<T>;
  resolve: (value: T | PromiseLike<T>) => void;
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
  // doubly linked list to store tasks (with their associated resolve/reject functions)
  private tasks: DoublyLinkedList<QueueItem> = new DoublyLinkedList();
  // boolean flag that indicates whether the queue has been permanently paused
  private terminated = false;
  // value to resolve with when the queue is terminated
  private terminatedValue: any;
  // indicates if the processing cycle has been scheduled via the asynchronous scheduler
  private scheduled = false;
  // indicates whether the queue is currently in the process of dequeueing and executing tasks
  private processing = false;

  /**
   * Creates a new HighPerformanceQueue.
   */
  constructor(concurrency: number) {
    if (concurrency < 1) {
      throw new Error("Concurrency must be at least 1");
    }
    this.concurrency = concurrency;
  }

  /**
   * Enqueue a task and return a Promise that resolves or rejects when the task completes.
   * If the queue has been terminated via pauseAndClear, the promise resolves immediately with the terminated value.
   */
  public push<T = any>(task: Task<T>): Promise<T> {
    if (this.terminated) {
      return Promise.resolve(this.terminatedValue);
    }
    return new Promise<T>((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this.scheduleProcess();
    });
  }

  /**
   * Permanently pauses processing and clears the queue.
   * All queued tasks and subsequent push() calls will immediately resolve with the provided custom value.
   */
  public pauseAndClear<T = any>(customValue: T): void {
    this.terminated = true;
    this.terminatedValue = customValue;
    while (!this.tasks.isEmpty()) {
      const item = this.tasks.shift();
      if (item) {
        item.resolve(customValue);
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
        const item = this.tasks.shift();
        if (!item) break;

        this.running++;

        // Handle synchronous exceptions
        let taskPromise: Promise<unknown>;
        try {
          taskPromise = item.task();
        } catch (err) {
          // Handle synchronous errors
          item.reject(err);
          this.running--;
          continue;
        }

        // Safe promise handling without ESLint warnings
        void taskPromise
          // eslint-disable-next-line promise/always-return
          .then((result) => {
            item.resolve(result);
          })
          .catch((err) => {
            item.reject(err);
          })
          .finally(() => {
            this.running--;
            if (!this.terminated && this.running < this.concurrency && !this.tasks.isEmpty()) {
              this.scheduleProcess();
            }
          });
        console.log("Task completed:", item.task);
      }
    } catch (err) {
      // Catch any unexpected errors in the processing loop
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
      // scheduleCallback(() => this.process());
    }
  }
}
 
