import {
  PollerStoppedError,
  PollerCancelledError,
  PollProgressCallback,
  PollOperation,
  PollOperationState,
  CancelOnProgress
} from "@azure/core-lro";
import { AbortSignalLike } from "@azure/core-http";

/**
 * Abstract representation of a poller, intended to expose just the minimal that the user needs to work with.
 *
 * This edit of the original interface changes getOperationState() to return TState,
 * which helps to expose any re-interpretation of the state of the operation being polled,
 * such as only publicly available properties.
 */
export interface KVPollerLike<TState extends PollOperationState<TResult>, TResult> {
  /**
   * A method that defines under what conditions to reach out to the underlying service.
   * It should call the operation's update method.
   */
  poll(options?: { abortSignal?: AbortSignal }): Promise<void>;
  /**
   * A method that will return a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(): Promise<TResult>;
  /**
   * A method used by the poller operation to report updates.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * A method that will return true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * A method that will stop the poller from continuing to poll.
   */
  stopPolling(): void;
  /**
   * A method that will return true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * A method that will try to cancel the underlying operation.
   */
  cancelOperation(options?: { abortSignal?: AbortSignal }): Promise<void>;
  /**
   * A method that will return the state of the operation.
   * TState can be a different type than the underlying operation's TState.
   */
  getOperationState(): TState;
  /**
   * A method that will return the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * A method intended to return a serialized version of the poller.
   */
  toString(): string;
}

/**
 * A class that represents the definition of a program that polls through consecutive requests
 * until it reaches a state of completion.
 *
 * This edit of the original interface changes getOperationState() to return TState,
 * which helps to expose any re-interpretation of the state of the operation being polled,
 * such as only publicly available properties.
 */
export abstract class KVPoller<TState extends PollOperationState<TResult>, TResult>
  implements KVPollerLike<TState, TResult> {
  private stopped: boolean = true;
  private resolve?: (value?: TResult) => void;
  private reject?: (error: PollerStoppedError | PollerCancelledError | Error) => void;
  private pollOncePromise?: Promise<void>;
  private cancelPromise?: Promise<void>;
  private promise: Promise<TResult>;
  private pollProgressCallbacks: PollProgressCallback<TState>[] = [];
  protected operation: PollOperation<TState, TResult>;

  constructor(operation: PollOperation<TState, TResult>) {
    this.operation = operation;
    this.promise = new Promise(
      (
        resolve: (result?: TResult) => void,
        reject: (error: PollerStoppedError | PollerCancelledError | Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
    // This prevents the UnhandledPromiseRejectionWarning in node.js from being thrown.
    // The above warning would get thrown if `poller.poll` is called, it returns an error,
    // and pullUntilDone did not have a .catch or await try/catch on it's return value.
    this.promise.catch(() => {});
  }

  /**
   * A method to determine how much to wait between pollings.
   */
  protected abstract async delay(): Promise<void>;

  /**
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
   * pollOnce does one polling, that is
   * to summon the update method of the underlying operation
   * and to make any relevant change effective.
   */
  private async pollOnce(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    const state: PollOperationState<TResult> = this.operation.state;
    try {
      if (!this.isDone()) {
        this.operation = await this.operation.update({
          abortSignal: options.abortSignal,
          fireProgress: this.fireProgress.bind(this)
        });
        if (this.isDone() && this.resolve) {
          this.resolve(state.result);
        }
      }
    } catch (e) {
      state.error = e;
      if (this.reject) {
        this.reject(e);
      }
      throw e;
    }
  }

  /**
   * A method exposed to the operation through the update method.
   * It calls the functions passed in via onProgress the method of the poller.
   */
  private fireProgress(state: TState): void {
    for (const callback of this.pollProgressCallbacks) {
      callback(state);
    }
  }

  /**
   * Invokes the underlying operation's cancel method, and rejects the
   * pollUntilDone promise.
   */
  private async cancelOnce(options: { abortSignal?: AbortSignal } = {}): Promise<void> {
    this.operation = await this.operation.cancel(options);
    if (this.reject) {
      this.reject(new PollerCancelledError("Poller cancelled"));
    }
  }

  /**
   * A method that defines under what conditions to reach out to the underlying service.
   * It should call the operation's update method.
   */
  public poll(options: { abortSignal?: AbortSignal } = {}): Promise<void> {
    if (!this.pollOncePromise) {
      this.pollOncePromise = this.pollOnce(options);
      const clearPollOncePromise = (): void => {
        this.pollOncePromise = undefined;
      };
      this.pollOncePromise.then(clearPollOncePromise, clearPollOncePromise);
    }
    return this.pollOncePromise;
  }

  /**
   * A method that will return a promise that will resolve once the underlying operation is completed.
   */
  public async pollUntilDone(): Promise<TResult> {
    if (this.stopped) {
      this.startPolling().catch(this.reject);
    }
    return this.promise;
  }

  /**
   * A method used by the poller operation to report updates.
   */
  public onProgress(callback: (state: TState) => void): CancelOnProgress {
    this.pollProgressCallbacks.push(callback);
    return (): void => {
      this.pollProgressCallbacks = this.pollProgressCallbacks.filter((c) => c !== callback);
    };
  }

  /**
   * A method that will return true if the poller has finished polling.
   */
  public isDone(): boolean {
    const state: PollOperationState<TResult> = this.operation.state;
    return Boolean(state.isCompleted || state.isCancelled || state.error);
  }

  /**
   * A method that will stop the poller from continuing to poll.
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
   * A method that will return true if the poller is stopped.
   */

  public isStopped(): boolean {
    return this.stopped;
  }

  /**
   * A method that will try to cancel the underlying operation.
   */
  public cancelOperation(options: { abortSignal?: AbortSignal } = {}): Promise<void> {
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
   * A method that will return the state of the operation.
   * TState can be a different type than the underlying operation's TState.
   */
  public abstract getOperationState(): TState;

  /**
   * A method that will return the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  public getResult(): TResult | undefined {
    const state: PollOperationState<TResult> = this.operation.state;
    return state.result;
  }

  /**
   * A method intended to return a serialized version of the poller.
   */
  public toString(): string {
    return this.operation.toString();
  }
}
