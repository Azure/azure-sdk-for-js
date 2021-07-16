// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperation, PollOperationState } from "./pollOperation";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * CancelOnProgress is used as the return value of a Poller's onProgress method.
 * When a user invokes onProgress, they're required to pass in a function that will be
 * called as a callback with the new data received each time the poll operation is updated.
 * onProgress returns a function that will prevent any further update to reach the original callback.
 */
export type CancelOnProgress = () => void;

/**
 * PollProgressCallback<TState> is the type of the callback functions sent to onProgress.
 * These functions will receive a TState that is defined by your implementation of
 * the Poller class.
 */
export type PollProgressCallback<TState> = (state: TState) => void;

/**
 * When a poller is manually stopped through the `stopPolling` method,
 * the poller will be rejected with an instance of the PollerStoppedError.
 */
export class PollerStoppedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PollerStoppedError";
    Object.setPrototypeOf(this, PollerStoppedError.prototype);
  }
}

/**
 * When a poller is cancelled through the `cancelOperation` method,
 * the poller will be rejected with an instance of the PollerCancelledError.
 */
export class PollerCancelledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PollerCancelledError";
    Object.setPrototypeOf(this, PollerCancelledError.prototype);
  }
}

/**
 * Abstract representation of a poller, intended to expose just the minimal API that the user needs to work with.
 */
