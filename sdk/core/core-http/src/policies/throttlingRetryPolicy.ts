// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "@azure/abort-controller";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { DEFAULT_CLIENT_MAX_RETRY_COUNT } from "../util/throttlingRetryStrategy";
import { delay } from "../util/delay";

type ResponseHandler = (
  httpRequest: WebResourceLike,
  response: HttpOperationResponse
) => Promise<HttpOperationResponse>;
const StatusCodes = Constants.HttpConstants.StatusCodes;

/**
 * Creates a policy that re-sends the request if the response indicates the request failed because of throttling reasons.
 * For example, if the response contains a `Retry-After` header, it will retry sending the request based on the value of that header.
 *
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 * @returns
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
 * Creates a policy that re-sends the request if the response indicates the request failed because of throttling reasons.
 * For example, if the response contains a `Retry-After` header, it will retry sending the request based on the value of that header.
 *
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export class ThrottlingRetryPolicy extends BaseRequestPolicy {
  private _handleResponse: ResponseHandler;
  private numberOfRetries = 0;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    _handleResponse?: ResponseHandler
  ) {
    super(nextPolicy, options);
    this._handleResponse = _handleResponse || this._defaultResponseHandler;
  }

  public async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    const response = await this._nextPolicy.sendRequest(httpRequest.clone());
    if (
      response.status !== StatusCodes.TooManyRequests &&
      response.status !== StatusCodes.ServiceUnavailable
    ) {
      return response;
    } else {
      return this._handleResponse(httpRequest, response);
    }
  }

  private async _defaultResponseHandler(
    httpRequest: WebResourceLike,
    httpResponse: HttpOperationResponse
  ): Promise<HttpOperationResponse> {
    const retryAfterHeader: string | undefined = httpResponse.headers.get(
      Constants.HeaderConstants.RETRY_AFTER
    );

    if (retryAfterHeader) {
      const delayInMs: number | undefined = ThrottlingRetryPolicy.parseRetryAfterHeader(
        retryAfterHeader
      );
      if (delayInMs) {
        this.numberOfRetries += 1;

        await delay(delayInMs, undefined, {
          abortSignal: httpRequest.abortSignal,
          abortErrorMsg: StandardAbortMessage
        });

        if (httpRequest.abortSignal?.aborted) {
          throw new AbortError(StandardAbortMessage);
        }

        if (this.numberOfRetries < DEFAULT_CLIENT_MAX_RETRY_COUNT) {
          return this.sendRequest(httpRequest);
        } else {
          return this._nextPolicy.sendRequest(httpRequest);
        }
      }
    }

    return httpResponse;
  }

  public static parseRetryAfterHeader(headerValue: string): number | undefined {
    const retryAfterInSeconds = Number(headerValue);
    if (Number.isNaN(retryAfterInSeconds)) {
      return ThrottlingRetryPolicy.parseDateRetryAfterHeader(headerValue);
    } else {
      return retryAfterInSeconds * 1000;
    }
  }

  public static parseDateRetryAfterHeader(headerValue: string): number | undefined {
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
