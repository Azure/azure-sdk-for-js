import { delay, HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import events from "events";
import { LongRunningOperationStates, terminalStates } from "./utils/constants"

export interface LongRunningOperationStateHistoryItem {
  state: LongRunningOperationStates,
  date: Date;
}

export interface PollerOptionalParameters {
  requestOptions?: RequestOptionsBase;
  millisecondInterval?: number;
  automatic?: boolean;
  options?: boolean;
}

export abstract class Poller extends events.EventEmitter {
  private millisecondInterval: number;
  private automatic: boolean;
  private state: LongRunningOperationStates = "InProgress";
  public readonly stateHistory: LongRunningOperationStateHistoryItem[] = [];
  public readonly responses: HttpOperationResponse[] = [];
  public requestOptions: RequestOptionsBase | undefined;
  public forgotten: boolean = false;
  public forgottenDate: Date | undefined;
  public startDate: Date | undefined;
  public finishDate: Date | undefined;

  constructor(options: PollerOptionalParameters) {
    super();
    this.requestOptions = options.requestOptions;
    this.millisecondInterval = options.millisecondInterval || 1000;
    this.automatic = typeof options.automatic === "boolean" ? options.automatic : false;
  }

  protected isFinished(state?: LongRunningOperationStates): boolean {
    return terminalStates.includes(state || this.state);
  }

  protected abstract getStateFromResponse(response: HttpOperationResponse): LongRunningOperationStates;

  protected processResponse(response: HttpOperationResponse): void {
    this.responses.push(response);
    this.setState(this.getStateFromResponse(response));
  }

  protected setState(newState: LongRunningOperationStates): void {
    this.state = newState;
    this.stateHistory.push({
      state: newState,
      date: new Date()
    })
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
      if (this.forgotten) return;
      const interval: number = this.millisecondInterval || this.getMillisecondInterval();
      await delay(interval);
      await this.sendPollRequest();
    } 
  }

  public pollUntilDone(): Promise<void> {
    return new Promise(respond => {
      this.on("Succeeded", respond);
    });
  }

  public forget(): void {
    this.forgotten = true;
    this.forgottenDate = new Date();
  }
}
