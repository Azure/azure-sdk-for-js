// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay as coreDelay } from "./delay";

export interface RetryState {
  startTime: number;
  retryCount: number;
}

export type BooleanOperation<TState> = (state: RetryState & TState) => Promise<boolean>;

export interface RetryOptions<TState> {
  shouldRetry?: BooleanOperation<TState>;
  operation: BooleanOperation<TState>;
  delay: (state: RetryState & TState) => Promise<void>;
}

export async function retry<TState>(options: RetryOptions<TState>): Promise<void> {
  const { shouldRetry, operation, delay } = options;
  const state: RetryState = {
    startTime: Date.now(),
    retryCount: 0
  };
  do {
    if (await operation(<RetryState & TState>state)) {
      break;
    }
    await delay(<RetryState & TState>state);
    state.retryCount += 1;
  } while (shouldRetry ? await shouldRetry(<RetryState & TState>state) : false);
}

export type LinearRetryOptions = Omit<RetryOptions<RetryState>, "shouldRetry" | "delay"> & {
  maxRetries: number;
  retryDelayInMs: number;
};

/**
 * Retries every `retryDelayInMs` until `maxRetries` is reached.
 */
export async function linearRetry(options: LinearRetryOptions): Promise<void> {
  return retry({
    ...options,
    async shouldRetry(state) {
      return state.retryCount < options.maxRetries;
    },
    async delay() {
      await coreDelay(options.retryDelayInMs);
    }
  });
}

export type ExponentialRetryOptions = Omit<RetryOptions<RetryState>, "shouldRetry" | "delay"> & {
  maxRetries: number;
  retryDelayInMs: number;
  multiplier: number;
};

/**
 * Retries every `retryDelayInMs`, multiplied by the `multiplier` at the power of the retry count, until `maxRetries` is reached.
 */
export async function exponentialRetry(options: ExponentialRetryOptions): Promise<void> {
  return retry({
    ...options,
    async shouldRetry(state) {
      return state.retryCount < options.maxRetries;
    },
    async delay(state) {
      const delayTime = options.retryDelayInMs * Math.pow(options.multiplier, state.retryCount);
      await coreDelay(delayTime);
    }
  });
}
