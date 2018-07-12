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

/**
 * It will attempt to linearly retry an operation specified number of times with a specified
 * delay in between each retry. The retries will only happen if the error is retryable.
 *
 * @param {Promise<T>} operation    The operation that needs to be retried.
 * @param {number} [times]          Number of times the operation needs to be retried in case of error. Default: 3.
 * @param {number} [delayInSeconds] Amount of time to wait in seconds before making the next attempt. Default: 15.
 *
 * @return {Promise<T>} Promise<T>.
 */
export async function retry<T>(operation: () => Promise<T>, times?: number, delayInSeconds?: number): Promise<T> {
  if (!operation || typeof operation !== "function") {
    throw new Error("'operation' is a required parameter and must be of type 'function'.");
  }

  if (times && typeof times !== "number") {
    throw new Error("'times' must be of type 'number'.");
  }

  if (delayInSeconds && typeof delayInSeconds !== "number") {
    throw new Error("'delayInSeconds' must be of type 'number'.");
  }

  if (!times) times = 3;
  if (!delayInSeconds) delayInSeconds = 15;
  let lastError: MessagingError | undefined;
  let result: any;
  let success = false;
  for (let i = 0; i < times; i++) {
    const j = i + 1;
    debug("Retry attempt number: %d", j);
    try {
      result = await operation();
      success = true;
      debug("Success, after attempt number: %d.", j);
      if (!isDelivery(result)) {
        debug("Success result: %O", result);
      }
      break;
    } catch (err) {
      if (!err.translated) {
        err = translate(err);
      }
      lastError = err;
      debug("Error occured in attempt number %d: %O", j, err);
      if (lastError && lastError.retryable) {
        debug("Sleeping for %d seconds.", delayInSeconds);
        await delay(delayInSeconds * 1000);
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
