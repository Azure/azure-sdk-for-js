// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */

import { MessagingError, translate } from "./errors";
import { AbortSignalLike } from "@azure/abort-controller";
import { Constants } from "./util/constants";
import { checkNetworkConnection } from "./util/checkNetworkConnection";
import { delay } from "./util/utils";
import { logger } from "./log";

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
  Fixed,
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
  messageSettlement = "settlement",
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
 * Calculates delay between retries, in milliseconds.
 * @internal
 */
function calculateDelay(
  attemptCount: number,
  retryDelayInMs: number,
  maxRetryDelayInMs: number,
  mode: RetryMode
): number {
  if (mode === RetryMode.Exponential) {
    const boundedRandDelta =
      retryDelayInMs * 0.8 +
      Math.floor(Math.random() * (retryDelayInMs * 1.2 - retryDelayInMs * 0.8));

    const incrementDelta = boundedRandDelta * (Math.pow(2, attemptCount) - 1);
    return Math.min(incrementDelta, maxRetryDelayInMs);
  }

  return retryDelayInMs;
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
  const updatedConfig = { ...config };
  if (!updatedConfig.retryOptions) {
    updatedConfig.retryOptions = {};
  }
  if (
    updatedConfig.retryOptions.maxRetries == undefined ||
    updatedConfig.retryOptions.maxRetries < 0
  ) {
    updatedConfig.retryOptions.maxRetries = Constants.defaultMaxRetries;
  }
  if (
    updatedConfig.retryOptions.retryDelayInMs == undefined ||
    updatedConfig.retryOptions.retryDelayInMs < 0
  ) {
    updatedConfig.retryOptions.retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs;
  }
  if (
    updatedConfig.retryOptions.maxRetryDelayInMs == undefined ||
    updatedConfig.retryOptions.maxRetryDelayInMs < 0
  ) {
    updatedConfig.retryOptions.maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs;
  }
  if (updatedConfig.retryOptions.mode == undefined) {
    updatedConfig.retryOptions.mode = RetryMode.Fixed;
  }
  let lastError: MessagingError | Error | undefined;
  let result: any;
  let success = false;
  const totalNumberOfAttempts = updatedConfig.retryOptions.maxRetries + 1;
  for (let i = 1; i <= totalNumberOfAttempts; i++) {
    logger.verbose(
      "[%s] Attempt number for '%s': %d.",
      updatedConfig.connectionId,
      updatedConfig.operationType,
      i
    );
    try {
      result = await updatedConfig.operation();
      success = true;
      logger.verbose(
        "[%s] Success for '%s', after attempt number: %d.",
        updatedConfig.connectionId,
        updatedConfig.operationType,
        i
      );
      if (result && !isDelivery(result)) {
        logger.verbose(
          "[%s] Success result for '%s': %O",
          updatedConfig.connectionId,
          updatedConfig.operationType,
          result
        );
      }
      break;
    } catch (_err) {
      const err = translate(_err);

      if (
        !(err as any).retryable &&
        err.name === "ServiceCommunicationError" &&
        updatedConfig.connectionHost
      ) {
        const isConnected = await checkNetworkConnection(updatedConfig.connectionHost);
        if (!isConnected) {
          err.name = "ConnectionLostError";
          (err as any).retryable = true;
        }
      }
      logger.verbose(
        "[%s] Error occurred for '%s' in attempt number %d: %O",
        updatedConfig.connectionId,
        updatedConfig.operationType,
        i,
        err
      );

      lastError = err;
      if ((lastError as any).retryable && totalNumberOfAttempts > i) {
        const targetDelayInMs = calculateDelay(
          i,
          updatedConfig.retryOptions.retryDelayInMs,
          updatedConfig.retryOptions.maxRetryDelayInMs,
          updatedConfig.retryOptions.mode
        );
        logger.verbose(
          "[%s] Sleeping for %d milliseconds for '%s'.",
          updatedConfig.connectionId,
          targetDelayInMs,
          updatedConfig.operationType
        );
        await delay(
          targetDelayInMs,
          updatedConfig.abortSignal,
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
