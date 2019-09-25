import { PollOperation } from "./pollOperation";

export abstract class Poller<T> {
  public stopped?: boolean;
  public operation: PollOperation<T>; 
  public promise: Promise<void>;

  constructor(
    operation: PollOperation<T>,
    stopped?: boolean,
  ) {
    this.operation = operation;
    this.stopped = stopped;
    this.promise = this.poll();
  }

  public get done(): boolean {
    return Boolean(
      this.operation.state.completed || 
      this.operation.state.cancelled || 
      this.operation.state.error
    );
  }

  async abstract delay(): Promise<void>;
 
  public async abstract poll(): Promise<void>;

  public stop(): void {
    this.stopped = true;
  }
}
