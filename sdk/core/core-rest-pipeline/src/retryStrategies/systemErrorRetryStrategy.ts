// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "../restError";
import { RetryStrategy } from "./retryStrategy";
import { exponentialRetryStrategy } from "./exponentialRetryStrategy";
import { createClientLogger } from "@azure/logger";

const logger = createClientLogger("core-rest-pipeline systemErrorRetryStrategy");

const DEFAULT_CLIENT_RETRY_COUNT = 10;

// intervals are in ms
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * System error retry strategy
 */
export function systemErrorRetryStrategy(
  options: {
    /**
     * The maximum number of retry attempts.  Defaults to 10.
     */
    maxRetries?: number;

    /**
     * The amount of delay in milliseconds between retry attempts. Defaults to 1000
     * (1 second.) The delay increases exponentially with each retry up to a maximum
     * specified by maxRetryDelayInMs.
     */
    retryDelayInMs?: number;

    /**
     * The maximum delay in milliseconds allowed before retrying an operation. Defaults
     * to 64000 (64 seconds).
     */
    maxRetryDelayInMs?: number;
  } = {}
): RetryStrategy {
  const maxRetries = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
  const retryDelayInMs = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryDelayInMs = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  return {
    name: "systemErrorRetryStrategy",
    logger,
    meetsConditions({ responseError }) {
      return isSystemError(responseError);
    },
    updateRetryState: exponentialRetryStrategy({ maxRetries, retryDelayInMs, maxRetryDelayInMs })
      .updateRetryState
  };
}

function isSystemError(err?: RestError): boolean {
  if (!err) {
    return false;
  }
  return (
    err.code === "ETIMEDOUT" ||
    err.code === "ESOCKETTIMEDOUT" ||
    err.code === "ECONNREFUSED" ||
    err.code === "ECONNRESET" ||
    err.code === "ENOENT"
  );
}
