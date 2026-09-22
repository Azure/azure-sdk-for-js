// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";

/**
 * Creates a native AbortSignal which reflects the state of the provided AbortSignalLike.
 * If the AbortSignalLike is already a native AbortSignal, it is returned as is.
 * @param abortSignalLike - The AbortSignalLike to wrap.
 * @returns - An object containing the native AbortSignal and an optional cleanup function. The cleanup function should be called when the AbortSignal is no longer needed.
 */
export function wrapAbortSignalLike(abortSignalLike: AbortSignalLike): {
  abortSignal: AbortSignal;
  cleanup?: () => void;
} {
  if (abortSignalLike instanceof AbortSignal) {
    return { abortSignal: abortSignalLike };
  }

  if (abortSignalLike.aborted) {
    return {
      abortSignal: AbortSignal.abort(
        "reason" in abortSignalLike ? abortSignalLike.reason : undefined,
      ),
    };
  }

  const controller = new AbortController();
  let needsCleanup = true;
  function cleanup(): void {
    if (needsCleanup) {
      abortSignalLike.removeEventListener("abort", listener);
      needsCleanup = false;
    }
  }
  function listener(): void {
    controller.abort("reason" in abortSignalLike ? abortSignalLike.reason : undefined);
    cleanup();
  }

  abortSignalLike.addEventListener("abort", listener);
  return { abortSignal: controller.signal, cleanup };
}
