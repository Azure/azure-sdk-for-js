// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";

import {
  AbortSignalLike,
  BaseRequestPolicy,
  HttpOperationResponse,
  HttpPipelineLogLevel,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  RestError,
  WebResource
} from "@azure/core-http";

import { StorageRetryOptions } from "../StorageRetryPolicyFactory";
import { URLConstants } from "../utils/constants";
import { delay, setURLHost, setURLParameter } from "../utils/utils.common";

/**
 * A factory method used to generated a RetryPolicy factory.
 *
 * @export
 * @param {StorageRetryOptions} retryOptions
 * @returns
 */
export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy => {
      return new StorageRetryPolicy(nextPolicy, options, retryOptions);
    }
  };
}

/**
 * RetryPolicy types.
 *
 * @export
 * @enum {number}
 */
export enum StorageRetryPolicyType {
  /**
   * Exponential retry. Retry time delay grows exponentially.
   */
  EXPONENTIAL,
  /**
   * Linear retry. Retry time delay grows linearly.
   */
  FIXED
}

// Default values of StorageRetryOptions
const DEFAULT_RETRY_OPTIONS: StorageRetryOptions = {
  maxRetryDelayInMs: 120 * 1000,
  maxTries: 4,
  retryDelayInMs: 4 * 1000,
  retryPolicyType: StorageRetryPolicyType.EXPONENTIAL,
  secondaryHost: "",
  tryTimeoutInMs: undefined // Use server side default timeout strategy
};

const RETRY_ABORT_ERROR = new AbortError("The operation was aborted.");

/**
 * Retry policy with exponential retry and linear retry implemented.
 *
 * @class RetryPolicy
 * @extends {BaseRequestPolicy}
 */
export class StorageRetryPolicy extends BaseRequestPolicy {
  /**
   * RetryOptions.
   *
   * @private
   * @type {StorageRetryOptions}
   * @memberof StorageRetryPolicy
   */
  private readonly retryOptions: StorageRetryOptions;

