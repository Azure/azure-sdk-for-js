// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";

const REJECTED_ERR = new Error("The operation has been aborted");

export function sleep(ms: number, signal: AbortSignalLike): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(REJECTED_ERR);
      return;
    }

    const id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);

      if (signal.aborted) {
        reject(REJECTED_ERR);
        return;
      }

      resolve();
    }, ms);

    signal.addEventListener("abort", onAbort, { once: true });

    function onAbort(): void {
      clearTimeout(id);
      reject(REJECTED_ERR);
    }
  });
}
