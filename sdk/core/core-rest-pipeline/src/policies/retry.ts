// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";
import { PipelineResponse } from "../interfaces";
import { logger as coreLogger } from "../log";

export interface RetryState<TResponse> {
  startTime: number;
  retryCount: number;
  lastResponse?: TResponse;
}

export interface RetryOptions<TState, TResponse> {
  shouldRetry?: (state: RetryState<TResponse> & TState) => Promise<boolean>;
  logger?: AzureLogger;
  operation: (state: RetryState<TResponse> & TState) => Promise<TResponse>;
  delay: (state: RetryState<TResponse> & TState) => Promise<void>;
}

export async function retry<
  TRetryState = RetryState<PipelineResponse>,
  TResponse = PipelineResponse
>(options: RetryOptions<TRetryState, TResponse>): Promise<TResponse> {
  const { shouldRetry, operation, delay } = options;
  const logger = options.logger || coreLogger;
  const state: RetryState<TResponse> = {
    startTime: Date.now(),
    retryCount: 0
  };
  logger.info("Starting a retrying operation.");
  do {
    state.lastResponse = await operation(<RetryState<TResponse> & TRetryState>state);
    if (!shouldRetry || !(await shouldRetry(<RetryState<TResponse> & TRetryState>state))) {
      break;
    }
    logger.info("Waiting before a retry is attempted.");
    await delay(<RetryState<TResponse> & TRetryState>state);
    state.retryCount += 1;
    logger.info(`Retrying. Retry count ${state.retryCount}`);
  } while (true);
  return state.lastResponse;
}
