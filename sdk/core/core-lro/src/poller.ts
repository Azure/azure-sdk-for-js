import { PollOperation } from "./pollOperation";

export type CancelOnProgress = () => void;

export interface PollProgressSubscriber<TProperties, TResult> {
  id: string;
  conditional: (op?: PollOperation<TProperties, TResult>) => boolean;
  callback: (op?: PollOperation<TProperties, TResult>) => void;
}

export abstract class Poller<TProperties, TResult> {
  private stopped: boolean;
  private resolve?: (value?: TResult) => void;
  private reject?: (error: Error) => void;
  private pollOncePromise?: Promise<void>;
  private cancelPromise?: Promise<PollOperation<TProperties, TResult>>;
  private promise: Promise<TResult>;
  private pollProgressSubscribers: PollProgressSubscriber<TProperties, TResult>[] = [];
  public operation: PollOperation<TProperties, TResult>;

  constructor(operation: PollOperation<TProperties, TResult>, stopped: boolean = false) {
    this.operation = operation;
    this.stopped = stopped;
    this.promise = new Promise(
      (
        resolve: (result?: TResult) => void,
        reject: (error: Error) => void
      ) => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
    this.operation.state.started = true;
    this.startPolling();
  }

  abstract async delay(): Promise<void>;
  abstract async getResult(): Promise<TResult | undefined>;

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

  public poll(): Promise<void> {
    if (!this.pollOncePromise) {
      this.pollOncePromise = this.pollOnce();
      this.pollOncePromise.finally(() => {
        for (const subscriber of this.pollProgressSubscribers) {
          if (subscriber.conditional(this.operation)) {
            subscriber.callback(this.operation);
          }
        }
        this.pollOncePromise = undefined;
      });
    }
    return this.pollOncePromise;
  }

  public done(): Promise<TResult | undefined> {
    return this.promise;
  }

  public onProgress(
    conditional: (op?: PollOperation<TProperties, TResult>) => boolean,
    callback: (op?: PollOperation<TProperties, TResult>) => void
  ): CancelOnProgress {
    const id = Math.random().toString();
    this.pollProgressSubscribers.push({
      id,
      conditional,
      callback
    });
    return (): void => {
      const subscribers: PollProgressSubscriber<TProperties, TResult>[] = [];
      for (const subscriber of this.pollProgressSubscribers) {
        if (subscriber.id !== id) {
          subscribers.push(subscriber);
        }
      }
      this.pollProgressSubscribers = subscribers;
    };
  }

  public clearSubscribers() {
    this.pollProgressSubscribers = [];
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

  public cancel(): Promise<PollOperation<TProperties, TResult>> {
    if (!this.cancelPromise) {
      this.cancelPromise = this.operation.cancel();
      // this.cancelPromise.catch() doesn't let you bubble up the error,
      // and prevents upper scopes from handling the error.
      (async () => {
        try {
          if (this.cancelPromise) {
            await this.cancelPromise;
          }
        } catch (e) {}
        this.operation.state.cancelled = true;
      })();
    }
    return this.cancelPromise;
  }

  public toJSON(): string {
    return this.operation.toString();
  }
}
