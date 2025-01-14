// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import { logger } from "./logger.js";

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
   * Denotes which retry mode to apply. If undefined, defaults to `Fixed`
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
  if (mode === "Exponential") {
    const boundedRandDelta =
      retryDelayInMs * 0.8 +
      Math.floor(Math.random() * (retryDelayInMs * 1.2 - retryDelayInMs * 0.8));

    const incrementDelta = boundedRandDelta * (Math.pow(2, attemptCount) - 1);
    return Math.min(incrementDelta, maxRetryDelayInMs);
  }

  return retryDelayInMs;
}

interface RetryFuncOptions {
  retryOptions?: RetryOptions;
  isRetryable?: (err: unknown) => boolean;
  abortSignal?: AbortSignal;
}

export interface AbortableOperationOptions {
  abortSignal?: AbortSignal;
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
 * @param config - Parameters to configure retry operation
 *
 * @returns Promise<T>.
 */
export async function retry<T>(
  operation: (opts?: AbortableOperationOptions) => Promise<T>,
  operationId: string,
  opts: RetryFuncOptions = {},
): Promise<T> {
  const { abortSignal, retryOptions = {}, isRetryable } = opts;
  const {
    maxRetries = Constants.defaultMaxRetries,
    maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs,
    mode = "Fixed",
    retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs,
    timeoutInMs = Constants.defaultOperationTimeoutInMs,
  } = retryOptions;
  const errors: unknown[] = [];
  const totalNumberOfAttempts = maxRetries + 1;
  for (let i = 1; i <= totalNumberOfAttempts; i++) {
    logger.verbose(`[${operationId}] Attempt #${i}.`);
    const aborter = new AbortController();
    const combinedAbortSignal = !abortSignal
      ? aborter.signal
      : AbortSignal.any([abortSignal, aborter.signal]);
    try {
      const result = await Promise.race([
        operation({ abortSignal: combinedAbortSignal }),
        (async () => {
          try {
            await delay(timeoutInMs, { abortSignal: combinedAbortSignal });
            logger.verbose(`[${operationId} Operation timed out`);
            throw new Error(`[${operationId}] Operation timed out`);
          } catch (err) {
            if (aborter.signal.aborted) {
              logger.verbose(`[${operationId}] Operation completed`);
              // the promise has already settled with the operation result
            } else if (abortSignal?.aborted) {
              logger.verbose(`[${operationId}] Operation has been canceled`);
            }
            throw err;
          }
        })(),
      ]).finally(() => {
        aborter.abort();
      });
      logger.verbose(`[${operationId}] Operation succeeded after attempt #${i}`);
      return result;
    } catch (err) {
      logger.verbose(`[${operationId}] Operation failed in attempt #${i}: ${err}`);

      errors.push(err);
      if (isRetryable?.(err) && totalNumberOfAttempts > i) {
        const targetDelayInMs = calculateDelay(i, retryDelayInMs, maxRetryDelayInMs, mode);
        logger.verbose(`[${operationId}] Sleeping for ${targetDelayInMs} milliseconds.`);
        await delay(targetDelayInMs, {
          abortSignal,
          abortErrorMsg: `The retry operation has been cancelled by the user.`,
        });
        continue;
      } else {
        break;
      }
    }
  }
  throw compileErrors(errors);
}

function compileErrors(errors: unknown[]): Error {
  if (!errors.length) {
    throw new RangeError("Error array is empty");
  }
  let i = 0;
  const str = errors.map((error) => `Error ${++i}: ${error}`).join("\n\n");
  return new Error(str);
}