// eslint-disable-next-line no-use-before-define
export interface PollerLike<TState extends PollOperationState<TResult>, TResult> {
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Stops the poller. After this, no manual or automated requests can be sent.
   */
  stopPolling(): void;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Attempts to cancel the underlying operation.
   */
  cancelOperation(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns the state of the operation.
   * The TState defined in PollerLike can be a subset of the TState defined in
   * the Poller implementation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a serialized version of the poller's operation
   * by invoking the operation's toString method.
   */
  toString(): string;
}

/**
 * A class that represents the definition of a program that polls through consecutive requests
 * until it reaches a state of completion.
 *
 * A poller can be executed manually, by polling request by request by calling to the `poll()` method repeatedly, until its operation is completed.
 * It also provides a way to wait until the operation completes, by calling `pollUntilDone()` and waiting until the operation finishes.
 * Pollers can also request the cancellation of the ongoing process to whom is providing the underlying long running operation.
 *
 * ```ts
 * const poller = new MyPoller();
 *
 * // Polling just once:
 * await poller.poll();
 *
 * // We can try to cancel the request here, by calling:
 * //
 * //     await poller.cancelOperation();
 * //
 *
 * // Getting the final result:
 * const result = await poller.pollUntilDone();
 * ```
 *
 * The Poller is defined by two types, a type representing the state of the poller, which
 * must include a basic set of properties from `PollOperationState<TResult>`,
 * and a return type defined by `TResult`, which can be anything.
 *
 * The Poller class implements the `PollerLike` interface, which allows poller implementations to avoid having
 * to export the Poller's class directly, and instead only export the already instantiated poller with the PollerLike type.
 *
 * ```ts
 * class Client {
 *   public async makePoller: PollerLike<MyOperationState, MyResult> {
 *     const poller = new MyPoller({});
 *     // It might be preferred to return the poller after the first request is made,
 *     // so that some information can be obtained right away.
 *     await poller.poll();
 *     return poller;
 *   }
 * }
 *
 * const poller: PollerLike<MyOperationState, MyResult> = myClient.makePoller();
 * ```
 *
 * A poller can be created through its constructor, then it can be polled until it's completed.
 * At any point in time, the state of the poller can be obtained without delay through the getOperationState method.
 * At any point in time, the intermediate forms of the result type can be requested without delay.
 * Once the underlying operation is marked as completed, the poller will stop and the final value will be returned.
 *
 * ```ts
 * const poller = myClient.makePoller();
 * const state: MyOperationState = poller.getOperationState();
 *
 * // The intermediate result can be obtained at any time.
 * const result: MyResult | undefined = poller.getResult();
 *
 * // The final result can only be obtained after the poller finishes.
 * const result: MyResult = await poller.pollUntilDone();
 * ```
 *
 */
// eslint-disable-next-line no-use-before-define
export abstract class Poller<TState extends PollOperationState<TResult>, TResult>
  implements PollerLike<TState, TResult> {
  private stopped: boolean = true;
  private resolve?: (value: TResult) => void;
  private reject?: (error: PollerStoppedError | PollerCancelledError | Error) => void;
  private pollOncePromise?: Promise<void>;
  private cancelPromise?: Promise<void>;
  private promise: Promise<TResult>;
  private pollProgressCallbacks: PollProgressCallback<TState>[] = [];

  /**
   * The poller's operation is available in full to any of the methods of the Poller class
   * and any class extending the Poller class.
   */
  protected operation: PollOperation<TState, TResult>;

  /**
   * A poller needs to be initialized by passing in at least the basic properties of the `PollOperation<TState, TResult>`.
   *
   * When writing an implementation of a Poller, this implementation needs to deal with the initialization
   * of any custom state beyond the basic definition of the poller. The basic poller assumes that the poller's
   * operation has already been defined, at least its basic properties. The code below shows how to approach
   * the definition of the constructor of a new custom poller.
   *
   * ```ts
   * export class MyPoller extends Poller<MyOperationState, string> {
   *   constructor({
   *     // Anything you might need outside of the basics
   *   }) {
   *     let state: MyOperationState = {
   *       privateProperty: private,
   *       publicProperty: public,
   *     };
   *
   *     const operation = {
   *       state,
   *       update,
   *       cancel,
   *       toString
   *     }
   *
   *     // Sending the operation to the parent's constructor.
   *     super(operation);
   *
   *     // You can assign more local properties here.
   *   }
   * }
   * ```
   *
   * Inside of this constructor, a new promise is created. This will be used to
   * tell the user when the poller finishes (see `pollUntilDone()`). The promise's
   * resolve and reject methods are also used internally to control when to resolve
   * or reject anyone waiting for the poller to finish.
   *
   * The constructor of a custom implementation of a poller is where any serialized version of
   * a previous poller's operation should be deserialized into the operation sent to the
   * base constructor. For example:
   *
   * ```ts
   * export class MyPoller extends Poller<MyOperationState, string> {
   *   constructor(
   *     baseOperation: string | undefined
   *   ) {
   *     let state: MyOperationState = {};
   *     if (baseOperation) {
   *       state = {
   *         ...JSON.parse(baseOperation).state,
   *         ...state
   *       };
   *     }
   *     const operation = {
   *       state,
   *       // ...
   *     }
   *     super(operation);
   *   }
   * }
   * ```
   *
   * @param operation - Must contain the basic properties of `PollOperation<State, TResult>`.
   */
  constructor(operation: PollOperation<TState, TResult>) {
    this.operation = operation;
    this.promise = new Promise<TResult>(
      (
        resolve: (result: TResult) => void,
        reject: (error: PollerStoppedError | PollerCancelledError | Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
    // This prevents the UnhandledPromiseRejectionWarning in node.js from being thrown.
    // The above warning would get thrown if `poller.poll` is called, it returns an error,
    // and pullUntilDone did not have a .catch or await try/catch on it's return value.
    this.promise.catch(() => {
      /* intentionally blank */
    });
  }

  /**
   * Defines how much to wait between each poll request.
   * This has to be implemented by your custom poller.
   *
   * \@azure/core-http has a simple implementation of a delay function that waits as many milliseconds as specified.
   * This can be used as follows:
   *
   * ```ts
   * import { delay } from "@azure/core-http";
   *
   * export class MyPoller extends Poller<MyOperationState, string> {
   *   // The other necessary definitions.
   *
   *   async delay(): Promise<void> {
   *     const milliseconds = 1000;
   *     return delay(milliseconds);
   *   }
   * }
   * ```
   *
   */
  protected abstract delay(): Promise<void>;

  /**
   * @internal
   * Starts a loop that will break only if the poller is done
   * or if the poller is stopped.
   */
  private async startPolling(): Promise<void> {
    if (this.stopped) {
      this.stopped = false;
    }
    while (!this.isStopped() && !this.isDone()) {
      await this.poll();
      await this.delay();
    }
  }

  /**
   * @internal
   * pollOnce does one polling, by calling to the update method of the underlying
   * poll operation to make any relevant change effective.
   *
   * It only optionally receives an object with an abortSignal property, from \@azure/abort-controller's AbortSignalLike.
   *
   * @param options - Optional properties passed to the operation's update method.
   */
  private async pollOnce(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    try {
      if (!this.isDone()) {
        this.operation = await this.operation.update({
          abortSignal: options.abortSignal,
          fireProgress: this.fireProgress.bind(this)
        });
        if (this.isDone() && this.resolve) {
          // If the poller has finished polling, this means we now have a result.
          // However, it can be the case that TResult is instantiated to void, so
          // we are not expecting a result anyway. To assert that we might not
          // have a result eventually after finishing polling, we cast the result
          // to TResult.
          this.resolve(this.operation.state.result as TResult);
        }
      }
    } catch (e) {
      this.operation.state.error = e;
      if (this.reject) {
        this.reject(e);
      }
      throw e;
    }
  }

  /**
   * @internal
   * fireProgress calls the functions passed in via onProgress the method of the poller.
   *
   * It loops over all of the callbacks received from onProgress, and executes them, sending them
   * the current operation state.
   *
   * @param state - The current operation state.
   */
  private fireProgress(state: TState): void {
    for (const callback of this.pollProgressCallbacks) {
      callback(state);
    }
  }

  /**
   * @internal
   * Invokes the underlying operation's cancel method, and rejects the
   * pollUntilDone promise.
   */
  private async cancelOnce(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    this.operation = await this.operation.cancel(options);
    if (this.reject) {
      this.reject(new PollerCancelledError("Poller cancelled"));
    }
  }

  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   *
   * It only optionally receives an object with an abortSignal property, from \@azure/abort-controller's AbortSignalLike.
   *
   * @param options - Optional properties passed to the operation's update method.
   */
  public poll(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    if (!this.pollOncePromise) {
      this.pollOncePromise = this.pollOnce(options);
      const clearPollOncePromise = (): void => {
        this.pollOncePromise = undefined;
      };
      this.pollOncePromise.then(clearPollOncePromise, clearPollOncePromise).catch(this.reject);
    }
    return this.pollOncePromise;
  }

  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  public async pollUntilDone(): Promise<TResult> {
    if (this.stopped) {
      this.startPolling().catch(this.reject);
    }
    return this.promise;
  }

  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  public onProgress(callback: (state: TState) => void): CancelOnProgress {
    this.pollProgressCallbacks.push(callback);
    return (): void => {
      this.pollProgressCallbacks = this.pollProgressCallbacks.filter((c) => c !== callback);
    };
  }

  /**
   * Returns true if the poller has finished polling.
   */
  public isDone(): boolean {
    const state: PollOperationState<TResult> = this.operation.state;
    return Boolean(state.isCompleted || state.isCancelled || state.error);
  }

  /**
   * Stops the poller from continuing to poll.
   */
  public stopPolling(): void {
    if (!this.stopped) {
      this.stopped = true;
      if (this.reject) {
        this.reject(new PollerStoppedError("This poller is already stopped"));
      }
    }
  }

  /**
   * Returns true if the poller is stopped.
   */
  public isStopped(): boolean {
    return this.stopped;
  }

  /**
   * Attempts to cancel the underlying operation.
   *
   * It only optionally receives an object with an abortSignal property, from \@azure/abort-controller's AbortSignalLike.
   *
   * If it's called again before it finishes, it will throw an error.
   *
   * @param options - Optional properties passed to the operation's update method.
   */
  public cancelOperation(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    if (!this.stopped) {
      this.stopped = true;
    }
    if (!this.cancelPromise) {
      this.cancelPromise = this.cancelOnce(options);
    } else if (options.abortSignal) {
      throw new Error("A cancel request is currently pending");
    }
    return this.cancelPromise;
  }

  /**
   * Returns the state of the operation.
   *
   * Even though TState will be the same type inside any of the methods of any extension of the Poller class,
   * implementations of the pollers can customize what's shared with the public by writing their own
   * version of the `getOperationState` method, and by defining two types, one representing the internal state of the poller
   * and a public type representing a safe to share subset of the properties of the internal state.
   * Their definition of getOperationState can then return their public type.
   *
   * Example:
   *
   * ```ts
   * // Let's say we have our poller's operation state defined as:
   * interface MyOperationState extends PollOperationState<ResultType> {
   *   privateProperty?: string;
   *   publicProperty?: string;
   * }
   *
   * // To allow us to have a true separation of public and private state, we have to define another interface:
   * interface PublicState extends PollOperationState<ResultType> {
   *   publicProperty?: string;
   * }
   *
   * // Then, we define our Poller as follows:
   * export class MyPoller extends Poller<MyOperationState, ResultType> {
   *   // ... More content is needed here ...
   *
   *   public getOperationState(): PublicState {
   *     const state: PublicState = this.operation.state;
   *     return {
   *       // Properties from PollOperationState<TResult>
   *       isStarted: state.isStarted,
   *       isCompleted: state.isCompleted,
   *       isCancelled: state.isCancelled,
   *       error: state.error,
   *       result: state.result,
   *
   *       // The only other property needed by PublicState.
   *       publicProperty: state.publicProperty
   *     }
   *   }
   * }
   * ```
   *
   * You can see this in the tests of this repository, go to the file:
   * `../test/utils/testPoller.ts`
   * and look for the getOperationState implementation.
   */
  public getOperationState(): TState {
    return this.operation.state;
  }

  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  public getResult(): TResult | undefined {
    const state: PollOperationState<TResult> = this.operation.state;
    return state.result;
  }

  /**
   * Returns a serialized version of the poller's operation
   * by invoking the operation's toString method.
   */
  public toString(): string {
    return this.operation.toString();
  }
}
