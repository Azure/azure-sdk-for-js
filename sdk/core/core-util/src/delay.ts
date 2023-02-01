// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { isDefined } from "./typeGuards";

const StandardAbortMessage = "The operation was aborted.";

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
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let onAborted: (() => void) | undefined = undefined;

    const rejectOnAbort = (): void => {
      return reject(new AbortError(options?.abortErrorMsg ?? StandardAbortMessage));
    };

    const removeListeners = (): void => {
      if (options?.abortSignal && onAborted) {
        options.abortSignal.removeEventListener("abort", onAborted);
      }
    };

    onAborted = (): void => {
      if (isDefined(timer)) {
        clearTimeout(timer);
      }
      removeListeners();
      return rejectOnAbort();
    };

    if (options?.abortSignal && options.abortSignal.aborted) {
      return rejectOnAbort();
    }

    timer = setTimeout(() => {
      removeListeners();
      resolve();
    }, timeInMs);

    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", onAborted);
    }
  });
}
