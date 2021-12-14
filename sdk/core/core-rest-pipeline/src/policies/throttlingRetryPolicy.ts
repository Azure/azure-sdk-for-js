// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { throttlingRetryStrategy } from "../retryStrategies/throttlingRetryStrategy";
import { retryPolicy } from "./retryPolicy";

/**
 * Name of the {@link throttlingRetryPolicy}
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * A policy that retries when the server sends a 429 response with a Retry-After header.
 *
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export function throttlingRetryPolicy(): PipelinePolicy {
  return {
    name: throttlingRetryPolicyName,
    sendRequest: retryPolicy([throttlingRetryStrategy()]).sendRequest
  };
}
