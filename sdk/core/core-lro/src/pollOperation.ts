export interface PollOperationState {
  started?: boolean;
  completed?: boolean;
  cancelled?: boolean;
  error?: Error;
}

export interface PollOperation<TProperties> {
  state: PollOperationState;
  properties: TProperties;
  update(): Promise<PollOperation<TProperties>>;
  cancel(): Promise<PollOperation<TProperties>>;
  toString(): string;
}
