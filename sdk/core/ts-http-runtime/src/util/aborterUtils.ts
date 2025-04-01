// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Options related to abort controller.
 */
export interface AbortOptions {
  /**
   * The abortSignal associated with containing operation.
   */
  abortSignal?: AbortSignal;
  /**
   * The abort error message associated with containing operation.
   */
  abortErrorMsg?: string;
}

/**
 * Represents a function that returns a promise that can be aborted.
 */
export type AbortablePromiseBuilder<T> = (abortOptions: {
  abortSignal?: AbortSignal;
}) => Promise<T>;

/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export async function cancelablePromiseRace<T extends unknown[]>(
  abortablePromiseBuilders: AbortablePromiseBuilder<T[number]>[],
  options?: { abortSignal?: AbortSignal },
): Promise<T[number]> {
  const aborter = new AbortController();
  function abortHandler(): void {
    aborter.abort(options?.abortSignal?.reason);
  }
  options?.abortSignal?.addEventListener("abort", abortHandler);
  try {
    return await Promise.race(
      abortablePromiseBuilders.map((p) => p({ abortSignal: aborter.signal })),
    );
  } finally {
    aborter.abort();
    options?.abortSignal?.removeEventListener("abort", abortHandler);
  }
}
