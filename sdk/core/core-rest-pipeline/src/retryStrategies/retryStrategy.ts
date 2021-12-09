// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";
import { PipelineResponse } from "../interfaces";
import { RestError } from "../restError";

/**
 * State that keeps track of the last retry and controls how to do the next retries.
 */
export interface RetryStrategyState {
  /**
   * Maximum number of retries.
   */
  maxRetries?: number;
  /**
   * Total number of retries so far.
   */
  retryCount: number;
  /**
   * A {@link PipelineResponse}, if the last retry attempt succeeded.
   */
  response?: PipelineResponse;
  /**
   * A {@link RestError}, if the last retry attempt failed.
   */
  responseError?: RestError;
  /**
   * Controls whether to retry in a given number of milliseconds.
   * If provided, a new retry will be attempted.
   */
  retryAfterInMs?: number;
  /**
   * Indicates to throw this error instead of retrying.
   */
  throwError?: RestError;
  /**
   * Indicates to retry against this URL.
   */
  redirectTo?: string;
}

/**
 * A retry strategy is intended to define whether to retry or not, and how to retry.
 */
export interface RetryStrategy {
  /**
   * Name of the retry strategy. Used for logging.
   */
  name: string;
  /**
   * Logger. If it's not provided, a default logger for all retry policies is used.
   */
  logger?: AzureLogger;
  /**
   * Function that determines whether to run the current strategy or skip it.
   * @param state - Retry state
   */
  meetsConditions?(state: RetryStrategyState): boolean;
  /**
   * Function that determines how to proceed with the subsequent requests.
   * @param state - Retry state
   */
  updateRetryState(state: RetryStrategyState): RetryStrategyState;
}
