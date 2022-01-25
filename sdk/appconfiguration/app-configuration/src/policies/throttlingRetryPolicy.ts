// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "@azure/abort-controller";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory,
  WebResource,
  HttpOperationResponse,
  Constants,
  RestError,
} from "@azure/core-http";
import { delay } from "@azure/core-http";
import { RetryOptions } from "../models";

/**
 * @internal
 */
export function throttlingRetryPolicy(retryOptions?: RetryOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ThrottlingRetryPolicy(nextPolicy, options, retryOptions);
    },
  };
}

const StandardAbortMessage = "The operation was aborted.";

// Merge this constant with the one in core-http when we unify throttling retry policy in core-http and app-config
const DEFAULT_CLIENT_RETRY_COUNT = 3;

/**
 * This policy is a close copy of the ThrottlingRetryPolicy class from
 * core-http with modifications to work with how AppConfig is currently
 * responding to 429 responses (which is to throw a RestError).
 *
 * @internal
 */
export class ThrottlingRetryPolicy extends BaseRequestPolicy {
  private numberOfRetries = 0;
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private retryOptions: RetryOptions = { maxRetries: DEFAULT_CLIENT_RETRY_COUNT }
  ) {
    super(nextPolicy, options);
  }

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(httpRequest.clone()).catch(async (err) => {
      if (isRestErrorWithHeaders(err)) {
        let delayInMs = getDelayInMs(err.response.headers);

        if (delayInMs == null) {
          throw err;
        }

        if (
          this.retryOptions.maxRetryDelayInMs &&
          delayInMs > this.retryOptions.maxRetryDelayInMs
        ) {
          delayInMs = this.retryOptions.maxRetryDelayInMs;
        }

        this.numberOfRetries += 1;
        await delay(delayInMs, undefined, {
          abortSignal: httpRequest.abortSignal,
          abortErrorMsg: StandardAbortMessage,
        });
        if (httpRequest.abortSignal?.aborted) {
          throw new AbortError(StandardAbortMessage);
        }

        if (this.retryOptions.maxRetries === undefined || this.retryOptions.maxRetries === null) {
          this.retryOptions.maxRetries = DEFAULT_CLIENT_RETRY_COUNT;
        }

        if (this.numberOfRetries < this.retryOptions.maxRetries) {
          // retries
          return this.sendRequest(httpRequest.clone());
        } else {
          // passes on to the next policy
          return this._nextPolicy.sendRequest(httpRequest.clone());
        }
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
