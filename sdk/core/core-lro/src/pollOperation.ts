// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

/**
 * PollOperationState contains an opinionated list of the smallest set of properties needed
 * to define any long running operation poller.
 */
export interface PollOperationState<TResult> {
  isStarted?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  error?: Error;
  result?: TResult;
}

export interface PollOperation<TState, TResult> {
  state: TState;
  update(options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: TState) => void;
  }): Promise<PollOperation<TState, TResult>>;
  cancel(options?: { abortSignal?: AbortSignal }): Promise<PollOperation<TState, TResult>>;
  toString(): string;
}
