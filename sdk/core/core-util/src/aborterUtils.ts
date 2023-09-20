// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortController } from "@azure/abort-controller";

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
 * Represents a function that returns a promise that can be aborted.
 */
export type AbortablePromiseBuilder<T> = (abortOptions: {
  abortSignal?: AbortSignalLike;
}) => Promise<T>;

// Can add more overloads for "cancelablePromiseRace" as needed
/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export function cancelablePromiseRace<T1, T2>(
  abortablePromiseBuilders: (AbortablePromiseBuilder<T1> | AbortablePromiseBuilder<T2>)[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<T1 | T2>;
/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export function cancelablePromiseRace<T1, T2, T3>(
  abortablePromiseBuilders: (
    | AbortablePromiseBuilder<T1>
    | AbortablePromiseBuilder<T2>
    | AbortablePromiseBuilder<T3>
  )[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<T1 | T2 | T3>;

/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export async function cancelablePromiseRace(
  abortablePromiseBuilders: AbortablePromiseBuilder<any>[],
  options?: { abortSignal?: AbortSignalLike }
): Promise<any> {
  const aborter = new AbortController();
  options?.abortSignal?.addEventListener("abort", () => {
    aborter.abort();
    options?.abortSignal?.removeEventListener("abort", () => aborter.abort());
  });
  try {
    return await Promise.race(
      abortablePromiseBuilders.map((p) => p({ abortSignal: aborter.signal }))
    );
  } finally {
    aborter.abort();
  }
}
