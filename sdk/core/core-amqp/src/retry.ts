// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */

import { MessagingError, translate } from "./errors";
import { delay } from "./util/utils";
import { logger } from "./log";
import { Constants } from "./util/constants";
import { AbortSignalLike } from "@azure/abort-controller";
import { checkNetworkConnection } from "./util/checkNetworkConnection";

/**
 * Determines whether the object is a Delivery object.
 * @internal
 */
function isDelivery(obj: any): boolean {
  let result: boolean = false;
  if (
    obj &&
    typeof obj.id === "number" &&
    typeof obj.settled === "boolean" &&
    typeof obj.remote_settled === "boolean" &&
    typeof obj.format === "number"
  ) {
    result = true;
  }
  return result;
}

/**
 * Describes the Retry Mode type
 */
export enum RetryMode {
  Exponential,
  Fixed
}

/**
 * Describes the retry operation type.
 */
export enum RetryOperationType {
  cbsAuth = "cbsAuth",
  connection = "connection",
  management = "management",
  receiverLink = "receiverLink",
  senderLink = "senderLink",
  sendMessage = "sendMessage",
  receiveMessage = "receiveMessage",
  session = "session",
  messageSettlement = "settlement"
}

/**
 * Retry policy options that determine the mode, number of retries, retry interval etc.
 */
export interface RetryOptions {
  /**
   * Number of times the operation needs to be retried in case
   * of retryable error. Default: 3.
   */
  maxRetries?: number;
  /**
   * Amount of time to wait in milliseconds before making the
   * next attempt. Default: `30000 milliseconds`.
   * When `mode` option is set to `Exponential`,
   * this is used to compute the exponentially increasing delays between retries.
   */
  retryDelayInMs?: number;
  /**
   * Number of milliseconds to wait before declaring that current attempt has timed out which will trigger a retry
   * A minimum value of `60000` milliseconds will be used if a value not greater than this is provided.
   */
  timeoutInMs?: number;
  /**
   * Denotes which retry mode to apply. If undefined, defaults to `Fixed`
   */
  mode?: RetryMode;
  /**
   * Denotes the maximum delay between retries
   * that the retry attempts will be capped at. Applicable only when performing exponential retry.
   */
  maxRetryDelayInMs?: number;
}

/**
 * Describes the parameters that need to be configured for the retry operation.
 */
export interface RetryConfig<T> {
  /**
   * The operation that needs to be retried.
   */
  operation: () => Promise<T>;
  /**
   * The connection identifier. Used in logging information.
   * Extremely useful when multiple connections are logged in the same file.
   */
  connectionId: string;
  /**
   * The name/type of operation to be performed.
   * Extremely useful in providing better debug logs.
   */
  operationType: RetryOperationType;
  /**
   * The host "<yournamespace>.servicebus.windows.net".
   * Used to check network connectivity.
   */
  connectionHost?: string;
  /**
   * The retry related options associated with given operation execution.
   */
  retryOptions?: RetryOptions;
  /**
   * The `AbortSignal` associated with the operation being retried on.
   * If this signal is fired during the wait time between retries, then the `retry()` method will ensure that the wait is abandoned and the retry process gets cancelled. If this signal is fired when the operation is in progress, then the operation is expected to react to it.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Validates the retry config.
 * @internal
 */
function validateRetryConfig<T>(config: RetryConfig<T>): void {
  if (!config.operation) {
    throw new TypeError("Missing 'operation' in retry configuration");
  }

  if (!config.connectionId) {
    throw new TypeError("Missing 'connectionId' in retry configuration");
  }

  if (!config.operationType) {
    throw new TypeError("Missing 'operationType' in retry configuration");
  }
}

/**
 * Every operation is attempted at least once. Additional attempts are made if the previous attempt failed
 * with a retryable error. The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * If `mode` option is set to `Fixed`, then the retries are made on the
 * given operation for a specified number of times, with a fixed delay in between each retry each time.
 *
 * If `mode` option is set to `Exponential`, then the delay between retries is adjusted to increase
 * exponentially with each attempt using back-off factor of power 2.
 *
 * @param config - Parameters to configure retry operation
 *
 * @returns Promise<T>.
 */
export async function retry<T>(config: RetryConfig<T>): Promise<T> {
  validateRetryConfig(config);
  if (!config.retryOptions) {
    config.retryOptions = {};
  }
  if (config.retryOptions.maxRetries == undefined || config.retryOptions.maxRetries < 0) {
    config.retryOptions.maxRetries = Constants.defaultMaxRetries;
  }
  if (config.retryOptions.retryDelayInMs == undefined || config.retryOptions.retryDelayInMs < 0) {
    config.retryOptions.retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs;
  }
  if (
    config.retryOptions.maxRetryDelayInMs == undefined ||
    config.retryOptions.maxRetryDelayInMs < 0
  ) {
    config.retryOptions.maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs;
  }
  if (config.retryOptions.mode == undefined) {
    config.retryOptions.mode = RetryMode.Fixed;
  }
  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;
  const totalNumberOfAttempts = config.retryOptions.maxRetries + 1;
  for (let i = 1; i <= totalNumberOfAttempts; i++) {
    logger.verbose(
      "[%s] Attempt number for '%s': %d.",
      config.connectionId,
      config.operationType,
      i
    );
    try {
      result = await config.operation();
      success = true;
      logger.verbose(
        "[%s] Success for '%s', after attempt number: %d.",
        config.connectionId,
        config.operationType,
        i
      );
      if (result && !isDelivery(result)) {
        logger.verbose(
          "[%s] Success result for '%s': %O",
          config.connectionId,
          config.operationType,
          result
        );
      }
      break;
    } catch (_err) {
      let err = _err;
      if (!err.translated) {
        err = translate(err);
      }

      if (!err.retryable && err.name === "ServiceCommunicationError" && config.connectionHost) {
        const isConnected = await checkNetworkConnection(config.connectionHost);
        if (!isConnected) {
          err.name = "ConnectionLostError";
          err.retryable = true;
        }
      }
      lastError = err;
      logger.verbose(
        "[%s] Error occurred for '%s' in attempt number %d: %O",
        config.connectionId,
        config.operationType,
        i,
        err
      );
      let targetDelayInMs = config.retryOptions.retryDelayInMs;
      if (config.retryOptions.mode === RetryMode.Exponential) {
        let incrementDelta = Math.pow(2, i) - 1;
        const boundedRandDelta =
          config.retryOptions.retryDelayInMs * 0.8 +
          Math.floor(
            Math.random() *
              (config.retryOptions.retryDelayInMs * 1.2 - config.retryOptions.retryDelayInMs * 0.8)
          );
        incrementDelta *= boundedRandDelta;

        targetDelayInMs = Math.min(incrementDelta, config.retryOptions.maxRetryDelayInMs);
      }

      if (lastError && lastError.retryable && totalNumberOfAttempts > i) {
        logger.verbose(
          "[%s] Sleeping for %d milliseconds for '%s'.",
          config.connectionId,
          targetDelayInMs,
          config.operationType
        );
        await delay(
          targetDelayInMs,
          config.abortSignal,
          `The retry operation has been cancelled by the user.`
        );
        continue;
      } else {
        break;
      }
    }
  }
  if (success) {
    return result;
  } else {
    throw lastError;
  }
}
