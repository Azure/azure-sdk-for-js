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
}

export type PollerStateChangeSubscriber = (state?: LongRunningOperationStates, poller?: Poller) => void;

export abstract class Poller {
  private forgotten: boolean = false;
  private intervalInMs: number = 1000;
  private stateChangeSubscribers: PollerStateChangeSubscriber[] = [];
  private initialResponse?: HttpOperationResponse;
  protected readonly manual: boolean = false;
  protected abortSignal?: AbortSignal;
  protected previousResponse?: HttpOperationResponse;
  protected requestOptions: RequestOptionsBase | undefined;
  private _state: LongRunningOperationStates = "InProgress";

  constructor(options: PollerOptionalParameters) {
    if (typeof options.manual === "boolean") this.manual = options.manual;
    this.intervalInMs = Number(options.intervalInMs);
    this.requestOptions = options.requestOptions;
    if (options.state) this._state = options.state;
    if (this.manual || options.noInitialRequest) return;
    this.initialRequest().then(() => this.poll());
  }

  protected isDone(state?: LongRunningOperationStates): boolean {
    return this.forgotten || terminalStates.includes(state || this.state);
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
  };

  protected async poll(): Promise<void> {
    if (this.manual) return;
    while (!this.isDone()) {
      const interval: number = this.intervalInMs || this.getInterval();
      await delay(interval);
      await this.sendRequest();
    }
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

  public async retry(): Promise<void> {
    if (!this.manual) throw new Error("Manual retries are disabled on this poller");
    if (!this.initialResponse) await this.initialRequest();
    return this.sendRequest();
  }

  public nextResponse(): Promise<HttpOperationResponse> {
    return new Promise(resolve => {
      this.onStateChange(() => {
        resolve(this.previousResponse);
      });
    });
  }
 
  public done(): Promise<LongRunningOperationStates | undefined> {
    return new Promise(resolve => {
      this.onStateChange(state => {
        if (this.isDone()) {
          resolve(state);
        }
      });
    });
  }

  public forget(): void {
    this.forgotten = true;
  }

  public toJSON(): PollerOptionalParameters {
    return {
      abortSignal: this.abortSignal,
      initialResponse: this.initialResponse,
      intervalInMs: this.intervalInMs,
      manual: this.manual,
      previousResponse: this.previousResponse,
      requestOptions: this.requestOptions,
      state: this.state,
    };
  }
}
