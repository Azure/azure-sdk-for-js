// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "../abort-controller/AbortError";
import { AbortSignalLike } from "../abort-controller/AbortSignalLike";
import { PipelineResponse } from "../interfaces";

const StandardAbortMessage = "The operation was aborted.";

/**
 * A wrapper for setTimeout that resolves a promise after delayInMs milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @param options - The options for delay - currently abort options
 *                  - abortSignal - The abortSignal associated with containing operation.
 *                  - abortErrorMsg - The abort error message associated with containing operation.
 * @returns Resolved promise
 */
export function delay<T>(
  delayInMs: number,
  value?: T,
  options?: {
    abortSignal?: AbortSignalLike;
    abortErrorMsg?: string;
  }
): Promise<T | void> {
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let onAborted: (() => void) | undefined = undefined;

    const rejectOnAbort = (): void => {
      return reject(
        new AbortError(options?.abortErrorMsg ? options?.abortErrorMsg : StandardAbortMessage)
      );
    };

    const removeListeners = (): void => {
      if (options?.abortSignal && onAborted) {
        options.abortSignal.removeEventListener("abort", onAborted);
      }
    };

    onAborted = (): void => {
      if (timer) {
        clearTimeout(timer);
      }
      removeListeners();
      return rejectOnAbort();
    };

    if (options?.abortSignal && options.abortSignal.aborted) {
      return rejectOnAbort();
    }

    timer = setTimeout(() => {
      removeListeners();
      resolve(value);
    }, delayInMs);

    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", onAborted);
    }
  });
}

/**
 * @internal
 * @returns the parsed value or undefined if the parsed value is invalid.
 */
export function parseHeaderValueAsNumber(
  response: PipelineResponse,
  headerName: string
): number | undefined {
  const value = response.headers.get(headerName);
  if (!value) return;
  const valueAsNum = Number(value);
  if (Number.isNaN(valueAsNum)) return;
  return valueAsNum;
}
