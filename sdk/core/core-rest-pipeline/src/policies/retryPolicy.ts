// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";
import { type AzureLogger, createClientLogger } from "@azure/logger";
import { DEFAULT_RETRY_POLICY_COUNT } from "../constants.js";

import {
  retryPolicy as tspRetryPolicy,
  type RetryStrategy as TspRetryStrategy,
} from "@typespec/ts-http-runtime/internal/policies";
import type { PipelineResponse } from "../interfaces.js";
import type { RestError } from "../restError.js";

const retryPolicyLogger = createClientLogger("core-rest-pipeline retryPolicy");

/**
 * Information provided to the retry strategy about the current progress of the retry policy.
 */
export interface RetryInformation {
  /**
   * A {@link PipelineResponse}, if the last retry attempt succeeded.
   */
  response?: PipelineResponse;
  /**
   * A {@link RestError}, if the last retry attempt failed.
   */
  responseError?: RestError;
  /**
   * Total number of retries so far.
   */
  retryCount: number;
}

/**
 * Properties that can modify the behavior of the retry policy.
 */
export interface RetryModifiers {
  /**
   * If true, allows skipping the current strategy from running on the retry policy.
   */
  skipStrategy?: boolean;
  /**
   * Indicates to retry against this URL.
   */
  redirectTo?: string;
  /**
   * Controls whether to retry in a given number of milliseconds.
   * If provided, a new retry will be attempted.
   */
  retryAfterInMs?: number;
  /**
   * Indicates to throw this error instead of retrying.
   */
  errorToThrow?: RestError;
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
   * Logger. If it's not provided, a default logger for all retry strategies is used.
   */
  logger?: AzureLogger;
  /**
   * Function that determines how to proceed with the subsequent requests.
   * @param state - Retry state
   */
  retry(state: RetryInformation): RetryModifiers;
}

/**
 * Options to the {@link retryPolicy}
 */
export interface RetryPolicyOptions {
  /**
   * Maximum number of retries. If not specified, it will limit to 3 retries.
   */
  maxRetries?: number;
  /**
   * Logger. If it's not provided, a default logger is used.
   */
  logger?: AzureLogger;
}

/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */
export function retryPolicy(
  strategies: RetryStrategy[],
  options: RetryPolicyOptions = { maxRetries: DEFAULT_RETRY_POLICY_COUNT },
): PipelinePolicy {
  // Cast is required since the TSP runtime retry strategy type is slightly different
  // very deep down (using real AbortSignal vs. AbortSignalLike in RestError).
  // In practice the difference doesn't actually matter.
  return tspRetryPolicy(strategies as TspRetryStrategy[], {
    logger: retryPolicyLogger,
    ...options,
  });
}
