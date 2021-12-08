// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";
import { PipelineResponse } from "../interfaces";
import { RestError } from "../restError";
import { RetryError } from "./retryError";

export interface RetryStrategyState {
  // Retry count
  retryCount: number;
  // Retry error
  retryError: RetryError;
  // Response from the last request
  response?: PipelineResponse;
  // Error from the last request
  responseError?: RestError;
  // Retry after the given number of milliseconds.
  retryAfterInMs?: number;
  // Throw this RestError instead of retrying
  throwError?: RestError;
  // Retry with this new URL
  redirectTo?: string;
}

export interface RetryStrategy {
  name: string;
  logger?: AzureLogger;
  meetsConditions?(state: RetryStrategyState): boolean;
  updateRetryState(state: RetryStrategyState): RetryStrategyState;
}
