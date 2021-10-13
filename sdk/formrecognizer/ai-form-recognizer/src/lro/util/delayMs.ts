// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { maybemap } from "../../util";

type CancellationToken = Parameters<typeof clearTimeout>[0];

const INTERRUPTED = "The local operation (timer) was interrupted or cancelled.";

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
export function delayMs(ms: number): CancelablePromiseLike<void> {
  let aborted = false;
  let toReject: (() => void) | undefined;

  return Object.assign(
    new Promise<void>((resolve, reject) => {
      let token: CancellationToken | undefined;
      toReject = () => {
        maybemap(token, clearTimeout);
        reject(INTERRUPTED);
      };

      // In the rare case that the operation is _already_ aborted, we will reject instantly. This could happen, for
      // example, if the user calls the cancellation function immediately without yielding execution.
      if (aborted) {
        toReject();
      } else {
        token = setTimeout(resolve, ms);
      }
    }),
    {
      cancel: () => {
        aborted = true;
        toReject?.();
      },
    }
  );
}
