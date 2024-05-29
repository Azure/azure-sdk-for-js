// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "@azure/abort-controller";
import {
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
  isRestError,
  RestError,
} from "@azure/core-rest-pipeline";
import { getErrorMessage } from "@azure/core-util";
import { StorageRetryOptions } from "../StorageRetryPolicyFactory";
import { HeaderConstants, URLConstants } from "../utils/constants";
import { delay, setURLParameter } from "../utils/utils.common";
import { logger } from "../log";

/**
 * Name of the {@link storageRetryPolicy}
 */
export const storageRetryPolicyName = "storageRetryPolicy";

/**
 * RetryPolicy types.
 */
export enum StorageRetryPolicyType {
  /**
   * Exponential retry. Retry time delay grows exponentially.
   */
  EXPONENTIAL,
  /**
   * Linear retry. Retry time delay grows linearly.
   */
  FIXED,
}

// Default values of StorageRetryOptions
const DEFAULT_RETRY_OPTIONS = {
  maxRetryDelayInMs: 120 * 1000,
  maxTries: 4,
  retryDelayInMs: 4 * 1000,
  retryPolicyType: StorageRetryPolicyType.EXPONENTIAL,
  secondaryHost: "",
  tryTimeoutInMs: undefined, // Use server side default timeout strategy
} as const;

const retriableErrors = [
  "ETIMEDOUT",
  "ESOCKETTIMEDOUT",
  "ECONNREFUSED",
  "ECONNRESET",
  "ENOENT",
  "ENOTFOUND",
  "TIMEOUT",
  "EPIPE",
  "REQUEST_SEND_ERROR",
] as const;

const RETRY_ABORT_ERROR = new AbortError("The operation was aborted.");

/**
 * Retry policy with exponential retry and linear retry implemented.
 */
export function storageRetryPolicy(options: StorageRetryOptions = {}): PipelinePolicy {
  const retryPolicyType = options.retryPolicyType ?? DEFAULT_RETRY_OPTIONS.retryPolicyType;
  const maxTries = options.maxTries ?? DEFAULT_RETRY_OPTIONS.maxTries;
  const retryDelayInMs = options.retryDelayInMs ?? DEFAULT_RETRY_OPTIONS.retryDelayInMs;
  const maxRetryDelayInMs = options.maxRetryDelayInMs ?? DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs;
  const tryTimeoutInMs = options.tryTimeoutInMs ?? DEFAULT_RETRY_OPTIONS.tryTimeoutInMs;

  function shouldRetry({
    isPrimaryRetry,
    attempt,
    response,
    error,
  }: {
    isPrimaryRetry: boolean;
    attempt: number;
    response?: PipelineResponse;
    error?: RestError;
  }): boolean {
    if (attempt >= maxTries) {
      logger.info(`RetryPolicy: Attempt(s) ${attempt} >= maxTries ${maxTries}, no further try.`);
      return false;
    }
    if (error) {
      for (const retriableError of retriableErrors) {
        if (
          error.name.toUpperCase().includes(retriableError) ||
          error.message.toUpperCase().includes(retriableError) ||
          (error.code && error.code.toString().toUpperCase() === retriableError)
        ) {
          logger.info(`RetryPolicy: Network error ${retriableError} found, will retry.`);
          return true;
        }
      }
      if (
        error?.code === "PARSE_ERROR" &&
        error?.message.startsWith(`Error "Error: Unclosed root tag`)
      ) {
        logger.info(
          "RetryPolicy: Incomplete XML response likely due to service timeout, will retry.",
        );
        return true;
      }
    }
    // If attempt was against the secondary & it returned a StatusNotFound (404), then
    // the resource was not found. This may be due to replication delay. So, in this
    // case, we'll never try the secondary again for this operation.
    if (response || error) {
      const statusCode = response?.status ?? error?.statusCode ?? 0;
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

    if (response) {
      // Retry select Copy Source Error Codes.
      if (response?.status >= 400) {
        const copySourceError = response.headers.get(HeaderConstants.X_MS_CopySourceErrorCode);
        if (copySourceError !== undefined) {
          switch (copySourceError)
          {
              case "InternalError":
              case "OperationTimedOut":
              case "ServerBusy":
                  return true;
          }
        }
      }
    }

    return false;
  }
  function calculateDelay(isPrimaryRetry: boolean, attempt: number): number {
    let delayTimeInMs = 0;

    if (isPrimaryRetry) {
      switch (retryPolicyType) {
        case StorageRetryPolicyType.EXPONENTIAL:
          delayTimeInMs = Math.min(
            (Math.pow(2, attempt - 1) - 1) * retryDelayInMs,
            maxRetryDelayInMs,
          );
          break;
        case StorageRetryPolicyType.FIXED:
          delayTimeInMs = retryDelayInMs;
          break;
      }
    } else {
      delayTimeInMs = Math.random() * 1000;
    }

    logger.info(`RetryPolicy: Delay for ${delayTimeInMs}ms`);
    return delayTimeInMs;
  }
  return {
    name: storageRetryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // Set the server-side timeout query parameter "timeout=[seconds]"
      if (tryTimeoutInMs) {
        request.url = setURLParameter(
          request.url,
          URLConstants.Parameters.TIMEOUT,
          String(Math.floor(tryTimeoutInMs / 1000)),
        );
      }
      const primaryUrl = request.url;
      let secondaryHas404 = false;
      let attempt = 1;
      let retryAgain = true;
      let response: PipelineResponse | undefined;
      let error: RestError | undefined;
      while (retryAgain) {
        const isPrimaryRetry: boolean = true;
        request.url = primaryUrl;
        response = undefined;
        error = undefined;
        try {
          logger.info(
            `RetryPolicy: =====> Try=${attempt} ${isPrimaryRetry ? "Primary" : "Secondary"}`,
          );
          response = await next(request);
          secondaryHas404 = secondaryHas404 || (!isPrimaryRetry && response.status === 404);
        } catch (e: unknown) {
          if (isRestError(e)) {
            logger.error(`RetryPolicy: Caught error, message: ${e.message}, code: ${e.code}`);
            error = e;
          } else {
            logger.error(`RetryPolicy: Caught error, message: ${getErrorMessage(e)}`);
            throw e;
          }
        }
        retryAgain = shouldRetry({ isPrimaryRetry, attempt, response, error });
        if (retryAgain) {
          await delay(
            calculateDelay(isPrimaryRetry, attempt),
            request.abortSignal,
            RETRY_ABORT_ERROR,
          );
        }
        attempt++;
      }
      if (response) {
        return response;
      }
      throw error ?? new RestError("RetryPolicy failed without known error.");
    },
  };
}
