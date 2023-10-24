// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { throttlingRetryStrategy } from "../retryStrategies/throttlingRetryStrategy";
import { retryPolicy } from "./retryPolicy";
import { DEFAULT_RETRY_POLICY_COUNT } from "../constants";

/**
 * Name of the {@link throttlingRetryPolicy}
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * Options that control how to retry failed requests.
 */
export interface ThrottlingRetryPolicyOptions {
  /**
   * The maximum number of retry attempts. Defaults to 3.
   */
  maxRetries?: number;
}

/**
 * A policy that retries when the server sends a 429 response with a Retry-After header.
 *
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 *
 * @param options - Options that configure retry logic.
 */
export function throttlingRetryPolicy(options: ThrottlingRetryPolicyOptions = {}): PipelinePolicy {
  return {
    name: throttlingRetryPolicyName,
    sendRequest: retryPolicy([throttlingRetryStrategy()], {
      maxRetries: options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT,
    }).sendRequest,
  };
}
