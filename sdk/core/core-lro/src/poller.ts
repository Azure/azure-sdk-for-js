// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperation, PollOperationState } from "./pollOperation";
import { AbortSignalLike } from "@azure/abort-controller";

export type CancelOnProgress = () => void;

export type PollProgressCallback<TState> = (state: TState) => void;

export class PollerStoppedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PollerStoppedError";
    Object.setPrototypeOf(this, PollerStoppedError.prototype);
  }
}

export class PollerCancelledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PollerCancelledError";
    Object.setPrototypeOf(this, PollerCancelledError.prototype);
  }
}

export interface PollerLike<TState, TResult> {
  poll(options?: { abortSignal?: AbortSignal }): Promise<void>;
  pollUntilDone(): Promise<TResult>;
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  isDone(): boolean;
  stopPolling(): void;
  isStopped(): boolean;
  cancelOperation(options?: { abortSignal?: AbortSignal }): Promise<void>;
  getOperationState(): PollOperationState<TResult>;
  getResult(): TResult | undefined;
  toString(): string;
}

export abstract class Poller<TState, TResult> implements PollerLike<TState, TResult> {
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

  protected abstract async delay(): Promise<void>;

  private async startPolling(): Promise<void> {
    if (this.stopped) {
      this.stopped = false;
    }
    while (!this.isStopped() && !this.isDone()) {
      await this.poll();
      await this.delay();
    }
  }

  private async pollOnce(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    const state = this.getOperationState();
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

  private fireProgress(state: TState): void {
    for (const callback of this.pollProgressCallbacks) {
      callback(state);
    }
  }

  private async cancelOnce(options: { abortSignal?: AbortSignal } = {}): Promise<void> {
    this.operation = await this.operation.cancel(options);
    if (this.reject) {
      this.reject(new PollerCancelledError("Poller cancelled"));
    }
  }

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

  public async pollUntilDone(): Promise<TResult> {
    if (this.stopped) {
      this.startPolling().catch(this.reject);
    }
    return this.promise;
  }

  public onProgress(callback: (state: TState) => void): CancelOnProgress {
    this.pollProgressCallbacks.push(callback);
    return (): void => {
      this.pollProgressCallbacks = this.pollProgressCallbacks.filter((c) => c !== callback);
    };
  }

  public isDone(): boolean {
    const state = this.getOperationState();
    return Boolean(state.isCompleted || state.isCancelled || state.error);
  }

  public stopPolling(): void {
    if (!this.stopped) {
      this.stopped = true;
      if (this.reject) {
        this.reject(new PollerStoppedError("This poller is already stopped"));
      }
    }
  }

  public isStopped(): boolean {
    return this.stopped;
  }

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

  public getOperationState(): PollOperationState<TResult> {
    return this.operation.state;
  }

  public getResult(): TResult | undefined {
    const state = this.getOperationState();
    return state.result;
  }

  public toString(): string {
    return this.operation.toString();
  }
}
