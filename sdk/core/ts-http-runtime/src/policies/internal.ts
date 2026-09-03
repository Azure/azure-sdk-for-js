// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { agentPolicy, agentPolicyName } from "./agentPolicy.js";
export { decompressResponsePolicy, decompressResponsePolicyName } from "#platform/decompress";
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
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "#platform/proxy";
export {
  redirectPolicy,
  redirectPolicyName,
  type RedirectPolicyOptions,
} from "./redirectPolicy.js";
export { tlsPolicy, tlsPolicyName } from "./tlsPolicy.js";
export {
  userAgentPolicy,
  userAgentPolicyName,
  type UserAgentPolicyOptions,
} from "./userAgentPolicy.js";
