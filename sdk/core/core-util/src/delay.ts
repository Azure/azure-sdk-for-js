// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { isDefined } from "./typeGuards";

const StandardAbortMessage = "The operation was aborted.";

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @param options - The options for delay - currently abort options
 *   @param abortSignal - The abortSignal associated with containing operation.
 *   @param abortErrorMsg - The abort error message associated with containing operation.
 * @returns Promise that is resolved after timeInMs
 */

export interface DelayOptions {
  abortSignal?: AbortSignalLike;
  abortErrorMsg?: string;
}
export function delay<T>(timeInMs: number, options?: DelayOptions): Promise<T | void>;
export function delay<T>(timeInMs: number, value: T, options?: DelayOptions): Promise<T | void>;

export function delay<T>(
  timeInMs: number,
  valueOrOption?: T | DelayOptions,
  options?: DelayOptions
): Promise<T | void> {
  let value: T | undefined = undefined;
  if (isDelayOption(valueOrOption)) {
    options = valueOrOption;
  } else {
    value = valueOrOption;
  }

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
      if (isDefined(timer)) {
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
    }, timeInMs);

    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", onAborted);
    }
  });
}

function isDelayOption<T>(value: T | DelayOptions): value is DelayOptions {
  return Boolean((value as DelayOptions).abortErrorMsg || (value as DelayOptions).abortSignal);
}
