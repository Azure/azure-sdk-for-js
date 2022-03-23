// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { isDefined } from "./typeguards";

const StandardAbortMessage = "The operation was aborted.";

/**
 * A wrapper for setTimeout that resolves a promise after delayInMs milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @param options - The options for delay - currently abort options
 *   @param abortSignal - The abortSignal associated with containing operation.
 *   @param abortErrorMsg - The abort error message associated with containing operation.
 * @returns - Resolved promise
 */
export function delay<T>(
  delayInMs: number,
  value?: T,
  options?: {
    abortSignal?: AbortSignalLike;
    abortErrorMsg?: string;
  }
): Promise<T | void> {
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let onAborted: (() => void) | undefined = undefined;

    const rejectOnAbort = (): void => {
      return reject(
        new AbortError(options?.abortErrorMsg ? options?.abortErrorMsg : StandardAbortMessage)
      );
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
      resolve(value);
    }, delayInMs);

    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", onAborted);
    }
  });
}
