// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { calculateRetryDelay, delay } from "@azure/core-util";
import { logger } from "./logger.js";
import { createError } from "./utils.js";

export const Constants = {
  defaultOperationTimeoutInMs: 60000,
  reconnectLimit: 100,
  aadTokenValidityMarginInMs: 5000,
  connectionReconnectDelay: 300,
  defaultMaxRetries: 3,
  defaultMaxRetriesForConnection: 150,
  defaultDelayBetweenOperationRetriesInMs: 30000,
  defaultMaxDelayForExponentialRetryInMs: 90000,
} as const;

/**
 * Describes the Retry Mode type
 */
export type RetryMode = "Exponential" | "Fixed";

/**
 * Retry policy options that determine the mode, number of retries, retry interval etc.
 */
export interface RetryOptions {
  /**
   * Number of times the operation needs to be retried in case
   * of retryable error. Default: 3.
   */
  maxRetries?: number;
  /**
   * Amount of time to wait in milliseconds before making the
   * next attempt. Default: `30000 milliseconds`.
   * When `mode` option is set to `Exponential`,
   * this is used to compute the exponentially increasing delays between retries.
   */
  retryDelayInMs?: number;
  /**
   * Number of milliseconds to wait before declaring that current attempt has timed out which will trigger a retry
   * A minimum value of `60000` milliseconds will be used if a value not greater than this is provided.
   */
  timeoutInMs?: number;
  /**
   * Denotes which retry mode to apply. If undefined, defaults to `Exponential`
   */
  mode?: RetryMode;
  /**
   * Denotes the maximum delay between retries
   * that the retry attempts will be capped at. Applicable only when performing exponential retry.
   */
  maxRetryDelayInMs?: number;
}

/**
 * Calculates delay between retries, in milliseconds.
 */
function calculateDelay(
  attemptCount: number,
  retryDelayInMs: number,
  maxRetryDelayInMs: number,
  mode: RetryMode,
): number {
  return mode === "Fixed"
    ? retryDelayInMs
    : calculateRetryDelay(attemptCount, { retryDelayInMs, maxRetryDelayInMs }).retryAfterInMs;
}

/**
 * Describes the retryable operation options
 */
interface RetryFuncOptions {
  /**
   * A function that can be used to determine if the error is retryable or not
   */
  isRetryable?: (err: unknown) => boolean;
  /**
   * Abort signal that can be used to cancel the retryable operation
   */
  abortSignal?: AbortSignal;
}

export interface AbortableOperationOptions {
  abortSignal?: AbortSignal;
}

/**
 * Creates a RetryOptions object filling missing options with default values
 */
export function createFullRetryOptions(options: RetryOptions = {}): Required<RetryOptions> {
  const {
    maxRetries = Constants.defaultMaxRetries,
    maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs,
    mode = "Exponential",
    retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs,
    timeoutInMs = Constants.defaultOperationTimeoutInMs,
  } = options;
  return {
    maxRetries,
    maxRetryDelayInMs,
    mode,
    retryDelayInMs,
    timeoutInMs,
  };
}

/**
 * Every operation is attempted at least once. Additional attempts are made if the previous attempt failed
 * with a retryable error. The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * If `mode` option is set to `Fixed`, then the retries are made on the
 * given operation for a specified number of times, with a fixed delay in between each retry each time.
 *
 * If `mode` option is set to `Exponential`, then the delay between retries is adjusted to increase
 * exponentially with each attempt using back-off factor of power 2.
 *
 * @param operation - The operation to try
 * @param operationId - The operation identifier
 * @param retryOptions - The complete retry options
 * @param opts - Options for the retryable operation
 *
 * @returns The result of the operation
 */
export async function retry<T>(
  operation: (opts?: AbortableOperationOptions) => Promise<T>,
  operationId: string,
  retryOptions: Required<RetryOptions>,
  opts: RetryFuncOptions = {},
): Promise<T> {
  const { abortSignal, isRetryable } = opts;
  const { maxRetries, maxRetryDelayInMs, mode, retryDelayInMs, timeoutInMs } = retryOptions;
  const errors: unknown[] = [];
  const state = { totalNumberOfAttempts: maxRetries + 1, attemptNumber: 1 };
  const abortErrorMsg = `The operation was aborted.`;
  for (
    state.attemptNumber = 1;
    state.attemptNumber <= state.totalNumberOfAttempts;
    state.attemptNumber++
  ) {
    logger.verbose(`[${operationId}] Attempt #${state.attemptNumber}.`);
    const aborter = new AbortController();
    const combinedAbortSignal = !abortSignal
      ? aborter.signal
      : AbortSignal.any([abortSignal, aborter.signal]);
    if (abortSignal?.aborted) {
      throw createError(abortErrorMsg);
    }
    try {
      const result = await Promise.race([
        operation({ abortSignal: combinedAbortSignal }),
        (async () => {
          try {
            await delay(timeoutInMs, { abortSignal: combinedAbortSignal });
            throw createError(`[${operationId}] Operation timed out`);
          } catch (err) {
            if (abortSignal?.aborted) {
              logger.verbose(`[${operationId}] ${abortErrorMsg}`);
            }
            throw err;
          }
        })(),
      ]).finally(() => {
        aborter.abort();
      });
      logger.verbose(`[${operationId}] Operation succeeded after attempt #${state.attemptNumber}`);
      return result;
    } catch (err) {
      logger.verbose(
        `[${operationId}] Operation failed in attempt #${state.attemptNumber}: ${err}`,
      );
      errors.push(err);
      if (isRetryable?.(err) && state.attemptNumber < state.totalNumberOfAttempts) {
        const targetDelayInMs = calculateDelay(
          state.attemptNumber,
          retryDelayInMs,
          maxRetryDelayInMs,
          mode,
        );
        logger.verbose(`[${operationId}] Sleeping for ${targetDelayInMs} milliseconds.`);
        await delay(targetDelayInMs, {
          abortSignal,
          abortErrorMsg,
        });
        continue;
      } else {
        break;
      }
    }
  }
  if (errors.length === 1) {
    throw errors[0];
  }
  throw new AggregateError(errors);
}
