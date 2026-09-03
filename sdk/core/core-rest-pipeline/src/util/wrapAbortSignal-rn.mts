// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";

/**
 * Creates a native AbortSignal which reflects the state of the provided AbortSignalLike.
 * If the AbortSignalLike is already a native AbortSignal, it is returned as is.
 *
 * React Native's AbortController polyfill (abort-controller\@3.x) does not support
 * `AbortSignal.abort()`, `AbortController.abort(reason)`, or `AbortSignal.reason`.
 * This simplified version works within those constraints.
 *
 * @param abortSignalLike - The AbortSignalLike to wrap.
 * @returns - An object containing the native AbortSignal and an optional cleanup function.
 */
export function wrapAbortSignalLike(abortSignalLike: AbortSignalLike): {
  abortSignal: AbortSignal;
  cleanup?: () => void;
} {
  if (abortSignalLike instanceof AbortSignal) {
    return { abortSignal: abortSignalLike };
  }

  const controller = new AbortController();

  if (abortSignalLike.aborted) {
    controller.abort();
    return { abortSignal: controller.signal };
  }

  let needsCleanup = true;
  function cleanup(): void {
    if (needsCleanup) {
      abortSignalLike.removeEventListener("abort", listener);
      needsCleanup = false;
    }
  }
  function listener(): void {
    controller.abort();
    cleanup();
  }

  abortSignalLike.addEventListener("abort", listener);
  return { abortSignal: controller.signal, cleanup };
}
