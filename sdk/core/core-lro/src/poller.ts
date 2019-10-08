import { PollOperation, PollOperationState } from "./pollOperation";
import { AbortSignalLike } from "@azure/abort-controller";

export type CancelOnProgress = () => void;

export type PollProgressCallback<TProperties> = (properties: TProperties) => void;

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

export abstract class Poller<TProperties, TResult> {
  private stopped: boolean;
  private resolve?: (value?: TResult) => void;
  private reject?: (error: PollerStoppedError | PollerCancelledError | Error) => void;
  private pollOncePromise?: Promise<void>;
  private cancelPromise?: Promise<void>;
  private operation: PollOperation<TProperties, TResult>;
  private promise: Promise<TResult>;
  private pollProgressCallbacks: PollProgressCallback<TProperties>[] = [];

  constructor(operation: PollOperation<TProperties, TResult>, stopped: boolean = false) {
    this.operation = operation;
    this.stopped = stopped;
    this.promise = new Promise(
      (
        resolve: (result?: TResult) => void,
        reject: (error: PollerStoppedError | PollerCancelledError | Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
    this.startPolling();
  }

  protected abstract async delay(): Promise<void>;

  private async startPolling(): Promise<void> {
    while (!this.isStopped() && !this.isDone()) {
      await this.poll();
      if (!this.operation.state.started) {
        this.operation.state.started = true;
      }
      await this.delay();
    }
  }

  private async pollOnce(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    try {
      if (!this.isDone()) {
        this.operation = await this.operation.update({
          abortSignal: options.abortSignal,
          fireProgress: this.fireProgress.bind(this)
        });
        if (this.isDone() && this.resolve) {
          this.resolve(this.operation.state.result);
        }
      }
    } catch (e) {
      this.operation.state.error = e;
      if (this.reject) {
        this.reject(e);
      }
    }
  }

  private fireProgress(properties: TProperties): void {
    for (const callback of this.pollProgressCallbacks) {
      callback(properties);
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
      const after = (): void => {
        this.pollOncePromise = undefined;
      };
      this.pollOncePromise.then(after, after);
    } else {
      throw new Error(
        "This poller is in automatic mode. You can get its current status with the .getState() method. To poll manually, pass { manual: true } when creating the poller."
      );
    }
    return this.pollOncePromise;
  }

  public done(): Promise<TResult | undefined> {
    return this.promise;
  }

  public onProgress(callback: (properties: TProperties) => void): CancelOnProgress {
    this.pollProgressCallbacks.push(callback);
    return (): void => {
      this.pollProgressCallbacks = this.pollProgressCallbacks.filter((c) => c !== callback);
    };
  }

  public isDone(): boolean {
    return Boolean(
      this.operation.state.completed || this.operation.state.cancelled || this.operation.state.error
    );
  }

  public stop(): void {
    if (!this.stopped) {
      this.stopped = true;
      if (this.reject) {
        this.reject(new PollerStoppedError("Poller stopped"));
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

  public getState(): PollOperationState<TResult> {
    return this.operation.state;
  }

  public getProperties(): TProperties {
    return this.operation.properties;
  }

  public toJSON(): string {
    return this.operation.toString();
  }
}
