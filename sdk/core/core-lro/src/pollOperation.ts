// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

export interface PollOperationState<TResult> {
  isStarted?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  error?: Error;
  result?: TResult;
}

export interface PollOperation<TState, TResult, TPossibleResponse = unknown> {
  state: TState;
  lastResponse?: TPossibleResponse;
  update(options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: TState) => void;
  }): Promise<PollOperation<TState, TResult, TPossibleResponse>>;
  cancel(options?: { abortSignal?: AbortSignal }): Promise<PollOperation<TState, TResult, TPossibleResponse>>;
  toString(): string;
}
