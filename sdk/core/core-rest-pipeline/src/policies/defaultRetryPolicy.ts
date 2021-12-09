// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { exponentialRetryStrategy } from "../retryStrategies/exponentialRetryStrategy";
import { systemErrorRetryStrategy } from "../retryStrategies/systemErrorRetryStrategy";
import { throttlingRetryStrategy } from "../retryStrategies/throttlingRetryStrategy";
import { retryPolicy } from "./retryPolicy";

/**
 * Name of the {@link defaultRetryPolicy}
 */
export const defaultRetryPolicyName = "defaultRetryPolicy";

/**
 * A policy that retries according to three strategies:
 * - When the server sends a 429 response with a Retry-After header.
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
 */
export function defaultRetryPolicy(): PipelinePolicy {
  return {
    name: defaultRetryPolicyName,
    sendRequest: retryPolicy(
      throttlingRetryStrategy(),
      systemErrorRetryStrategy(),
      exponentialRetryStrategy()
    ).sendRequest
  };
}
