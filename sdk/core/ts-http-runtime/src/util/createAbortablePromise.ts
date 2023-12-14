// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "../abort-controller/AbortError";
import { AbortOptions } from "./aborterUtils";

/**
 * Options for the createAbortablePromise function.
 */
export interface CreateAbortablePromiseOptions extends AbortOptions {
  /** A function to be called if the promise was aborted */
  cleanupBeforeAbort?: () => void;
}

/**
 * Creates an abortable promise.
 * @param buildPromise - A function that takes the resolve and reject functions as parameters.
 * @param options - The options for the abortable promise.
 * @returns A promise that can be aborted.
 */
export function createAbortablePromise<T>(
  buildPromise: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void,
  options?: CreateAbortablePromiseOptions
): Promise<T> {
  const { cleanupBeforeAbort, abortSignal, abortErrorMsg } = options ?? {};
  return new Promise((resolve, reject) => {
    function rejectOnAbort(): void {
      reject(new AbortError(abortErrorMsg ?? "The operation was aborted."));
    }
    function removeListeners(): void {
      abortSignal?.removeEventListener("abort", onAbort);
    }
    function onAbort(): void {
      cleanupBeforeAbort?.();
      removeListeners();
      rejectOnAbort();
    }
    if (abortSignal?.aborted) {
      return rejectOnAbort();
    }
    try {
      buildPromise(
        (x) => {
          removeListeners();
          resolve(x);
        },
        (x) => {
          removeListeners();
          reject(x);
        }
      );
    } catch (err) {
      reject(err);
    }
    abortSignal?.addEventListener("abort", onAbort);
  });
}
