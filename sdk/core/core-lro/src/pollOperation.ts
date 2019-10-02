export interface PollOperationState<TResult> {
  started?: boolean;
  completed?: boolean;
  cancelled?: boolean;
  error?: Error;
  result?: TResult;
}

export interface PollOperation<TProperties, TResult> {
  state: PollOperationState<TResult>;
  properties: TProperties;
  update(): Promise<PollOperation<TProperties, TResult>>;
  cancel(): Promise<PollOperation<TProperties, TResult>>;
  toString(): string;
}
