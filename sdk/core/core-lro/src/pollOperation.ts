export interface PollOperationState<T> {
  completed?: boolean;
  cancelled?: boolean;
  error?: Error;
  properties: T;
}

export interface PollOperation<T> {
  state: PollOperationState<T>;
  update(): Promise<PollOperation<T>>;
  cancel(): Promise<PollOperation<T>>;
}
