// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortOptions } from "./aborterUtils";
import { createAbortablePromise } from "./createAbortablePromise";

const StandardAbortMessage = "The delay was aborted.";

/**
 * Options for support abort functionality for the delay method
 */
export interface DelayOptions extends AbortOptions {}

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param options - The options for delay - currently abort options
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number, options?: DelayOptions): Promise<void> {
  let token: ReturnType<typeof setTimeout>;
  const { abortSignal, abortErrorMsg } = options ?? {};
  return createAbortablePromise(
    (resolve) => {
      token = setTimeout(resolve, timeInMs);
    },
    {
      cleanupBeforeAbort: () => clearTimeout(token),
      abortSignal,
      abortErrorMsg: abortErrorMsg ?? StandardAbortMessage,
    }
  );
}
