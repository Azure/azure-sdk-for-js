// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRetryOptions } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

import {
  defaultRetryPolicyName as tspDefaultRetryPolicyName,
  defaultRetryPolicy as tspDefaultRetryPolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * Name of the {@link defaultRetryPolicy}
 */
export const defaultRetryPolicyName = tspDefaultRetryPolicyName;

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
  return tspDefaultRetryPolicy(options);
}
