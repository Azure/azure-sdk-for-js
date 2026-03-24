// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  interface FormData {}
  interface Blob {}
  interface File {}
  interface ReadableStream<R = any> {}
  interface TransformStream<I = any, O = any> {}
}

export type { HttpMethods } from "@azure/core-util";
export type {
  Agent,
  BodyPart,
  FormDataMap,
  FormDataValue,
  HttpClient,
  HttpHeaders,
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
} from "./interfaces.js";
export {
  type AddPolicyOptions as AddPipelineOptions,
  type PipelinePhase,
  type PipelinePolicy,
  type Pipeline,
  createEmptyPipeline,
} from "./pipeline.js";
export {
  createPipelineFromOptions,
  type TelemetryOptions,
  type InternalPipelineOptions,
  type PipelineOptions,
} from "#platform/createPipelineFromOptions";
export { createDefaultHttpClient } from "./defaultHttpClient.js";
export { createHttpHeaders } from "./httpHeaders.js";
export { createPipelineRequest, type PipelineRequestOptions } from "./pipelineRequest.js";
export {
  RestError,
  type RestErrorOptions,
  type RestErrorConstructor,
  isRestError,
} from "./restError.js";
export * from "#platform/policies/decompressResponsePolicy";
export {
  exponentialRetryPolicy,
  type ExponentialRetryPolicyOptions,
  exponentialRetryPolicyName,
} from "./policies/exponentialRetryPolicy.js";
export {
  setClientRequestIdPolicy,
  setClientRequestIdPolicyName,
} from "./policies/setClientRequestIdPolicy.js";
export { logPolicy, logPolicyName, type LogPolicyOptions } from "./policies/logPolicy.js";
export { multipartPolicy, multipartPolicyName } from "./policies/multipartPolicy.js";
export * from "#platform/policies/proxyPolicy";
export {
  redirectPolicy,
  redirectPolicyName,
  type RedirectPolicyOptions,
} from "./policies/redirectPolicy.js";
export {
  systemErrorRetryPolicy,
  type SystemErrorRetryPolicyOptions,
  systemErrorRetryPolicyName,
} from "./policies/systemErrorRetryPolicy.js";
export {
  throttlingRetryPolicy,
  throttlingRetryPolicyName,
  type ThrottlingRetryPolicyOptions,
} from "./policies/throttlingRetryPolicy.js";
export {
  retryPolicy,
  type RetryPolicyOptions,
  type RetryStrategy,
  type RetryInformation,
  type RetryModifiers,
} from "./policies/retryPolicy.js";
export {
  tracingPolicy,
  tracingPolicyName,
  type TracingPolicyOptions,
} from "./policies/tracingPolicy.js";
export {
  defaultRetryPolicy,
  type DefaultRetryPolicyOptions,
} from "./policies/defaultRetryPolicy.js";
export {
  userAgentPolicy,
  userAgentPolicyName,
  type UserAgentPolicyOptions,
} from "./policies/userAgentPolicy.js";
export * from "#platform/policies/tlsPolicy";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy.js";
export {
  bearerTokenAuthenticationPolicy,
  type BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName,
  type ChallengeCallbacks,
  type AuthorizeRequestOptions,
  type AuthorizeRequestOnChallengeOptions,
} from "./policies/bearerTokenAuthenticationPolicy.js";
export { ndJsonPolicy, ndJsonPolicyName } from "./policies/ndJsonPolicy.js";
export {
  auxiliaryAuthenticationHeaderPolicy,
  type AuxiliaryAuthenticationHeaderPolicyOptions,
  auxiliaryAuthenticationHeaderPolicyName,
} from "./policies/auxiliaryAuthenticationHeaderPolicy.js";
export * from "#platform/policies/agentPolicy";
export {
  createFile,
  createFileFromStream,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "./util/file.js";
