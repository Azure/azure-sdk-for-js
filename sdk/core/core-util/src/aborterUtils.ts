// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike, AbortController } from "@azure/abort-controller";

/**
 * Options related to abort controller.
 */
export interface AbortOptions {
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

/**
 * Represents a function that returns a promise that can be aborted.
 */
export type AbortablePromiseBuilder<T> = ((abortOptions: { abortSignal?: AbortSignalLike }) => Promise<T>);
// Can add more overloads as needed
/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export function cancelablePromiseRace<T1, T2>(
  abortablePromiseBuilders: (AbortablePromiseBuilder<T1> | AbortablePromiseBuilder<T2>)[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<T1 | T2>
/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export function cancelablePromiseRace<T1, T2, T3>(
  abortablePromiseBuilders: (AbortablePromiseBuilder<T1> | AbortablePromiseBuilder<T2> | AbortablePromiseBuilder<T3>)[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<T1 | T2 | T3>

/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export async function cancelablePromiseRace(
  abortablePromiseBuilders: (AbortablePromiseBuilder<any>)[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<any> {
  const aborter = new AbortController();
  options?.abortSignal?.addEventListener("abort", () => {
    aborter.abort();
    options?.abortSignal?.removeEventListener("abort", () => aborter.abort());
  });
  try {
    return await Promise.race(abortablePromiseBuilders.map((p) => p({ abortSignal: aborter.signal })));
  } finally {
    aborter.abort();
  }
}
