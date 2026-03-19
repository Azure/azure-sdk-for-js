// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  defaultRetryPolicy,
  defaultRetryPolicyName,
  type DefaultRetryPolicyOptions,
} from "./defaultRetryPolicy.js";
export {
  exponentialRetryPolicy,
  exponentialRetryPolicyName,
  type ExponentialRetryPolicyOptions,
} from "./exponentialRetryPolicy.js";
export { retryPolicy, type RetryPolicyOptions } from "./retryPolicy.js";
export type {
  RetryInformation,
  RetryModifiers,
  RetryStrategy,
} from "../retryStrategies/retryStrategy.js";
export { systemErrorRetryPolicy, systemErrorRetryPolicyName } from "./systemErrorRetryPolicy.js";
export { throttlingRetryPolicy, throttlingRetryPolicyName } from "./throttlingRetryPolicy.js";
export { formDataPolicy, formDataPolicyName } from "./formDataPolicy.js";
export { logPolicy, logPolicyName, type LogPolicyOptions } from "./logPolicy.js";
export { multipartPolicy, multipartPolicyName } from "./multipartPolicy.js";
export { redirectPolicy, redirectPolicyName } from "./redirectPolicy.js";
export { userAgentPolicy, userAgentPolicyName } from "./userAgentPolicy.js";
export type { UserAgentPolicyOptions, RedirectPolicyOptions } from "#platform/interfaces";
