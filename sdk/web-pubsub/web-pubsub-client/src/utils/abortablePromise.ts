// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";

export async function abortablePromise<T>(
  promise: Promise<T>,
  signal: AbortSignalLike,
): Promise<T> {
  if (signal.aborted) {
    throw new AbortError("The operation was aborted.");
  }

  let onAbort: () => void;
  // eslint-disable-next-line promise/param-names
  const p = new Promise<T>((_, reject) => {
    onAbort = (): void => {
      reject(new AbortError("The operation was aborted."));
    };

    signal.addEventListener("abort", onAbort);
  });

  try {
    return await Promise.race([promise, p]);
  } finally {
    signal.removeEventListener("abort", onAbort!);
  }
}
