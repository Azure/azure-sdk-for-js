// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type {
  Agent,
  BodyPart,
  FormDataMap,
  FormDataValue,
  HttpClient,
  HttpHeaders,
  HttpMethods,
  KeyObject,
  MultipartRequestBody,
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
} from "./interfaces";
export {
  type AddPolicyOptions as AddPipelineOptions,
  type PipelinePhase,
  type PipelinePolicy,
  type Pipeline,
  createEmptyPipeline,
} from "./pipeline";
export {
  createPipelineFromOptions,
  type TelemetryOptions,
  type InternalPipelineOptions,
  type PipelineOptions,
} from "./createPipelineFromOptions";
export { createDefaultHttpClient } from "./defaultHttpClient";
export { createHttpHeaders } from "./httpHeaders";
export { createPipelineRequest, type PipelineRequestOptions } from "./pipelineRequest";
export { RestError, type RestErrorOptions, isRestError } from "./restError";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName,
} from "./policies/decompressResponsePolicy";
export {
  exponentialRetryPolicy,
  type ExponentialRetryPolicyOptions,
  exponentialRetryPolicyName,
} from "./policies/exponentialRetryPolicy";
export {
  setClientRequestIdPolicy,
  setClientRequestIdPolicyName,
} from "./policies/setClientRequestIdPolicy";
export { logPolicy, logPolicyName, type LogPolicyOptions } from "./policies/logPolicy";
export { multipartPolicy, multipartPolicyName } from "./policies/multipartPolicy";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy";
export {
  redirectPolicy,
  redirectPolicyName,
  type RedirectPolicyOptions,
} from "./policies/redirectPolicy";
export {
  systemErrorRetryPolicy,
  type SystemErrorRetryPolicyOptions,
  systemErrorRetryPolicyName,
} from "./policies/systemErrorRetryPolicy";
export {
  throttlingRetryPolicy,
  throttlingRetryPolicyName,
  type ThrottlingRetryPolicyOptions,
} from "./policies/throttlingRetryPolicy";
export { retryPolicy, type RetryPolicyOptions } from "./policies/retryPolicy";
export type {
  RetryStrategy,
  RetryInformation,
  RetryModifiers,
} from "./retryStrategies/retryStrategy";
export {
  tracingPolicy,
  tracingPolicyName,
  type TracingPolicyOptions,
} from "./policies/tracingPolicy";
export { defaultRetryPolicy, type DefaultRetryPolicyOptions } from "./policies/defaultRetryPolicy";
export {
  userAgentPolicy,
  userAgentPolicyName,
  type UserAgentPolicyOptions,
} from "./policies/userAgentPolicy";
export { tlsPolicy, tlsPolicyName } from "./policies/tlsPolicy";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy";
export {
  bearerTokenAuthenticationPolicy,
  type BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName,
  type ChallengeCallbacks,
  type AuthorizeRequestOptions,
  type AuthorizeRequestOnChallengeOptions,
} from "./policies/bearerTokenAuthenticationPolicy";
export { ndJsonPolicy, ndJsonPolicyName } from "./policies/ndJsonPolicy";
export {
  auxiliaryAuthenticationHeaderPolicy,
  type AuxiliaryAuthenticationHeaderPolicyOptions,
  auxiliaryAuthenticationHeaderPolicyName,
} from "./policies/auxiliaryAuthenticationHeaderPolicy";
export {
  createFile,
  createFileFromStream,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "./util/file";
