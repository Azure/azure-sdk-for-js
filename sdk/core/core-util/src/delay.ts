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
 *
 * @param inputs - The inputs for creating an abortable promise are the
 *                 buildPromise function and the cleanupBeforeAbort function.
 *                 buildPromise takes both the resolve and reject functions as
 *                 parameters. cleanupBeforeAbort is called right before the
 *                 promise is rejected.
 * @returns a function that takes an optional DelayOptions parameter and returns
 *          a promise that can be aborted.
 * @internal
 */
export function createAbortablePromise<T>(inputs: {
  buildPromise: (inputs: {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  }) => void;
  cleanupBeforeAbort?: () => void;
}): (options?: DelayOptions) => Promise<T> {
  const { buildPromise, cleanupBeforeAbort } = inputs;
  return ({ abortSignal, abortErrorMsg } = {}) =>
    new Promise((resolve, reject) => {
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
      buildPromise({
        resolve: (x) => {
          resolve(x);
          removeListeners();
        },
        reject: (x) => {
          removeListeners();
          reject(x);
        },
      });
      abortSignal?.addEventListener("abort", onAbort);
    });
}

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param options - The options for delay - currently abort options
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number, options?: DelayOptions): Promise<void> {
  let token: ReturnType<typeof setTimeout>;
  const { abortSignal, abortErrorMsg } = options || {};
  return createAbortablePromise<void>({
    buildPromise: ({ resolve }) => {
      token = setTimeout(resolve, timeInMs);
    },
    cleanupBeforeAbort: () => clearTimeout(token),
  })({
    abortSignal,
    abortErrorMsg: abortErrorMsg ?? StandardAbortMessage,
  });
}
