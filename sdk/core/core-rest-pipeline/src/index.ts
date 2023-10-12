// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface FormData {}
export interface Blob {}
export interface File {}
// @ts-expect-error -- browser types part of the public API are shimmed
export interface ReadableStream<R = any> {} // eslint-disable-line @typescript-eslint/no-unused-vars
// @ts-expect-error -- browser types part of the public API are shimmed
export interface TransformStream<I = any, O = any> {} // eslint-disable-line @typescript-eslint/no-unused-vars

export {
  Agent,
  FormDataMap,
  FormDataValue,
  HttpClient,
  HttpHeaders,
  HttpMethods,
  KeyObject,
  PipelineRequest,
  PipelineResponse,
  PipelineRetryOptions,
  ProxySettings,
  PxfObject,
  RawHttpHeaders,
  RawHttpHeadersInput,
  RequestBodyType,
  SendRequest,
  TlsSettings,
  TransferProgressEvent,
} from "./interfaces.js";
export {
  AddPolicyOptions as AddPipelineOptions,
  PipelinePhase,
  PipelinePolicy,
  Pipeline,
  createEmptyPipeline,
} from "./pipeline.js";
export {
  createPipelineFromOptions,
  TelemetryOptions,
  InternalPipelineOptions,
  PipelineOptions,
} from "./createPipelineFromOptions.js";
export { createDefaultHttpClient } from "./defaultHttpClient.js";
export { createHttpHeaders } from "./httpHeaders.js";
export { createPipelineRequest, PipelineRequestOptions } from "./pipelineRequest.js";
export { RestError, RestErrorOptions, isRestError } from "./restError.js";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName,
} from "./policies/decompressResponsePolicy.js";
export {
  exponentialRetryPolicy,
  ExponentialRetryPolicyOptions,
  exponentialRetryPolicyName,
} from "./policies/exponentialRetryPolicy.js";
export {
  setClientRequestIdPolicy,
  setClientRequestIdPolicyName,
} from "./policies/setClientRequestIdPolicy.js";
export { logPolicy, logPolicyName, LogPolicyOptions } from "./policies/logPolicy.js";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy.js";
export {
  redirectPolicy,
  redirectPolicyName,
  RedirectPolicyOptions,
} from "./policies/redirectPolicy.js";
export {
  systemErrorRetryPolicy,
  SystemErrorRetryPolicyOptions,
  systemErrorRetryPolicyName,
} from "./policies/systemErrorRetryPolicy.js";
export {
  throttlingRetryPolicy,
  throttlingRetryPolicyName,
  ThrottlingRetryPolicyOptions,
} from "./policies/throttlingRetryPolicy.js";
export { retryPolicy, RetryPolicyOptions } from "./policies/retryPolicy.js";
export {
  RetryStrategy,
  RetryInformation,
  RetryModifiers,
} from "./retryStrategies/retryStrategy.js";
export {
  tracingPolicy,
  tracingPolicyName,
  TracingPolicyOptions,
} from "./policies/tracingPolicy.js";
export { defaultRetryPolicy, DefaultRetryPolicyOptions } from "./policies/defaultRetryPolicy.js";
export {
  userAgentPolicy,
  userAgentPolicyName,
  UserAgentPolicyOptions,
} from "./policies/userAgentPolicy.js";
export { tlsPolicy, tlsPolicyName } from "./policies/tlsPolicy.js";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy.js";
export {
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName,
  ChallengeCallbacks,
  AuthorizeRequestOptions,
  AuthorizeRequestOnChallengeOptions,
} from "./policies/bearerTokenAuthenticationPolicy.js";
export { ndJsonPolicy, ndJsonPolicyName } from "./policies/ndJsonPolicy.js";
export {
  auxiliaryAuthenticationHeaderPolicy,
  AuxiliaryAuthenticationHeaderPolicyOptions,
  auxiliaryAuthenticationHeaderPolicyName,
} from "./policies/auxiliaryAuthenticationHeaderPolicy.js";
