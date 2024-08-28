// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { maybemap } from "../../util";

type CancellationToken = Parameters<typeof clearTimeout>[0];

/**
 * A PromiseLike object that supports cancellation.
 * @internal
 */
export interface CancelablePromiseLike<T> extends PromiseLike<T> {
  /**
   * Cancel the promise (cause it to reject).
   */
  cancel(): void;
}

/**
 * A promise that delays resolution until a certain amount of time (in milliseconds) has passed, with facilities for
 * robust cancellation.
 *
 * ### Example:
 *
 * ```javascript
 * let toCancel;
 *
 * // Wait 20 seconds, and optionally allow the function to be cancelled.
 * await delayMs(20000, (cancel) => { toCancel = cancel });
 *
 * // ... if `toCancel` is called before the 20 second timer expires, then the delayMs promise will reject.
 * ```
 *
 * @internal
 * @param ms - the number of milliseconds to wait before resolving
 * @param cb - a callback that can provide the caller with a cancellation function
 */
export function delayMs(
  ms: number,
  abortSignal: AbortSignalLike | undefined,
): CancelablePromiseLike<void> {
  let aborted = false;
  let toReject: ((e: Error) => void) | undefined;

  abortSignal?.addEventListener("abort", () => {
    aborted = true;
    toReject?.(new AbortError("The operation was aborted."));
  });

  return Object.assign(
    new Promise<void>((resolve, reject) => {
      let token: CancellationToken | undefined;
      toReject = (e) => {
        maybemap(token, clearTimeout);
        reject(e);
      };

      // In the rare case that the operation is _already_ aborted, we will reject instantly. This could happen, for
      // example, if the user calls the cancellation function immediately without yielding execution.
      if (aborted) {
        toReject(new Error("The operation was cancelled prematurely."));
      } else {
        token = setTimeout(resolve, ms);
      }
    }),
    {
      cancel: () => {
        aborted = true;
        toReject?.(new Error("The operation was cancelled."));
      },
    },
  );
}
