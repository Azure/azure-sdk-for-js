// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, MessagingError } from "./errors";
import { delay, isNode } from "./util/utils";
import * as log from "./log";
import {
  defaultRetryAttempts,
  defaultDelayBetweenRetriesInSeconds,
  defaultMaxDelayForExponentialRetryInMilliseconds,
  defaultMinDelayForExponentialRetryInMilliseconds
} from "./util/constants";
import { resolve } from "dns";

/**
 * Determines whether the object is a Delivery object.
 * @ignore
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
 * Describes the retry operation type.
 * @enum RetryOperationType
 */
export enum RetryOperationType {
  cbsAuth = "cbsAuth",
  connection = "connection",
  management = "management",
  receiverLink = "receiverLink",
  senderLink = "senderLink",
  sendMessage = "sendMessage",
  receiveMessage = "receiveMessage",
  session = "session"
}

/**
 * Describes the parameters that need to be configured for the retry operation.
 * @interface RetryConfig
 */
export interface RetryConfig<T> {
  /**
   * @property {Promise<T>} operation The operation that needs to be retried.
   */
  operation: () => Promise<T>;
  /**
   * @property {string} connectionId The connection identifier. Used in logging information.
   * Extremely useful when multiple connections are logged in the same file.
   */
  connectionId: string;
  /**
   * @property {RetryOperationType} operationType The name/type of operation to be performed.
   * Extremely useful in providing better debug logs.
   */
  operationType: RetryOperationType;
  /**
   * @property {number} [times] Number of times the operation needs to be retried in case
   * of error. Default: 3.
   */
  times?: number;
  /**
   * @property {number} [delayInSeconds] Amount of time to wait in seconds before making the
   * next attempt. Applicable only when performing linear retry. Default: 15.
   */
  delayInSeconds?: number;
  /**
   * @property {string} connectionHost The host "<yournamespace>.servicebus.windows.net".
   * Used to check network connectivity. Applicable only when performing linear retry.
   */
  connectionHost?: string;
  /**
   * @property {boolean} [exponentialRetry] Flag to denote if we want to perform exponential retry and not
   * the default, which is linear. Setting this to `true` disregards all linear retry related options.
   */
  exponentialRetry?: boolean;
  /**
   * @property {number} [maxExponentialRetryDelayInMilliseconds] Denotes the maximum delay between retries
   * until which retry attempts will be made. Applicable only when performing exponential retry.
   */
  maxExponentialRetryDelayInMilliseconds?: number;
  /**
   * @property {number} [minExponentialRetryDelayInMilliseconds] Denotes the minimum delay to use between retries.
   * Applicable only when performing exponential retry.
   */
  minExponentialRetryDelayInMilliseconds?: number;
}

/**
 * Validates the retry config.
 * @ignore
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

async function checkNetworkConnection(host: string): Promise<boolean> {
  if (isNode) {
    return new Promise((res) => {
      resolve(host, function(err: any): void {
        if (err && err.code === "ECONNREFUSED") {
          res(false);
        } else {
          res(true);
        }
      });
    });
  } else {
    return window.navigator.onLine;
  }
}

/**
 * It will attempt to linearly retry an operation specified number of times with a specified
 * delay in between each retry. The retries will only happen if the error is retryable.
 *
 * @param {RetryConfig<T>} config Parameters that define what type of retry will be performed
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function retry<T>(config: RetryConfig<T>): Promise<T> {
  if (config.exponentialRetry === true) {
    return exponentialRetry(config);
  } else {
    return linearRetry(config);
  }
}

/**
 *
 * Utility to linearly retry on the given operation for a specified number of times,
 * with a specified delay in between each retry.
 *
 * @param {RetryConfig<T>} config Parameters to configure retry operation.
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function linearRetry<T>(config: RetryConfig<T>): Promise<T> {
  validateRetryConfig(config);
  if (config.times == undefined) config.times = defaultRetryAttempts;
  if (config.delayInSeconds == undefined) {
    config.delayInSeconds = defaultDelayBetweenRetriesInSeconds;
  }
  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;
  for (let i = 0; i < config.times; i++) {
    const j = i + 1;
    log.retry(
      "[%s] Retry for '%s', attempt number: %d",
      config.connectionId,
      config.operationType,
      j
    );
    try {
      result = await config.operation();
      success = true;
      log.retry(
        "[%s] Success for '%s', after attempt number: %d.",
        config.connectionId,
        config.operationType,
        j
      );
      if (result && !isDelivery(result)) {
        log.retry(
          "[%s] Success result for '%s': %O",
          config.connectionId,
          config.operationType,
          result
        );
      }
      break;
    } catch (err) {
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
      log.error(
        "[%s] Error occured for '%s' in attempt number %d: %O",
        config.connectionId,
        config.operationType,
        j,
        err
      );
      if (lastError && lastError.retryable) {
        log.error(
          "[%s] Sleeping for %d seconds for '%s'.",
          config.connectionId,
          config.delayInSeconds,
          config.operationType
        );
        await delay(config.delayInSeconds * 1000);
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

/**
 *
 * Utility to exponentially retry on the given operation for until the specified maximum
 * delay between operations is reached.
 *
 * @param {RetryConfig<T>} config Parameters to configure retry operation.
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function exponentialRetry<T>(config: RetryConfig<T>): Promise<T> {
  validateRetryConfig(config);
  if (config.maxExponentialRetryDelayInMilliseconds == undefined)
    config.maxExponentialRetryDelayInMilliseconds = defaultMaxDelayForExponentialRetryInMilliseconds;
  if (config.minExponentialRetryDelayInMilliseconds == undefined)
    config.minExponentialRetryDelayInMilliseconds = defaultMinDelayForExponentialRetryInMilliseconds;

  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;

  // Based on specified max delay, the total number of attempts to be made can be determined as,
  // minExponentialRetryDelayInMilliseconds + 2^(retryAttempts) should be less than or equal to maxExponentialRetryDelayInMilliseconds
  const totalNumberOfAttempts = Math.floor(
    Math.log2(
      config.maxExponentialRetryDelayInMilliseconds - config.minExponentialRetryDelayInMilliseconds
    )
  );

  for (let i = 1; i <= totalNumberOfAttempts; i++) {
    log.retry("[%s] Attempt number: %d", config.connectionId, config.operationType, i);
    try {
      result = await config.operation();
      success = true;
      log.retry(
        "[%s] Success for '%s', after attempt number: %d.",
        config.connectionId,
        config.operationType,
        i
      );
      if (result && !isDelivery(result)) {
        log.retry(
          "[%s] Success result for '%s': %O",
          config.connectionId,
          config.operationType,
          result
        );
      }
      break;
    } catch (err) {
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
      log.error(
        "[%s] Error occured for '%s' in attempt number %d: %O",
        config.connectionId,
        config.operationType,
        i,
        err
      );

      const targetDelayInMilliseconds = Math.min(
        config.minExponentialRetryDelayInMilliseconds + Math.pow(2, i),
        config.maxExponentialRetryDelayInMilliseconds
      );
      if (lastError && lastError.retryable) {
        log.error(
          "[%s] Sleeping for %d seconds for '%s'.",
          config.connectionId,
          targetDelayInMilliseconds / 1000,
          config.operationType
        );
        await delay(targetDelayInMilliseconds);
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
