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
} from "./createPipelineFromOptions.js";
export { createDefaultHttpClient } from "./defaultHttpClient.js";
export { createHttpHeaders } from "./httpHeaders.js";
export { createPipelineRequest, type PipelineRequestOptions } from "./pipelineRequest.js";
export { RestError, type RestErrorOptions, isRestError } from "./restError.js";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName,
} from "./policies/decompressResponsePolicy.js";
export { logPolicy, logPolicyName, type LogPolicyOptions } from "./policies/logPolicy.js";
export { multipartPolicy, multipartPolicyName } from "./policies/multipartPolicy.js";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy.js";
export {
  redirectPolicy,
  redirectPolicyName,
  type RedirectPolicyOptions,
} from "./policies/redirectPolicy.js";
export {
  tracingPolicy,
  tracingPolicyName,
  type TracingPolicyOptions,
} from "./policies/tracingPolicy";
export {
  defaultRetryPolicy,
  type DefaultRetryPolicyOptions,
} from "./policies/defaultRetryPolicy.js";
export {
  userAgentPolicy,
  userAgentPolicyName,
  type UserAgentPolicyOptions,
} from "./policies/userAgentPolicy.js";
export { tlsPolicy, tlsPolicyName } from "./policies/tlsPolicy.js";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy.js";
export {
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName,
  type ChallengeCallbacks,
  type AuthorizeRequestOptions,
  type AuthorizeRequestOnChallengeOptions,
} from "./policies/bearerTokenAuthenticationPolicy.js";
export type { AbortSignalLike } from "./abort-controller/AbortSignalLike.js";
export { AbortError } from "./abort-controller/AbortError.js";
export type { AccessToken, GetTokenOptions, TokenCredential } from "./auth/tokenCredential.js";
export type { KeyCredential } from "./auth/keyCredential.js";
export type {
  Instrumenter,
  InstrumenterSpanOptions,
  OperationTracingOptions,
  OptionsWithTracingContext,
  Resolved,
  SpanStatus,
  SpanStatusError,
  SpanStatusSuccess,
  TracingClient,
  TracingClientOptions,
  TracingContext,
  TracingSpan,
  TracingSpanKind,
  TracingSpanLink,
  TracingSpanOptions,
} from "./tracing/interfaces.js";
export { useInstrumenter } from "./tracing/instrumenter.js";
export { createTracingClient } from "./tracing/tracingClient.js";
// from core-util
export { delay, type DelayOptions } from "./util/delay.js";
export {
  type AbortOptions,
  cancelablePromiseRace,
  type AbortablePromiseBuilder,
} from "./util/aborterUtils.js";
export {
  createAbortablePromise,
  CreateAbortablePromiseOptions,
} from "./util/createAbortablePromise.js";
export { getRandomIntegerInclusive } from "./util/random.js";
export { isObject, type UnknownObject } from "./util/object.js";
export { isError, getErrorMessage } from "./util/error.js";
export {
  createFile,
  createFileFromStream,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "./util/file.js";
export { computeSha256Hash, computeSha256Hmac } from "./util/sha256.js";
export { isDefined, isObjectWithProperties, objectHasProperty } from "./util/typeGuards.js";
export { randomUUID } from "./util/uuidUtils.js";
export {
  isBrowser,
  isBun,
  isNode,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./util/checkEnvironment.js";
export { uint8ArrayToString, stringToUint8Array, type EncodingType } from "./util/bytesEncoding.js";
export {
  type Debugger,
  type TypeSpecRuntimeLogger,
  type TypeSpecRuntimeLogLevel,
  type TypeSpecRuntimeClientLogger,
} from "./logger/logger.js";
// client
export { createRestError } from "./client/restError.js";
export {
  addCredentialPipelinePolicy,
  type AddCredentialPipelinePolicyOptions,
} from "./client/clientHelpers.js";
export { operationOptionsToRequestParameters } from "./client/operationOptionHelpers.js";
export * from "./client/getClient.js";
export * from "./client/common.js";
