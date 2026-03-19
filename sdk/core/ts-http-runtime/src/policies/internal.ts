// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { agentPolicy, agentPolicyName } from "#platform/policies/agentPolicy";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName,
} from "#platform/policies/decompressResponsePolicy";
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
export {
  proxyPolicy,
  proxyPolicyName,
  getDefaultProxySettings,
} from "#platform/policies/proxyPolicy";
export { redirectPolicy, redirectPolicyName } from "./redirectPolicy.js";
export { tlsPolicy, tlsPolicyName } from "#platform/policies/tlsPolicy";
export { userAgentPolicy, userAgentPolicyName } from "./userAgentPolicy.js";
export type { UserAgentPolicyOptions, RedirectPolicyOptions } from "#platform/interfaces";
