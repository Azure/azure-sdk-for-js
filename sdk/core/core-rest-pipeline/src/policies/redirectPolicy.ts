// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

import {
  redirectPolicyName as tspRedirectPolicyName,
  redirectPolicy as tspRedirectPolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * The programmatic identifier of the redirectPolicy.
 */
export const redirectPolicyName = tspRedirectPolicyName;

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectPolicyOptions {
  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

/**
 * A policy to follow Location headers from the server in order
 * to support server-side redirection.
 * In the browser, this policy is not used.
 * @param options - Options to control policy behavior.
 */
export function redirectPolicy(options: RedirectPolicyOptions = {}): PipelinePolicy {
  return tspRedirectPolicy(options);
}
