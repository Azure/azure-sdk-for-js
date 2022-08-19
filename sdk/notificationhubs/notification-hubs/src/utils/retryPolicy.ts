// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignal } from "@azure/abort-controller";
import { delay } from "@azure/core-util";
import { isDefined } from "./utils.js";
import { isError } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";

const JITTER_FACTOR = 0.08;

function isAbortError(e: unknown): e is AbortError {
  if (e instanceof AbortError) {
    return true;
  }

  return isError(e) && e.name === "AbortError";
}

/**
 * Represents the retry delay calculation either fixed or exponential.
 */
export enum RetryMode {
  /**
   * Fixed interval between retries.
   */
  Fixed,
  /**
   * Exporation interval between retries.
   */
  Exponential,
}

/**
 * Represents the retry options for an operation.
 */
export interface RetryOptions {
  /**
   * The retry mode.
   */
  mode: RetryMode;

  /**
   * The number of maximum retries.
   */
  maxRetries: number;

  /**
   * The delay in milliseconds between retries.
   */
  delay: number;

  /**
   * The maximum delay in milliseconds between retries.
   */
  maxDelay: number;
}

/**
 * Creates a set of retry options with defaults.
 * @param options - The options for the retry behavior.
 * @returns The retry options.
 */
export function createRetryOptions(options?: Partial<RetryOptions>): RetryOptions {
  return {
    mode: RetryMode.Fixed,
    maxRetries: 3,
    delay: 1000,
    maxDelay: 1000 * 60,
    ...options,
  };
}

/**
 * Represents a retry policy with a run operation and define a retry time calculation.
 */
export interface RetryPolicy {
  /**
   * Calculates the retry delay based upon the error and retry attempt.
   * @param error - The error from the operation.
   * @param attempt - The retry attempt number.
   */
  calculateRetryDelay: (error: unknown, attempt: number) => number | undefined;

  /**
   * Runs an operation and retries based upon the retry policy.
   * @param operation - The operation to run and retry if necessary.
   * @param signal - An AbortSignal to check for cancellation.
   * @returns The result of the operation.
   */
  runOperation<TResult>(
    operation: (signal?: AbortSignal) => Promise<TResult>,
    signal?: AbortSignal
  ): Promise<TResult>;
}

/**
 * Creates a base retry policy with the incoming calculateRetryDelay method.
 * @param calculateRetryDelay - The retry calculation behavior based upon attempt number and error.
 * @returns A retry policy with the given calculateRetryDelay method.
 */
export function createBaseRetryPolicy(
  calculateRetryDelay: (error: unknown, attempt: number) => number | undefined
): RetryPolicy {
  async function runOperation<TResult>(
    operation: (signal?: AbortSignal) => Promise<TResult>,
    signal?: AbortSignal
  ): Promise<TResult> {
    let failedAttemptCount = 0;

    while (!signal?.aborted) {
      try {
        return await operation(signal);
      } catch (err) {
        ++failedAttemptCount;
        const retryDelay = calculateRetryDelay(err, failedAttemptCount);
        if (isDefined(retryDelay)) {
          await delay(retryDelay);
        } else {
          throw err;
        }
      }
    }

    throw new AbortError("The operation has been aborted");
  }

  return {
    calculateRetryDelay,
    runOperation,
  };
}

/**
 * Creates a retry policy configured with the given retry options.
 * @param options - The retry options including delay, max attempts and backoff behavior.
 * @returns A retry policy configured with the given options.
 */
export function createDefaultRetryPolicy(options: RetryOptions): RetryPolicy {
  function calculateRetryDelay(error: unknown, attempt: number): number | undefined {
    if (
      options.maxRetries <= 0 ||
      options.delay === 0 ||
      options.maxDelay === 0 ||
      attempt > options.maxRetries ||
      !shouldRetryError(error)
    ) {
      return undefined;
    }

    const baseJitterSeconds = (options.delay / 1000) * JITTER_FACTOR;

    let retryDelay: number | undefined;
    if (isRestError(error)) {
      retryDelay = parseRetryAfter(error.response?.headers.get("retry-after"));
    }

    if (!isDefined(retryDelay)) {
      if (options.mode === RetryMode.Exponential) {
        retryDelay = calculateExponentialDelay(attempt, options.delay / 1000, baseJitterSeconds);
      } else {
        retryDelay = calculateFixedDelay(options.delay / 1000, baseJitterSeconds);
      }
    }

    if (options.maxDelay < retryDelay) {
      return options.maxDelay;
    }

    return retryDelay;
  }

  return createBaseRetryPolicy(calculateRetryDelay);
}

function parseRetryAfter(headerValue: string | undefined): number | undefined {
  if (!isDefined(headerValue)) {
    return undefined;
  }

  // Retry-After is defined in seconds
  const number = new Number(headerValue);
  if (Number.isFinite(number) && number >= 0) {
    return number.valueOf() * 1000;
  }

  // Retry-After is defined as a Date
  const retryDate = Date.parse(headerValue);
  if (Number.isNaN(retryDate)) {
    return undefined;
  }

  const diff = retryDate - Date.now();
  return diff <= 0 ? undefined : diff;
}

function shouldRetryError(e: unknown): boolean {
  if (isAbortError(e)) {
    return false;
  }

  if (isRestError(e)) {
    // Throttle and legacy throttle
    if (e?.statusCode === 429 || e?.statusCode === 403) {
      return true;
    }
    // Network hiccups
    if (
      e?.statusCode === 500 ||
      e?.statusCode === 503 ||
      e?.statusCode === 504 ||
      e?.statusCode === 408
    ) {
      return true;
    }
  }

  return false;
}

function calculateFixedDelay(baseDelaySeconds: number, baseJitterSeconds: number): number {
  return (baseDelaySeconds + Math.random() * baseJitterSeconds) * 1000;
}

function calculateExponentialDelay(
  attemptCount: number,
  baseDelaySeconds: number,
  baseJitterSeconds: number
): number {
  return (Math.pow(2, attemptCount) * baseDelaySeconds + Math.random() * baseJitterSeconds) * 1000;
}
