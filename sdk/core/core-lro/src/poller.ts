import { PollOperation } from "./pollOperation";

export type CancelOnProgress = () => void;

export type PollProgressCallback<TProperties> = (properties: TProperties) => void;

export class PollerStoppedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PollerStoppedError";
    Object.setPrototypeOf(this, PollerStoppedError.prototype);
  }
}

export abstract class Poller<TProperties, TResult> {
  private stopped: boolean;
  private resolve?: (value?: TResult) => void;
  private reject?: (error: PollerStoppedError | Error) => void;
  private pollOncePromise?: Promise<void>;
  private cancelPromise?: Promise<PollOperation<TProperties, TResult>>;
  private promise: Promise<TResult>;
  private pollProgressCallbacks: PollProgressCallback<TProperties>[] = [];
  public operation: PollOperation<TProperties, TResult>;

  constructor(operation: PollOperation<TProperties, TResult>, stopped: boolean = false) {
    this.operation = operation;
    this.stopped = stopped;
    this.promise = new Promise(
      (
        resolve: (result?: TResult) => void,
        reject: (error: PollerStoppedError | Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
    this.startPolling();
  }

  abstract async delay(): Promise<void>;
  abstract async getResult(): Promise<TResult | undefined>;

  private async startPolling(): Promise<void> {
    while (!this.isStopped() && !this.isDone()) {
      await this.poll();
      if (!this.operation.state.started) {
        this.operation.state.started = true;
      }
      await this.delay();
    }
  }

  private async pollOnce(): Promise<void> {
    try {
      if (!this.isDone()) {
        this.operation = await this.operation.update(this.fireProgress.bind(this));
        if (this.isDone() && this.resolve) {
          const result = await this.getResult();
          this.operation.state.result = result;
          this.resolve(result);
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

  private async cancelOnce(): Promise<PollOperation<TProperties, TResult>> {
    try {
      const result = this.operation.cancel();
      this.operation.state.cancelled = true;
      return result;
    } catch (e) {
      this.operation.state.cancelled = true;
      throw e;
    }
  }

  public poll(): Promise<void> {
    if (!this.pollOncePromise) {
      this.pollOncePromise = this.pollOnce();
      this.pollOncePromise.finally(() => {
        this.pollOncePromise = undefined;
      });
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

  public cancel(): Promise<PollOperation<TProperties, TResult>> {
    if (!this.cancelPromise) {
      this.cancelPromise = this.cancelOnce();
    }
    return this.cancelPromise;
  }

  public toJSON(): string {
    return this.operation.toString();
  }
}
