// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { RestError } from "@azure/core-https";
import { PipelineResponse, PipelineRequest, SendRequest, PipelinePolicy } from "@azure/core-https";

import { URLConstants } from "../utils/constants";
import { delay, setURLHost, setURLParameter } from "../utils/utils.common";
import { logger } from "../log";

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

/**
 * Storage Blob retry options interface.
 *
 * @export
 * @interface StorageRetryOptions
 */
export interface StorageRetryOptions {
  /**
   * Optional. StorageRetryPolicyType, default is exponential retry policy.
   *
   * @type {StorageRetryPolicyType}
   * @memberof StorageRetryOptions
   */
  readonly retryPolicyType?: StorageRetryPolicyType;

  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly maxTries?: number;

  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means no default timeout on SDK client, Azure
   * Storage server's default timeout policy will be used.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly tryTimeoutInMs?: number;

  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly retryDelayInMs?: number;

  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly maxRetryDelayInMs?: number;

  /**
   * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
   * (the default) then operations are not retried against another host.
   *
   * NOTE: Before setting this field, make sure you understand the issues around
   * reading stale and potentially-inconsistent data at
   * {@link https://docs.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
   *
   * @type {string}
   * @memberof StorageRetryOptions
   */
  readonly secondaryHost?: string;
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

export const storageRetryPolicyName = "storageRetryPolicy";

function shouldRetry(
  isPrimaryRetry: boolean,
  attempt: number,
  retryOptions: StorageRetryOptions,
  response?: PipelineResponse,
  err?: RestError
): boolean {
  if (attempt >= retryOptions.maxTries!) {
    logger.info(
      `RetryPolicy: Attempt(s) ${attempt} >= maxTries ${retryOptions.maxTries!}, no further try.`
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
    "EPIPE",
    "REQUEST_SEND_ERROR" // For default xhr based http client provided in ms-rest-js
  ];
  if (err) {
    for (const retriableError of retriableErrors) {
      if (
        err.name.toUpperCase().includes(retriableError) ||
        err.message.toUpperCase().includes(retriableError) ||
        (err.code && err.code.toString().toUpperCase() === retriableError)
      ) {
        logger.info(`RetryPolicy: Network error ${retriableError} found, will retry.`);
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
      logger.info(`RetryPolicy: Secondary access with 404, will retry.`);
      return true;
    }

    // Server internal error or server timeout
    if (statusCode === 503 || statusCode === 500) {
      logger.info(`RetryPolicy: Will retry for status code ${statusCode}.`);
      return true;
    }
  }

  if (err?.code === "PARSE_ERROR" && err?.message.startsWith(`Error "Error: Unclosed root tag`)) {
    logger.info("RetryPolicy: Incomplete XML response likely due to service timeout, will retry.");
    return true;
  }

  return false;
}

async function storageRetryDelay(
  isPrimaryRetry: boolean,
  attempt: number,
  retryOptions: StorageRetryOptions,
  abortSignal?: AbortSignalLike
): Promise<void> {
  let delayTimeInMs: number = 0;

  if (isPrimaryRetry) {
    switch (retryOptions.retryPolicyType) {
      case StorageRetryPolicyType.EXPONENTIAL:
        delayTimeInMs = Math.min(
          (Math.pow(2, attempt - 1) - 1) * retryOptions.retryDelayInMs!,
          retryOptions.maxRetryDelayInMs!
        );
        break;
      case StorageRetryPolicyType.FIXED:
        delayTimeInMs = retryOptions.retryDelayInMs!;
        break;
    }
  } else {
    delayTimeInMs = Math.random() * 1000;
  }

  logger.info(`RetryPolicy: Delay for ${delayTimeInMs}ms`);
  return delay(delayTimeInMs, abortSignal, RETRY_ABORT_ERROR);
}

async function attemptSendRequest(
  request: PipelineRequest,
  secondaryHas404: boolean,
  attempt: number,
  primaryHost: string,
  retryOptions: StorageRetryOptions,
  next: SendRequest
): Promise<PipelineResponse> {
  const isPrimaryRetry =
    secondaryHas404 ||
    !retryOptions.secondaryHost ||
    !(request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") ||
    attempt % 2 === 1;

  if (isPrimaryRetry) {
    request.url = setURLHost(request.url, primaryHost);
  } else {
    request.url = setURLHost(request.url, retryOptions.secondaryHost!);
  }

  // Set the server-side timeout query parameter "timeout=[seconds]"
  if (retryOptions.tryTimeoutInMs && request.url.indexOf("&timeout=") !== -1) {
    request.url = setURLParameter(
      request.url,
      URLConstants.Parameters.TIMEOUT,
      Math.floor(retryOptions.tryTimeoutInMs! / 1000).toString()
    );
  }

  let response: PipelineResponse | undefined;
  try {
    logger.info(`RetryPolicy: =====> Try=${attempt} ${isPrimaryRetry ? "Primary" : "Secondary"}`);
    response = await next(request);
    if (!shouldRetry(isPrimaryRetry, attempt, retryOptions, response)) {
      return response;
    }

    secondaryHas404 = secondaryHas404 || (!isPrimaryRetry && response.status === 404);
  } catch (err) {
    logger.error(`RetryPolicy: Caught error, message: ${err.message}, code: ${err.code}`);
    if (!shouldRetry(isPrimaryRetry, attempt, retryOptions, response, err)) {
      throw err;
    }
  }

  await storageRetryDelay(isPrimaryRetry, attempt, retryOptions, request.abortSignal);
  return await attemptSendRequest(
    request,
    secondaryHas404,
    ++attempt,
    primaryHost,
    retryOptions,
    next
  );
}

export function storageRetryPolicy(
  retryOptions: StorageRetryOptions = DEFAULT_RETRY_OPTIONS
): PipelinePolicy {
  // Initialize retry options
  const retryOptionsFinal = {
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

  return {
    name: storageRetryPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const primaryHost = new URL(request.url).host;
      return attemptSendRequest(request, false, 1, primaryHost, retryOptionsFinal, next);
    }
  };
}
