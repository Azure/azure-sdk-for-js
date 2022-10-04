// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRetryOptions } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { exponentialRetryStrategy } from "../retryStrategies/exponentialRetryStrategy";
import { throttlingRetryStrategy } from "../retryStrategies/throttlingRetryStrategy";
import { retryPolicy } from "./retryPolicy";
import { DEFAULT_RETRY_POLICY_COUNT } from "../constants";
import { failoverRetryStrategy } from "../retryStrategies/failoverRetryStrategy";

/**
 * Name of the {@link defaultRetryPolicy}
 */
export const defaultRetryPolicyName = "defaultRetryPolicy";

/**
 * Options that control how to retry failed requests.
 */
export interface DefaultRetryPolicyOptions extends PipelineRetryOptions {}

/**
 * A policy that retries according to three strategies:
 * - When the server sends a 429 response with a Retry-After header.
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
 */
export function defaultRetryPolicy(options: DefaultRetryPolicyOptions = {}): PipelinePolicy {
  const failover = failoverRetryStrategy(options);
  const strategies = [throttlingRetryStrategy(), failover, exponentialRetryStrategy(options)];
  if (!options.failoverHostIteratorFactory) {
    strategies.splice(strategies.indexOf(failover), 1);
  }
  return {
    name: defaultRetryPolicyName,
    sendRequest: retryPolicy(strategies, {
      maxRetries: options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT,
    }).sendRequest,
  };
}
