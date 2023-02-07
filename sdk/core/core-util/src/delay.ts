// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";

const StandardAbortMessage = "The delay was aborted.";

/**
 * Options for support abort functionality for the delay method
 */
export interface DelayOptions {
  /**
   * The abortSignal associated with containing operation.
   */
  abortSignal?: AbortSignalLike;
  /**
   * The abort error message associated with containing operation.
   */
  abortErrorMsg?: string;
}

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param options - The options for delay - currently abort options
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number, options?: DelayOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const rejectOnAbort = (): void => {
      reject(new AbortError(options?.abortErrorMsg ?? StandardAbortMessage));
    };
    const removeListeners = (): void => {
      options?.abortSignal?.removeEventListener("abort", onAbort);
    };
    const onAbort = (): void => {
      clearTimeout(token);
      removeListeners();
      rejectOnAbort();
    };
    if (options?.abortSignal?.aborted) {
      return rejectOnAbort();
    }
    const token = setTimeout(() => {
      removeListeners();
      resolve();
    }, timeInMs);
    options?.abortSignal?.addEventListener("abort", onAbort);
  });
}
