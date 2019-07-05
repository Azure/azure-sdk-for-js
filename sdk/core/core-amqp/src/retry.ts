// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, MessagingError } from "./errors";
import { delay, isNode } from "./util/utils";
import * as log from "./log";
import {
  defaultMaxRetries,
  defaultDelayBetweenRetriesInSeconds,
  defaultMaxDelayForExponentialRetryInMs
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
   * @property {number} [maxRetries] Number of times the operation needs to be retried in case
   * of error. Default: 3.
   */
  maxRetries?: number;
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
   * @property {number} [maxExponentialRetryDelayInMs] Denotes the maximum delay between retries
   * until which retry attempts will be made. Applicable only when performing exponential retry.
   */
  maxExponentialRetryDelayInMs?: number;
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
 * Additional attempts are made if the previous attempt failed with a `retryable` error.
 * The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * The retries when made are done so linearly on the given operation for a specified number of times,
 * with a specified delay in between each retry.
 *
 * If `exponentialRetry` option is set, then the delay between retries is adjusted to increase
 * exponentially with each attempt using back-off factor of power 2.
 *
 * @param {RetryConfig<T>} config Parameters that define what type of retry will be performed
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function retry<T>(config: RetryConfig<T>): Promise<T> {
  validateRetryConfig(config);
  if (config.maxRetries == undefined || config.maxRetries < 0) {
    config.maxRetries = defaultMaxRetries;
  }
  if (config.delayInSeconds == undefined || config.delayInSeconds < 0) {
    config.delayInSeconds = defaultDelayBetweenRetriesInSeconds;
  }
  if (config.maxExponentialRetryDelayInMs == undefined || config.maxExponentialRetryDelayInMs < 0) {
    config.maxExponentialRetryDelayInMs = defaultMaxDelayForExponentialRetryInMs;
  }
  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;
  const totalNumberOfAttempts = config.maxRetries + 1;
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
      const targetDelayInMs = config.exponentialRetry
        ? Math.min(
            (Math.pow(2, i - 1) - 1) * config.delayInSeconds,
            config.maxExponentialRetryDelayInMs
          )
        : config.delayInSeconds;
      if (lastError && lastError.retryable) {
        log.error(
          "[%s] Sleeping for %d seconds for '%s'.",
          config.connectionId,
          targetDelayInMs / 1000,
          config.operationType
        );
        await delay(targetDelayInMs);
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
