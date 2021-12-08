// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "../restError";
import { RetryStrategy } from "./retryStrategy";
import { exponentialRetryStrategy } from "./exponentialRetryStrategy";
import { createClientLogger } from "@azure/logger";

const logger = createClientLogger("core-rest-pipeline systemErrorRetryStrategy");

/**
 * System error retry strategy
 */
export function systemErrorRetryStrategy(
  retryInterval: number,
  maxRetryInterval: number
): RetryStrategy {
  return {
    name: "systemErrorRetryStrategy",
    logger,
    meetsConditions({ responseError }) {
      return isSystemError(responseError);
    },
    updateRetryState: exponentialRetryStrategy(retryInterval, maxRetryInterval).updateRetryState
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
