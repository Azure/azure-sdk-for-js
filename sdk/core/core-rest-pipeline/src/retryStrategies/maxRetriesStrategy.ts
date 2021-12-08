// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger } from "@azure/logger";
import { RestError } from "../restError";
import { RetryStrategy } from "./retryStrategy";

const logger = createClientLogger("core-rest-pipeline maxRetriesStrategy");
const DEFAULT_MAX_RETRIES = 3;

export function maxRetriesStrategy(maxRetries: number = DEFAULT_MAX_RETRIES): RetryStrategy {
  return {
    name: `maxRetriesStrategy-${maxRetries}`,
    logger,
    updateRetryState(state) {
      const { retryCount, response, responseError } = state;
      if (retryCount >= maxRetries) {
        state.throwError = new RestError(`Exceeded number of retries: ${maxRetries}`, {
          request: response?.request,
          response,
          code: responseError?.code,
          statusCode: response?.status
        });
      }
      return state;
    }
  };
}
