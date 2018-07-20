// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { translate, MessagingError } from "./errors";
import { delay } from ".";
import * as debugModule from "debug";
const debug = debugModule("azure:amqp-common:retry");

function isDelivery(obj: any): boolean {
  let result: boolean = false;
  if (obj && typeof obj.id === "number" && typeof obj.settled === "boolean" &&
    typeof obj.remote_settled === "boolean" && typeof obj.format === "number") {
    result = true;
  }
  return result;
}

export enum RetryOperationType {
  cbsAuth = "cbsAuth",
  connection = "connection",
  management = "management",
  receiverLink = "receiverLink",
  senderLink = "senderLink",
  sendMessage = "sendMessage",
  session = "session"
}

/**
 * Describes the parameters that need to be configured for the retry operation.
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
   * next attempt. Default: 15.
   */
  delayInSeconds?: number;
}

function validateRetryConfig<T>(config: RetryConfig<T>): void {
  if (!config.operation || typeof config.operation !== "function") {
    throw new Error("'operation' is a required property and must be of type 'function' that returns a Promise.");
  }

  if (!config.connectionId || typeof config.connectionId !== "string") {
    throw new Error("'connectionId' is a required property and must be of type 'string'.");
  }

  if (!config.operationType || typeof config.operationType !== "string") {
    throw new Error("'operationType' is a required property and must be of type 'string'.");
  }

  if (config.times && typeof config.times !== "number") {
    throw new Error("'times' must be of type 'number'.");
  }

  if (config.delayInSeconds && typeof config.delayInSeconds !== "number") {
    throw new Error("'delayInSeconds' must be of type 'number'.");
  }
}

/**
 * It will attempt to linearly retry an operation specified number of times with a specified
 * delay in between each retry. The retries will only happen if the error is retryable.
 *
 * @param {RetryConfig<T>} config Parameters to configure retry operation.
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function retry<T>(config: RetryConfig<T>): Promise<T> {
  validateRetryConfig(config);
  if (!config.times) config.times = 3;
  if (!config.delayInSeconds) config.delayInSeconds = 15;
  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;
  for (let i = 0; i < config.times; i++) {
    const j = i + 1;
    debug("[%s] Retry attempt number: %d", config.connectionId, j);
    try {
      result = await config.operation();
      success = true;
      debug("[%s] Success, after attempt number: %d.", config.connectionId, j);
      if (result && !isDelivery(result)) {
        debug("[%s] Success result: %O", config.connectionId, result);
      }
      break;
    } catch (err) {
      if (!err.translated) {
        err = translate(err);
      }
      lastError = err;
      debug("[%s] Error occured in attempt number %d: %O", config.connectionId, j, err);
      if (lastError && lastError.retryable) {
        debug("[%s] Sleeping for %d seconds.", config.connectionId, config.delayInSeconds);
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
