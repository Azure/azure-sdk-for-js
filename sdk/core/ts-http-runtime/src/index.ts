// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./interfaces";
export {
  AddPolicyOptions as AddPipelineOptions,
  PipelinePhase,
  PipelinePolicy,
  Pipeline,
  createEmptyPipeline,
} from "./pipeline";
export {
  createPipelineFromOptions,
  TelemetryOptions,
  InternalPipelineOptions,
  PipelineOptions,
} from "./createPipelineFromOptions";
export { createDefaultHttpClient } from "./defaultHttpClient";
export { createHttpHeaders } from "./httpHeaders";
export { createPipelineRequest, PipelineRequestOptions } from "./pipelineRequest";
export { RestError, RestErrorOptions, isRestError } from "./restError";
export {
  decompressResponsePolicy,
  decompressResponsePolicyName,
} from "./policies/decompressResponsePolicy";
export { logPolicy, logPolicyName, LogPolicyOptions } from "./policies/logPolicy";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy";
export {
  redirectPolicy,
  redirectPolicyName,
  RedirectPolicyOptions,
} from "./policies/redirectPolicy";
export { tracingPolicy, tracingPolicyName, TracingPolicyOptions } from "./policies/tracingPolicy";
export { defaultRetryPolicy, DefaultRetryPolicyOptions } from "./policies/defaultRetryPolicy";
export {
  userAgentPolicy,
  userAgentPolicyName,
  UserAgentPolicyOptions,
} from "./policies/userAgentPolicy";
export { tlsPolicy, tlsPolicyName } from "./policies/tlsPolicy";
export { formDataPolicy, formDataPolicyName } from "./policies/formDataPolicy";
export {
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  bearerTokenAuthenticationPolicyName,
  ChallengeCallbacks,
  AuthorizeRequestOptions,
  AuthorizeRequestOnChallengeOptions,
} from "./policies/bearerTokenAuthenticationPolicy";
export { AbortSignalLike } from "./abort-controller/AbortSignalLike";
export { AbortError } from "./abort-controller/AbortError";
export { AccessToken, GetTokenOptions, TokenCredential } from "./auth/tokenCredential";
export {
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
} from "./tracing/interfaces";
export { useInstrumenter } from "./tracing/instrumenter";
export { createTracingClient } from "./tracing/tracingClient";
// from core-util
export { delay, DelayOptions } from "./util/delay";
export { AbortOptions, cancelablePromiseRace, AbortablePromiseBuilder } from "./util/aborterUtils";
export {
  createAbortablePromise,
  CreateAbortablePromiseOptions,
} from "./util/createAbortablePromise";
export { getRandomIntegerInclusive } from "./util/random";
export { isObject, UnknownObject } from "./util/object";
export { isError, getErrorMessage } from "./util/error";
export { computeSha256Hash, computeSha256Hmac } from "./util/sha256";
export { isDefined, isObjectWithProperties, objectHasProperty } from "./util/typeGuards";
export { randomUUID } from "./util/uuidUtils";
export {
  isBrowser,
  isBun,
  isNode,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./util/checkEnvironment";
export { uint8ArrayToString, stringToUint8Array, EncodingType } from "./util/bytesEncoding";
export {
  Debugger,
  TypeSpecRuntimeLogger,
  TypeSpecRuntimeLogLevel,
  TypeSpecRuntimeClientLogger,
} from "./logger/logger";
// client
export { createRestError } from "./client/restError";
export {
  addCredentialPipelinePolicy,
  AddCredentialPipelinePolicyOptions,
} from "./client/clientHelpers";
export { operationOptionsToRequestParameters } from "./client/operationOptionHelpers";
export * from "./client/getClient";
export * from "./client/common";
