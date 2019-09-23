import { EventEmitter } from "events";
import { delay, HttpOperationResponse, RequestOptionsBase, ServiceClient } from "@azure/core-http";

export interface PollerOptionalParameters<TStates> {
  manual?: boolean;
  intervalInMs?: number;
  state?: TStates;
  client?: ServiceClient;
  initialResponse?: HttpOperationResponse;
  previousResponse?: HttpOperationResponse;
  requestOptions?: RequestOptionsBase;
  stopped?: boolean;
}

export abstract class Poller<TStates, TResult> extends EventEmitter  {
  private readonly manual: boolean;
  private intervalInMs: number;
  private _state: TStates;
  protected readonly client: ServiceClient;
  protected initialResponse?: HttpOperationResponse;
  protected previousResponse?: HttpOperationResponse;
  protected requestOptions?: RequestOptionsBase;
  public stopped: boolean;

  constructor(options: PollerOptionalParameters) {
    this.manual = options.manual;
    this.intervalInMs = options.intervalInMs | 1000;
    this.client = options.client;
    this.initialResponse = options.initialResponse;
    this.previousResponse = options.previousResponse;
    this.requestOptions = options.requestOptions;
    this.stopped = options.stopped;

    if (options.state) {
      this._state = options.state;
    }
    if (!this.manual) {
      this.poll();
    }
  }

  protected abstract getStateFromResponse(
    response: HttpOperationResponse
  ): TStates;

  protected abstract async sendRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse>;

  public abstract async initialRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse>;

  public abstract async finalRequest(options?: RequestOptionsBase): Promise<TResult>;

  public abstract async cancelRequest(options?: RequestOptionsBase): Promise<void>;

  public abstract isDone(): boolean;
 
  protected async processResponse(response: HttpOperationResponse): Promise<void | TResult> {
    if (!this.initialResponse) {
      this.initialResponse = response;
    }

    this.previousResponse = response;
    this.state = this.getStateFromResponse(response);
    this.emit("newResponse", response, this);

    if (this.isDone()) {
      const result = await this.finalRequest();
      this.emit("done", result);
      return result;
    }
  }

  protected async poll(): Promise<void> {
    if (this.manual) {
      return;
    }
    try {
      if (!this.initialResponse) {
        await this.processResponse(await this.initialRequest(this.requestOptions));
      }
      while (!this.stopped || !this.isDone()) {
        await delay(this.intervalInMs);
        await this.processResponse(await this.sendRequest());
      }
    } catch(e) {
      this.emit("pollError", e, this);
      throw e;
    }
  }

  public set state(newState: TStates) {
    const newState = this.state !== newState;
    this._state = newState;
    if (newState) {
      this.emit("newState", newState, this);
    }
  }

  public get state(): TStates {
    return this._state;
  }

  public async pollOnce(options?: RequestOptionsBase): Promise<void | TResult> {
    if (!this.manual) {
      throw new Error("Manual retries are disabled on this poller");
    }
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

  public done(): Promise<void | TResult> {
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
