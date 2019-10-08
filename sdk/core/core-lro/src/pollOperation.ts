import { AbortSignalLike } from "@azure/abort-controller";

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
  update(options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: TProperties) => void;
  }): Promise<PollOperation<TProperties, TResult>>;
  cancel(options?: { abortSignal?: AbortSignal }): Promise<PollOperation<TProperties, TResult>>;
  toString(): string;
}
