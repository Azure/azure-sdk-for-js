import { EventEmitter } from "events";
import { delay, HttpOperationResponse, RequestOptionsBase, ServiceClient } from "@azure/core-http";

export interface PollerOptionalParameters<States> {
  manual?: boolean;
  intervalInMs?: number;
  state?: States;
  client?: ServiceClient;
  initialResponse?: HttpOperationResponse;
  previousResponse?: HttpOperationResponse;
  requestOptions?: RequestOptionsBase;
  stopped?: boolean;
}

export abstract class Poller<States, Result> extends EventEmitter  {
  private readonly manual: boolean = false;
  private stopped: boolean = false;
  private intervalInMs: number = 1000;
  private _state: States;
  protected readonly client: ServiceClient;
  protected initialResponse?: HttpOperationResponse;
  protected previousResponse?: HttpOperationResponse;
  protected requestOptions: RequestOptionsBase | undefined;
  public stopped: boolean;

  constructor(options: PollerOptionalParameters) {
    this.manual = Boolean(options.manual);
    this.intervalInMs = Number(options.intervalInMs);
    this.client = options.client;
    this.initialResponse = options.initialResponse;
    this.previousResponse = options.previousResponse;
    this.requestOptions = options.requestOptions;
    this.stopped = Boolean(options.stopped);

    if (options.state) this._state = options.state;
    if (this.manual) return;
    this.poll();
  }

  protected abstract getStateFromResponse(
    response: HttpOperationResponse
  ): LongRunningOperationStates;

  protected abstract async sendRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse>;

  protected async processResponse(response: HttpOperationResponse): Promise<void | Result> {
    if (!this.initialResponse) this.initialResponse = response;
    this.previousResponse = response;
    this.emit("newResponse", response, this);
    this.state = this.getStateFromResponse(response);
    if (this.isDone()) {
      const result = await this.finalRequest();
      this.emit("done", result);
      return result;
    }
  }

  protected async poll(): Promise<void> {
    if (this.manual) return;
    try {
      if (!this.initialResponse) {
        await this.processResponse(await this.initialRequest(this.requestOptions));
      }
      while (!this.isDone()) {
        const interval: number = this.intervalInMs || this.getInterval();
        await delay(interval);
        await this.processResponse(await this.sendRequest());
      }
    } catch(e) {
      this.emit("pollError", e, this);
      throw e;
    }
  }

  public abstract async initialRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse>;

  public abstract async finalRequest(options?: RequestOptionsBase): Promise<Result>;

  public abstract async cancelRequest(options?: RequestOptionsBase): Promise<void>;

  public abstract isDone(): boolean;

  public set state(newState: LongRunningOperationStates) {
    const newState = this.state !== newState;
    this._state = newState;
    if (newState) {
      this.emit("newState", newState, this);
    }
  }

  public get state(): LongRunningOperationStates {
    return this._state;
  }

  public getInterval(): number {
    return this.intervalInMs;
  }
 
  public async pollOnce(options?: RequestOptionsBase): Promise<void | Result> {
    if (!this.manual) throw new Error("Manual retries are disabled on this poller");
    try {
      if (!this.initialResponse) {
        await this.processResponse(await this.initialRequest(this.requestOptions));
      }
      return await this.processResponse(await this.sendRequest());
    } catch (e) {
      this.emit("pollError", e, this);
      throw e;
    }
  }

  public done(): Promise<void | Result | Error> {
    return new Promise((resolve, reject) => {
      this.on("done", resolve);
      this.on("pollError", reject);
    });
  }

  public stop(): void {
    this.stopped = true;
  }

  public toJSON(): PollerOptionalParameters {
    return {
      manual: this.manual,
      intervalInMs: this.intervalInMs,
      state: this.state
      initialResponse: this.initialResponse,
      previousResponse: this.previousResponse,
      requestOptions: this.requestOptions,
    };
  }
}
