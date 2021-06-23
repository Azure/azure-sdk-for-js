// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isDefined } from "./typeguards";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
const StandardAbortMessage = "The operation was aborted.";

/**
 * A wrapper for setTimeout that resolves a promise after delayInMs milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns - Resolved promise
 */
export function delay<T>(
  delayInMs: number,
  abortSignal?: AbortSignalLike,
  abortErrorMsg?: string,
  value?: T
): Promise<T | void> {
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let onAborted: (() => void) | undefined = undefined;

    const rejectOnAbort = (): void => {
      return reject(new AbortError(abortErrorMsg ? abortErrorMsg : StandardAbortMessage));
    };

    const removeListeners = (): void => {
      if (abortSignal && onAborted) {
        abortSignal.removeEventListener("abort", onAborted);
      }
    };

    onAborted = (): void => {
      if (isDefined(timer)) {
        clearTimeout(timer);
      }
      removeListeners();
      return rejectOnAbort();
    };

    if (abortSignal && abortSignal.aborted) {
      return rejectOnAbort();
    }

    timer = setTimeout(() => {
      removeListeners();
      resolve(value);
    }, delayInMs);

    if (abortSignal) {
      abortSignal.addEventListener("abort", onAborted);
    }
  });
}
