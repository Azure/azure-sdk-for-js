// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { AbortOptions } from "./aborterUtils.js";
import { createAbortablePromise } from "./createAbortablePromise.js";
import { getRandomIntegerInclusive } from "./random.js";

const StandardAbortMessage = "The delay was aborted.";

/**
 * Options for support abort functionality for the delay method
 */
export interface DelayOptions extends AbortOptions {}

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param options - The options for delay - currently abort options
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number, options?: DelayOptions): Promise<void> {
  let token: ReturnType<typeof setTimeout>;
  const { abortSignal, abortErrorMsg } = options ?? {};
  return createAbortablePromise(
    (resolve) => {
      token = setTimeout(resolve, timeInMs);
    },
    {
      cleanupBeforeAbort: () => clearTimeout(token),
      abortSignal,
      abortErrorMsg: abortErrorMsg ?? StandardAbortMessage,
    },
  );
}

/**
 * Calculates the delay interval for retry attempts using exponential delay with jitter.
 * @param retryAttempt - The current retry attempt number.
 * @param config - The exponential retry configuration.
 * @returns An object containing the calculated retry delay.
 */
export function calculateRetryDelay(
  retryAttempt: number,
  config: {
    retryDelayInMs: number;
    maxRetryDelayInMs: number;
  },
): { retryAfterInMs: number } {
  // Exponentially increase the delay each time
  const exponentialDelay = config.retryDelayInMs * Math.pow(2, retryAttempt);

  // Don't let the delay exceed the maximum
  const clampedDelay = Math.min(config.maxRetryDelayInMs, exponentialDelay);

  // Allow the final value to have some "jitter" (within 50% of the delay size) so
  // that retries across multiple clients don't occur simultaneously.
  const retryAfterInMs = clampedDelay / 2 + getRandomIntegerInclusive(0, clampedDelay / 2);

  return { retryAfterInMs };
}
