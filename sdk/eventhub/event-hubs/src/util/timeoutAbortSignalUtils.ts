// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { OperationTimeoutError } from "rhea-promise";

export const StandardAbortMessage = "The operation was aborted.";

type setTimeoutArgs = (callback: (...args: any[]) => void, ms: number, ...args: any[]) => any;

/**
 * An executor for a function that returns a Promise that obeys both a timeout and an
 * optional AbortSignal.
 * @param timeoutMs - The number of milliseconds to allow before throwing an OperationTimeoutError.
 * @param timeoutMessage - The message to place in the .description field for the thrown exception for Timeout.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 *
 * @internal
 */
export async function waitForTimeoutOrAbortOrResolve<T>(args: {
  actionFn: () => Promise<T>;
  timeoutMs: number;
  timeoutMessage: string;
  abortSignal?: AbortSignalLike;
  // these are optional and only here for testing.
  timeoutFunctions?: {
    setTimeoutFn: setTimeoutArgs;
    clearTimeoutFn: (timeoutId: any) => void;
  };
}): Promise<T> {
  if (args.abortSignal && args.abortSignal.aborted) {
    throw new AbortError(StandardAbortMessage);
  }

  let timer: any | undefined = undefined;
  let clearAbortSignal: (() => void) | undefined = undefined;

  const clearAbortSignalAndTimer = (): void => {
    (args.timeoutFunctions?.clearTimeoutFn ?? clearTimeout)(timer);

    if (clearAbortSignal) {
      clearAbortSignal();
    }
  };

  // eslint-disable-next-line promise/param-names
  const abortOrTimeoutPromise = new Promise<T>((_resolve, reject) => {
    clearAbortSignal = checkAndRegisterWithAbortSignal(reject, args.abortSignal);

    timer = (args.timeoutFunctions?.setTimeoutFn ?? setTimeout)(() => {
      reject(new OperationTimeoutError(args.timeoutMessage));
    }, args.timeoutMs);
  });

  try {
    return await Promise.race([abortOrTimeoutPromise, args.actionFn()]);
  } finally {
    clearAbortSignalAndTimer();
  }
}

/**
 * @internal
 */
export function checkAndRegisterWithAbortSignal(
  onAbortFn: (abortError: AbortError) => void,
  abortSignal?: AbortSignalLike
): () => void {
  if (abortSignal == null) {
    return () => {
      /** Nothing to do here, no abort signal */
    };
  }

  if (abortSignal.aborted) {
    throw new AbortError(StandardAbortMessage);
  }

  const onAbort = (): void => {
    abortSignal.removeEventListener("abort", onAbort);
    onAbortFn(new AbortError(StandardAbortMessage));
  };

  abortSignal.addEventListener("abort", onAbort);

  return () => abortSignal.removeEventListener("abort", onAbort);
}
