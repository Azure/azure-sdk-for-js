// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline.js";
import { exponentialRetryStrategy } from "../retryStrategies/exponentialRetryStrategy.js";
import { retryPolicy } from "./retryPolicy.js";
import { DEFAULT_RETRY_POLICY_COUNT } from "../constants.js";

/**
 * The programmatic identifier of the exponentialRetryPolicy.
 */
export const exponentialRetryPolicyName = "exponentialRetryPolicy";

/**
 * Options that control how to retry failed requests.
 */
export interface ExponentialRetryPolicyOptions {
  /**
   * The maximum number of retry attempts. Defaults to 3.
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
}

/**
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options - Options that configure retry logic.
 */
export function exponentialRetryPolicy(
  options: ExponentialRetryPolicyOptions = {},
): PipelinePolicy {
  return retryPolicy(
    [
      exponentialRetryStrategy({
        ...options,
        ignoreSystemErrors: true,
      }),
    ],
    {
      maxRetries: options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT,
    },
  );
}