  /**
   * Creates an instance of RetryPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {StorageRetryOptions} [retryOptions=DEFAULT_RETRY_OPTIONS]
   * @memberof StorageRetryPolicy
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    retryOptions: StorageRetryOptions = DEFAULT_RETRY_OPTIONS
  ) {
    super(nextPolicy, options);

    // Initialize retry options
    this.retryOptions = {
      retryPolicyType: retryOptions.retryPolicyType
        ? retryOptions.retryPolicyType
        : DEFAULT_RETRY_OPTIONS.retryPolicyType,

      maxTries:
        retryOptions.maxTries && retryOptions.maxTries >= 1
          ? Math.floor(retryOptions.maxTries)
          : DEFAULT_RETRY_OPTIONS.maxTries,

      tryTimeoutInMs:
        retryOptions.tryTimeoutInMs && retryOptions.tryTimeoutInMs >= 0
          ? retryOptions.tryTimeoutInMs
          : DEFAULT_RETRY_OPTIONS.tryTimeoutInMs,

      retryDelayInMs:
        retryOptions.retryDelayInMs && retryOptions.retryDelayInMs >= 0
          ? Math.min(
              retryOptions.retryDelayInMs,
              retryOptions.maxRetryDelayInMs
                ? retryOptions.maxRetryDelayInMs
                : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs!
            )
          : DEFAULT_RETRY_OPTIONS.retryDelayInMs,

      maxRetryDelayInMs:
        retryOptions.maxRetryDelayInMs && retryOptions.maxRetryDelayInMs >= 0
          ? retryOptions.maxRetryDelayInMs
          : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs,

      secondaryHost: retryOptions.secondaryHost
        ? retryOptions.secondaryHost
        : DEFAULT_RETRY_OPTIONS.secondaryHost
    };
  }

  /**
   * Sends request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof StorageRetryPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this.attemptSendRequest(request, false, 1);
  }

  /**
   * Decide and perform next retry. Won't mutate request parameter.
   *
   * @protected
   * @param {WebResource} request
   * @param {boolean} secondaryHas404  If attempt was against the secondary & it returned a StatusNotFound (404), then
   *                                   the resource was not found. This may be due to replication delay. So, in this
   *                                   case, we'll never try the secondary again for this operation.
   * @param {number} attempt           How many retries has been attempted to performed, starting from 1, which includes
   *                                   the attempt will be performed by this method call.
   * @returns {Promise<HttpOperationResponse>}
   * @memberof StorageRetryPolicy
   */
  protected async attemptSendRequest(
    request: WebResource,
    secondaryHas404: boolean,
    attempt: number
  ): Promise<HttpOperationResponse> {
    const newRequest: WebResource = request.clone();

    const isPrimaryRetry =
      secondaryHas404 ||
      !this.retryOptions.secondaryHost ||
      !(request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") ||
      attempt % 2 === 1;

    if (!isPrimaryRetry) {
      newRequest.url = setURLHost(newRequest.url, this.retryOptions.secondaryHost!);
    }

    // Set the server-side timeout query parameter "timeout=[seconds]"
    if (this.retryOptions.tryTimeoutInMs) {
      newRequest.url = setURLParameter(
        newRequest.url,
        URLConstants.Parameters.TIMEOUT,
        Math.floor(this.retryOptions.tryTimeoutInMs! / 1000).toString()
      );
    }

    let response: HttpOperationResponse | undefined;
    try {
      this.logf(
        HttpPipelineLogLevel.INFO,
        `RetryPolicy: =====> Try=${attempt} ${isPrimaryRetry ? "Primary" : "Secondary"}`
      );
      response = await this._nextPolicy.sendRequest(newRequest);
      if (!this.shouldRetry(isPrimaryRetry, attempt, response)) {
        return response;
      }

      secondaryHas404 = secondaryHas404 || (!isPrimaryRetry && response.status === 404);
    } catch (err) {
      this.logf(
        HttpPipelineLogLevel.ERROR,
        `RetryPolicy: Caught error, message: ${err.message}, code: ${err.code}`
      );
      if (!this.shouldRetry(isPrimaryRetry, attempt, response, err)) {
        throw err;
      }
    }

    await this.delay(isPrimaryRetry, attempt, request.abortSignal);
    return await this.attemptSendRequest(request, secondaryHas404, ++attempt);
  }

  /**
   * Decide whether to retry according to last HTTP response and retry counters.
   *
   * @protected
   * @param {boolean} isPrimaryRetry
   * @param {number} attempt
   * @param {HttpOperationResponse} [response]
   * @param {RestError} [err]
   * @returns {boolean}
   * @memberof StorageRetryPolicy
   */
  protected shouldRetry(
    isPrimaryRetry: boolean,
    attempt: number,
    response?: HttpOperationResponse,
    err?: RestError
  ): boolean {
    if (attempt >= this.retryOptions.maxTries!) {
      this.logf(
        HttpPipelineLogLevel.INFO,
        `RetryPolicy: Attempt(s) ${attempt} >= maxTries ${this.retryOptions
          .maxTries!}, no further try.`
      );
      return false;
    }

    // Handle network failures, you may need to customize the list when you implement
    // your own http client
    const retriableErrors = [
      "ETIMEDOUT",
      "ESOCKETTIMEDOUT",
      "ECONNREFUSED",
      "ECONNRESET",
      "ENOENT",
      "ENOTFOUND",
      "TIMEOUT",
      "REQUEST_SEND_ERROR" // For default xhr based http client provided in ms-rest-js
    ];
    if (err) {
      for (const retriableError of retriableErrors) {
        if (
          err.name.toUpperCase().includes(retriableError) ||
          err.message.toUpperCase().includes(retriableError) ||
          (err.code &&
            err.code
              .toString()
              .toUpperCase()
              .includes(retriableError))
        ) {
          this.logf(
            HttpPipelineLogLevel.INFO,
            `RetryPolicy: Network error ${retriableError} found, will retry.`
          );
          return true;
        }
      }
    }

    // If attempt was against the secondary & it returned a StatusNotFound (404), then
    // the resource was not found. This may be due to replication delay. So, in this
    // case, we'll never try the secondary again for this operation.
    if (response || err) {
      const statusCode = response ? response.status : err ? err.statusCode : 0;
      if (!isPrimaryRetry && statusCode === 404) {
        this.logf(HttpPipelineLogLevel.INFO, `RetryPolicy: Secondary access with 404, will retry.`);
        return true;
      }

      // Server internal error or server timeout
      if (statusCode === 503 || statusCode === 500) {
        this.logf(
          HttpPipelineLogLevel.INFO,
          `RetryPolicy: Will retry for status code ${statusCode}.`
        );
        return true;
      }
    }

    return false;
  }

  /**
   * This is to log for debugging purposes only.
   * Comment/uncomment as necessary for releasing/debugging.
   *
   * @private
   * @param {HttpPipelineLogLevel} _level
   * @param {string} _message
   * @memberof StorageRetryPolicy
   */
  // tslint:disable-next-line:variable-name
  private logf(_level: HttpPipelineLogLevel, _message: string) {
    // this.log(_level, _message);
  }

  /**
   * Delay a calculated time between retries.
   *
   * @private
   * @param {boolean} isPrimaryRetry
   * @param {number} attempt
   * @param {AbortSignalLike} [abortSignal]
   * @memberof StorageRetryPolicy
   */
  private async delay(isPrimaryRetry: boolean, attempt: number, abortSignal?: AbortSignalLike) {
    let delayTimeInMs: number = 0;

    if (isPrimaryRetry) {
      switch (this.retryOptions.retryPolicyType) {
        case StorageRetryPolicyType.EXPONENTIAL:
          delayTimeInMs = Math.min(
            (Math.pow(2, attempt - 1) - 1) * this.retryOptions.retryDelayInMs!,
            this.retryOptions.maxRetryDelayInMs!
          );
          break;
        case StorageRetryPolicyType.FIXED:
          delayTimeInMs = this.retryOptions.retryDelayInMs!;
          break;
      }
    } else {
      delayTimeInMs = Math.random() * 1000;
    }

    this.logf(HttpPipelineLogLevel.INFO, `RetryPolicy: Delay for ${delayTimeInMs}ms`);
    return delay(delayTimeInMs, abortSignal, RETRY_ABORT_ERROR);
  }
}
