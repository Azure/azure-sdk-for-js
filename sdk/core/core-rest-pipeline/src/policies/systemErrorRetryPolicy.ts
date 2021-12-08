// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { retryPolicy } from "./retryPolicy";
import { systemErrorRetryStrategy } from "../retryStrategies/systemErrorRetryStrategy";
import { maxRetriesStrategy } from "../retryStrategies/maxRetriesStrategy";

/**
 * Name of the {@link systemErrorRetryPolicy}
 */
export const systemErrorRetryPolicyName = "systemErrorRetryPolicy";

const DEFAULT_CLIENT_RETRY_COUNT = 10;

// intervals are in ms
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * Options that control how to retry failed requests.
 */
export interface SystemErrorRetryPolicyOptions {
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
}

/**
 * A retry policy that specifically seeks to handle errors in the
 * underlying transport layer (e.g. DNS lookup failures) rather than
 * retryable error codes from the server itself.
 * @param options - Options that customize the policy.
 */
export function systemErrorRetryPolicy(
  options: SystemErrorRetryPolicyOptions = {}
): PipelinePolicy {
  const maxRetries = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  return {
    name: systemErrorRetryPolicyName,
    sendRequest: retryPolicy(
      maxRetriesStrategy(maxRetries),
      systemErrorRetryStrategy(retryInterval, maxRetryInterval)
    ).sendRequest
  };
}
