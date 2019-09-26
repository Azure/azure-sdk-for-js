import { PollOperation } from "./pollOperation";

type CancelOnProgress = () => void;

export abstract class Poller<TProperties, TResult> {
  private stopped: boolean;
  private resolve?: (value: TResult) => void;
  private reject?: (error: Error) => void;
  private pollOncePromise?: Promise<void>;
  private promise: Promise<TResult>;
  private onProgressCallback?: (op: PollOperation<TProperties>) => void;
  public operation: PollOperation<TProperties>;

  constructor(operation: PollOperation<TProperties>, stopped: boolean = false) {
    this.operation = operation;
    this.stopped = stopped;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.operation.state.started = true;
    if (!this.stopped) {
      this.startPolling();
    }
  }

  abstract async delay(): Promise<void>;
  abstract async getResult(): Promise<TResult>;

  private async startPolling(): Promise<void> {
    while (!this.isStopped() && !this.isDone()) {
      await this.poll();
      await this.delay();
    }
  }

  private async pollOnce(): Promise<void> {
    try {
      if (!this.isDone()) {
        this.operation = await this.operation.update();
        if (this.isDone() && this.resolve) {
          this.resolve(await this.getResult());
        }
      }
    } catch (e) {
      this.operation.state.error = e;
      if (this.reject) {
        this.reject(e);
      }
    }
  }

  public poll(): Promise<void> {
    if (!this.pollOncePromise) {
      this.pollOncePromise = this.pollOnce();
      this.pollOncePromise.finally(() => {
        if (this.onProgressCallback) {
          this.onProgressCallback(this.operation);
        }
        this.pollOncePromise = undefined;
      });
    }
    return this.pollOncePromise;
  }

  public done(): Promise<TResult> {
    return this.promise;
  }

  public onProgress(callback: (op: PollOperation<TProperties>) => void): CancelOnProgress {
    this.onProgressCallback = callback;
    return (): void => {
      this.onProgressCallback = undefined;
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
        this.reject(new Error("Poller stopped"));
      }
    }
  }

  public isStopped(): boolean {
    return this.stopped;
  }

  public async cancel(): Promise<void> {
    await this.operation.cancel();
    this.operation.state.cancelled = true;
  }

  public toJSON(): string {
    return this.operation.toString();
  }
}
