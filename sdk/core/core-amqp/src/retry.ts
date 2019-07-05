// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, MessagingError } from "./errors";
import { delay, isNode } from "./util/utils";
import * as log from "./log";
import { defaultMaxRetries, defaultDelayBetweenRetriesInSeconds } from "./util/constants";
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
   * of retryable error. Default: 3.
   */
  maxRetries?: number;
  /**
   * @property {number} [delayInSeconds] Amount of time to wait in seconds before making the
   * next attempt. Default: 15.
   */
  delayInSeconds?: number;
  /**
   * @property {string} connectionHost The host "<yournamespace>.servicebus.windows.net".
   * Used to check network connectivity.
   */
  connectionHost?: string;
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
 * Every operation is attempted at least once. Additional attempts are made if the previous attempt failed
 * with a retryable error. The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * The retries when made are done so linearly on the given operation for a specified number of times,
 * with a specified delay in between each retry.
 *
 * @param {RetryConfig<T>} config Parameters to configure retry operation.
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
