import { delay, HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { AbortSignal } from "@azure/abort-controller";
import { LongRunningOperationStates, terminalStates } from "./utils/constants";

export interface PollerOptionalParameters {
  abortSignal?: AbortSignal;
  initialResponse?: HttpOperationResponse;
  intervalInMs?: number;
  manual?: boolean;
  noInitialRequest?: boolean;
  previousResponse?: HttpOperationResponse;
  requestOptions?: RequestOptionsBase;
  retries?: number;
  state?: LongRunningOperationStates;
  resources?: any;
}

export type PollerStateChangeSubscriber = (
  state?: LongRunningOperationStates,
  poller?: Poller
) => void;

export type PollErrorSubscriber = (e: Error) => void;

export abstract class Poller {
  private stopped: boolean = false;
  private intervalInMs: number = 1000;
  private stateChangeSubscribers: PollerStateChangeSubscriber[] = [];
  private pollErrorSubscribers: PollErrorSubscriber[] = [];
  private initialResponse?: HttpOperationResponse;
  private _state: LongRunningOperationStates = "InProgress";
  protected readonly manual: boolean = false;
  protected readonly resources: any;
  protected abortSignal?: AbortSignal;
  protected previousResponse?: HttpOperationResponse;
  protected requestOptions: RequestOptionsBase | undefined;

  constructor(options: PollerOptionalParameters) {
    if (typeof options.manual === "boolean") this.manual = options.manual;
    this.intervalInMs = Number(options.intervalInMs);
    this.requestOptions = options.requestOptions;
    if (options.state) this._state = options.state;
    if (options.resources) this.resources = options.resources;
    if (this.manual || options.noInitialRequest) return;
    this.initialRequest().then(() => this.loop());
  }

  protected isDone(state?: LongRunningOperationStates): boolean {
    return this.stopped || terminalStates.includes(state || this.state);
  }

  protected abstract getStateFromResponse(
    response: HttpOperationResponse
  ): LongRunningOperationStates;

  protected processResponse(response: HttpOperationResponse): void {
    if (!this.initialResponse) this.initialResponse = response;
    this.previousResponse = response;
    this.state = this.getStateFromResponse(response);
  }

  protected abstract async initialRequest(options?: RequestOptionsBase): Promise<void>;

  protected abstract async sendRequest(options?: RequestOptionsBase): Promise<void>;

  public getInterval(): number {
    return this.intervalInMs;
  }

  protected async loop(): Promise<void> {
    if (this.manual) return;
    try {
      while (!this.isDone()) {
        const interval: number = this.intervalInMs || this.getInterval();
        await delay(interval);
        await this.sendRequest();
      }
    } catch (e) {
      for (const subscriber of this.pollErrorSubscribers) {
        subscriber(e);
      }
    }
  }

  public onPollError(func: PollErrorSubscriber): void {
    this.pollErrorSubscribers.push(func);
  }

  public abstract async cancel(options?: RequestOptionsBase): Promise<void>;

  public set state(newState: LongRunningOperationStates) {
    this._state = newState;
    for (const subscriber of this.stateChangeSubscribers) {
      subscriber(newState, this);
    }
  }

  public get state(): LongRunningOperationStates {
    return this._state;
  }

  public onStateChange(func: PollerStateChangeSubscriber): void {
    this.stateChangeSubscribers.push(func);
  }

  public async poll(options?: RequestOptionsBase): Promise<void> {
    if (!this.manual) throw new Error("Manual retries are disabled on this poller");
    if (!this.initialResponse) await this.initialRequest(options);
    try {
      return await this.sendRequest(options);
    } catch (e) {
      for (const subscriber of this.pollErrorSubscribers) {
        subscriber(e);
      }
      throw e;
    }
  }

  public nextResponse(): Promise<HttpOperationResponse> {
    return new Promise((resolve) => {
      this.onStateChange(() => {
        resolve(this.previousResponse);
      });
    });
  }

  public done(): Promise<LongRunningOperationStates | undefined> {
    return new Promise((resolve, reject) => {
      this.onStateChange((state) => {
        if (this.isDone()) {
          resolve(state);
        }
      });
      this.onPollError(reject);
    });
  }

  public stop(): void {
    this.stopped = true;
  }

  public toJSON(): PollerOptionalParameters {
    return {
      abortSignal: this.abortSignal,
      initialResponse: this.initialResponse,
      intervalInMs: this.intervalInMs,
      manual: this.manual,
      previousResponse: this.previousResponse,
      requestOptions: this.requestOptions,
      state: this.state
    };
  }
}
