// In browser, during webpack or browserify bundling, this module will be replaced by 'events'
// https://github.com/Gozala/events
import { EventEmitter } from "events";

/**
 * Operation is an async function to be executed and managed by Batch.
 */
export declare type Operation = () => Promise<any>;

/**
 * States for Batch.
 *
 * @enum {number}
 */
enum BatchStates {
  Good,
  Error
}

/**
 * Batch provides basic parallel execution with concurrency limits.
 * Will stop execute left operations when one of the executed operation throws an error.
 * But Batch cannot cancel ongoing operations, you need to cancel them by yourself.
 *
 * @export
 * @class Batch
 */
export class Batch {
  /**
   * Concurrency. Must be lager than 0.
   *
   * @type {number}
   * @memberof Batch
   */
  private concurrency: number;

  /**
   * Number of active operations under execution.
   *
   * @private
   * @type {number}
   * @memberof Batch
   */
  private actives: number = 0;

  /**
   * Number of completed operations under execution.
   *
   * @private
   * @type {number}
   * @memberof Batch
   */
  private completed: number = 0;

  /**
   * Offset of next operation to be executed.
   *
   * @private
   * @type {number}
   * @memberof Batch
   */
  private offset: number = 0;

  /**
   * Operation array to be executed.
   *
   * @private
   * @type {Operation[]}
   * @memberof Batch
   */
  private operations: Operation[] = [];

  /**
   * States of Batch. When an error happens, state will turn into error.
   * Batch will stop execute left operations.
   *
   * @private
   * @type {BatchStates}
   * @memberof Batch
   */
  private state: BatchStates = BatchStates.Good;

  /**
   * A private emitter used to pass events inside this class.
   *
   * @private
   * @type {EventEmitter}
   * @memberof Batch
   */
  private emitter: EventEmitter;

  /**
   * Creates an instance of Batch.
   * @param {number} [concurrency=5]
   * @memberof Batch
   */
  public constructor(concurrency: number = 5) {
    if (concurrency < 1) {
      throw new RangeError("concurrency must be larger than 0");
    }
    this.concurrency = concurrency;
    this.emitter = new EventEmitter();
  }

  /**
   * Add a operation into queue.
   *
   * @param {Operation} operation
   * @memberof Batch
   */
  public addOperation(operation: Operation): void {
    this.operations.push(async () => {
      try {
        this.actives++;
        await operation();
        this.actives--;
        this.completed++;
        this.parallelExecute();
      } catch (error) {
        this.emitter.emit("error", error);
      }
    });
  }

  /**
   * Start execute operations in the queue.
   *
   * @returns {Promise<void>}
   * @memberof Batch
   */
  public async do(): Promise<void> {
    this.parallelExecute();

    return new Promise<void>((resolve, reject) => {
      this.emitter.on("finish", resolve);

      this.emitter.on("error", (error) => {
        this.state = BatchStates.Error;
        reject(error);
      });
    });
  }

  /**
   * Get next operation to be executed. Return null when reaching ends.
   *
   * @private
   * @returns {(Operation | null)}
   * @memberof Batch
   */
  private nextOperation(): Operation | null {
    if (this.offset < this.operations.length) {
      return this.operations[this.offset++];
    }
    return null;
  }

  /**
   * Start execute operations. One one the most important difference between
   * this method with do() is that do() wraps as an sync method.
   *
   * @private
   * @returns {void}
   * @memberof Batch
   */
  private parallelExecute(): void {
    if (this.state === BatchStates.Error) {
      return;
    }

    if (this.completed >= this.operations.length) {
      this.emitter.emit("finish");
      return;
    }

    while (this.actives < this.concurrency) {
      const operation = this.nextOperation();
      if (operation) {
        operation();
      } else {
        return;
      }
    }
  }
}
