// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory,
  WebResource,
  HttpOperationResponse,
  Constants,
  delay,
  RestError
} from "@azure/core-http";

/**
 * @internal
 * @hidden
 */
export function throttlingRetryPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ThrottlingRetryPolicy(nextPolicy, options);
    }
  };
}

/**
 * This policy is a close copy of the ThrottlingRetryPolicy class from
 * core-http with modifications to work with how AppConfig is currently
 * responding to 429 responses (which is to throw a RestError).
 *
 * @internal
 * @hidden
 */
export class ThrottlingRetryPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(httpRequest.clone()).catch((err) => {
      if (isRestErrorWithHeaders(err)) {
        const delayInMs = getDelayInMs(err.response.headers);

        if (delayInMs == null) {
          throw err;
        }

        return delay(delayInMs).then((_: any) => this.sendRequest(httpRequest.clone()));
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
 * @hidden
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
