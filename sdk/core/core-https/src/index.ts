// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  FormDataMap,
  FormDataValue,
  HttpHeaders,
  HttpMethods,
  ProxySettings,
  RawHttpHeaders,
  TransferProgressEvent,
  RequestBodyType,
  AuthenticationContext
} from "./interfaces";
export {
  AddPolicyOptions as AddPipelineOptions,
  PipelinePhase,
  PipelinePolicy,
  Pipeline,
  createEmptyPipeline,
  InternalPipelineOptions,
  PipelineOptions,
  createPipelineFromOptions
} from "./pipeline";
export { createDefaultHttpsClient } from "./defaultHttpsClient";
export { createHttpHeaders } from "./httpHeaders";
export { createPipelineRequest, PipelineRequestOptions } from "./pipelineRequest";
export { RestError, RestErrorOptions } from "./restError";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName
} from "./policies/decompressResponsePolicy";
export {
  exponentialRetryPolicy,
  ExponentialRetryPolicyOptions,
  exponentialRetryPolicyName
} from "./policies/exponentialRetryPolicy";
export {
  setClientRequestIdPolicy,
  setClientRequestIdPolicyName
} from "./policies/setClientRequestIdPolicy";
export { logPolicy, logPolicyName, LogPolicyOptions } from "./policies/logPolicy";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy";
export {
  redirectPolicy,
  redirectPolicyName,
  RedirectPolicyOptions
} from "./policies/redirectPolicy";
export {
  systemErrorRetryPolicy,
  SystemErrorRetryPolicyOptions,
  systemErrorRetryPolicyName
} from "./policies/systemErrorRetryPolicy";
export { throttlingRetryPolicy, throttlingRetryPolicyName } from "./policies/throttlingRetryPolicy";
export { tracingPolicy, tracingPolicyName, TracingPolicyOptions } from "./policies/tracingPolicy";
export {
  userAgentPolicy,
  userAgentPolicyName,
  UserAgentPolicyOptions
} from "./policies/userAgentPolicy";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy";
export {
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName
} from "./policies/bearerTokenAuthenticationPolicy";
export {
  challengeAuthenticationPolicy,
  ChallengeAuthenticationPolicyOptions,
  challengeAuthenticationPolicyName
} from "./policies/challengeAuthenticationPolicy";
export { ndJsonPolicy, ndJsonPolicyName } from "./policies/ndJsonPolicy";
