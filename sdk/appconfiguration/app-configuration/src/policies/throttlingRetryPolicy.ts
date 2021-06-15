// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory,
  WebResource,
  HttpOperationResponse,
  Constants,
  RestError
} from "@azure/core-http";

/**
 * @internal
 */
export function throttlingRetryPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ThrottlingRetryPolicy(nextPolicy, options);
    }
  };
}

const StandardAbortMessage = "The operation was aborted.";

/**
 * An executor for a function that returns a Promise that obeys both a timeout and an
 * optional AbortSignal.
 * @param actionFn - The callback that we want to resolve.
 * @param timeoutMs - The number of milliseconds to allow before throwing an OperationTimeoutError.
 * @param timeoutMessage - The message to place in the .description field for the thrown exception for Timeout.
 * @param abortSignal - The abortSignal associated with containing operation.
 *
 * @internal
 */
export async function waitForTimeoutOrAbortOrResolve<T>(args: {
  actionFn: () => Promise<T>;
  timeoutMs: number;
  timeoutMessage: string;
  abortSignal: AbortSignalLike | undefined;
}): Promise<T> {
  if (args.abortSignal && args.abortSignal.aborted) {
    throw new AbortError(StandardAbortMessage);
  }

  let timer: any | undefined = undefined;
  let clearAbortSignal: (() => void) | undefined = undefined;

  const clearAbortSignalAndTimer = (): void => {
    clearTimeout(timer);

    if (clearAbortSignal) {
      clearAbortSignal();
    }
  };

  const abortOrTimeoutPromise = new Promise<T>((_resolve, reject) => {
    clearAbortSignal = checkAndRegisterWithAbortSignal(reject, args.abortSignal);

    timer = setTimeout(() => {
      reject(new Error(args.timeoutMessage));
    }, args.timeoutMs);
  });

  try {
    return await Promise.race([abortOrTimeoutPromise, args.actionFn()]);
  } finally {
    clearAbortSignalAndTimer();
  }
}

/**
 * Registers listener to the abort event on the abortSignal to call your abortFn and
 * returns a function that will clear the same listener.
 *
 * If abort signal is already aborted, then throws an AbortError and returns a function that does nothing
 *
 * @returns A function that removes any of our attached event listeners on the abort signal or an empty function if
 * the abortSignal was not defined.
 *
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

/**
 * This policy is a close copy of the ThrottlingRetryPolicy class from
 * core-http with modifications to work with how AppConfig is currently
 * responding to 429 responses (which is to throw a RestError).
 *
 * @internal
 */
export class ThrottlingRetryPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(httpRequest.clone()).catch(async (err) => {
      if (isRestErrorWithHeaders(err)) {
        const delayInMs = getDelayInMs(err.response.headers);

        if (delayInMs == null) {
          throw err;
        }

        return await waitForTimeoutOrAbortOrResolve({
          timeoutMs: delayInMs,
          abortSignal: httpRequest.abortSignal,
          actionFn: async () => {
            return await this.sendRequest(httpRequest.clone());
          },
          timeoutMessage: `ServiceBusy: Unable to fulfill the request in ${delayInMs}ms when retried.`
        });
      } else {
        throw err;
      }
    });
  }

  static parseRetryAfterHeader(headerValue: string): number | undefined {
    const retryAfterInSeconds = Number(headerValue);
    if (Number.isNaN(retryAfterInSeconds)) {
      return ThrottlingRetryPolicy.parseDateRetryAfterHeader(headerValue);
    } else {
      return retryAfterInSeconds * 1000;
    }
  }

  static parseDateRetryAfterHeader(headerValue: string): number | undefined {
    try {
      const now: number = Date.now();
      const date: number = Date.parse(headerValue);
      const diff = date - now;

      return Number.isNaN(diff) ? undefined : diff;
    } catch (error) {
      return undefined;
    }
  }
}

/**
 * The headers that come back from Azure services representing
 * the amount of time (minimum) to wait to retry (in milliseconds).
 */
const RetryAfterMillisecondsHeaders: string[] = ["retry-after-ms", "x-ms-retry-after-ms"];

/**
 * Extracts the retry response header, checking against several
 * header names.
 * @internal
 */
export function getDelayInMs(responseHeaders: {
  get: (headerName: string) => string | undefined;
}): number | undefined {
  for (const name of RetryAfterMillisecondsHeaders) {
    const delayValueString = responseHeaders.get(name);

    if (delayValueString == null) {
      continue;
    }

    const delayValueMs: number = Number(delayValueString);

    if (Number.isNaN(delayValueMs)) {
      return undefined;
    }

    return delayValueMs;
  }

  const retryAfterValue = responseHeaders.get(Constants.HeaderConstants.RETRY_AFTER);

  if (retryAfterValue != null) {
    return ThrottlingRetryPolicy.parseRetryAfterHeader(retryAfterValue);
  }

  return undefined;
}

type RestErrorWithHeaders = Pick<RestError, Exclude<keyof RestError, "response">> & {
  response: HttpOperationResponse;
};

function isRestErrorWithHeaders(err: any): err is RestErrorWithHeaders {
  return (
    err &&
    err.statusCode &&
    typeof err.statusCode === "number" &&
    err.response &&
    err.response.headers &&
    typeof err.response.headers.get === "function"
  );
}
