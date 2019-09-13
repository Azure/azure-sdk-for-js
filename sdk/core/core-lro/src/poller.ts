import { delay, HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import events from "events";
import { LongRunningOperationStates, terminalStates } from "./utils/constants";

export interface LongRunningOperationStateHistoryItem {
  state: LongRunningOperationStates;
  date: Date;
}

export interface PollerOptionalParameters {
  automatic?: boolean;
  millisecondInterval?: number;
  requestOptions?: RequestOptionsBase;
  responses?: HttpOperationResponse[];
  startDate?: Date;
  state?: LongRunningOperationStates;
  stateHistory?: LongRunningOperationStateHistoryItem[];
}

export abstract class Poller extends events.EventEmitter {
  private automatic: boolean;
  private millisecondInterval: number = 1000;
  private state: LongRunningOperationStates = "InProgress";
  public finishDate: Date | undefined;
  public forgotten: boolean = false;
  public forgottenDate: Date | undefined;
  public requestOptions: RequestOptionsBase | undefined;
  public responses: HttpOperationResponse[] = [];
  public startDate: Date | undefined;
  public stateHistory: LongRunningOperationStateHistoryItem[] = [];

  constructor(options: PollerOptionalParameters) {
    super();
    this.automatic = typeof options.automatic === "boolean" ? options.automatic : false;
    if (!isNaN(options.millisecondInterval!))
      this.millisecondInterval = options.millisecondInterval!;
    this.requestOptions = options.requestOptions;
    if (Array.isArray(options.responses)) this.responses = options.responses;
    if (options.startDate instanceof Date) this.startDate = options.startDate;
    if (options.state) this.state = options.state;
    if (Array.isArray(options.stateHistory)) this.stateHistory = options.stateHistory;
  }

  protected isFinished(state?: LongRunningOperationStates): boolean {
    return this.forgotten || terminalStates.includes(state || this.state);
  }

  protected abstract getStateFromResponse(
    response: HttpOperationResponse
  ): LongRunningOperationStates;

  protected processResponse(response: HttpOperationResponse): void {
    this.responses.push(response);
    this.setState(this.getStateFromResponse(response));
  }

  protected setState(newState: LongRunningOperationStates): void {
    this.state = newState;
    this.stateHistory.push({
      state: newState,
      date: new Date()
    });
    if (this.isFinished()) {
      this.finishDate = new Date();
    }
    this.emit(newState, this);
  }

  public getState(): LongRunningOperationStates {
    return this.state;
  }

  public abstract async sendPollRequest(): Promise<void>;

  public async retry(): Promise<void> {
    if (this.automatic) throw new Error("Manual retries are disabled on an automatic poller");
    return this.sendPollRequest();
  }

  protected abstract getMillisecondInterval(): number;

  public async startPolling(): Promise<void> {
    this.poll();
  }

  protected async poll(): Promise<void> {
    if (!this.automatic) return;
    this.startDate = new Date();
    while (!this.isFinished()) {
      const interval: number = this.millisecondInterval || this.getMillisecondInterval();
      await delay(interval);
      await this.sendPollRequest();
    }
  }

  public pollUntilDone(): Promise<void> {
    return new Promise((respond) => {
      this.on("Succeeded", respond);
    });
  }

  public forget(): void {
    this.forgotten = true;
    this.forgottenDate = new Date();
  }

  public serialize(): string {
    return JSON.stringify({
      automatic: this.automatic,
      millisecondInterval: this.millisecondInterval,
      requestOptions: this.requestOptions,
      responses: this.responses,
      startDate: this.startDate,
      state: this.state,
      stateHistory: this.stateHistory
    });
  }
}
