// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  interface FormData {}
  interface Blob {}
  interface File {}
  interface ReadableStream<R = any> {}
  interface TransformStream<I = any, O = any> {}
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export {
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
export { logPolicy, logPolicyName, LogPolicyOptions } from "./policies/logPolicy.js";
export { multipartPolicy, multipartPolicyName } from "./policies/multipartPolicy.js";
export { proxyPolicy, proxyPolicyName, getDefaultProxySettings } from "./policies/proxyPolicy.js";
export {
  redirectPolicy,
  redirectPolicyName,
  RedirectPolicyOptions,
} from "./policies/redirectPolicy.js";
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
export { AbortSignalLike } from "./abort-controller/AbortSignalLike.js";
export { AbortError } from "./abort-controller/AbortError.js";
export { AccessToken, GetTokenOptions, TokenCredential } from "./auth/tokenCredential.js";
export { KeyCredential, isKeyCredential } from "./auth/keyCredential.js";
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
} from "./tracing/interfaces.js";
export { useInstrumenter } from "./tracing/instrumenter.js";
export { createTracingClient } from "./tracing/tracingClient.js";
// from core-util
export { delay, DelayOptions, calculateRetryDelay } from "./util/delay.js";
export {
  AbortOptions,
  cancelablePromiseRace,
  AbortablePromiseBuilder,
} from "./util/aborterUtils.js";
export {
  createAbortablePromise,
  CreateAbortablePromiseOptions,
} from "./util/createAbortablePromise.js";
export { getRandomIntegerInclusive } from "./util/random.js";
export { isObject, UnknownObject } from "./util/object.js";
export { isError, getErrorMessage } from "./util/error.js";
export {
  createFile,
  createFileFromStream,
  CreateFileOptions,
  CreateFileFromStreamOptions,
} from "./util/file.js";
export { computeSha256Hash, computeSha256Hmac } from "./util/sha256.js";
export { isDefined, isObjectWithProperties, objectHasProperty } from "./util/typeGuards.js";
export { randomUUID } from "./util/uuidUtils.js";
export {
  isBrowser,
  isBun,
  isNode,
  isNodeLike,
  isNodeRuntime,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./util/checkEnvironment.js";
export { uint8ArrayToString, stringToUint8Array, EncodingType } from "./util/bytesEncoding.js";
export {
  Debugger,
  TypeSpecRuntimeLogger,
  TypeSpecRuntimeLogLevel,
  TypeSpecRuntimeClientLogger,
} from "./logger/logger.js";
// client
export { createRestError } from "./client/restError.js";
export {
  addCredentialPipelinePolicy,
  AddCredentialPipelinePolicyOptions,
} from "./client/clientHelpers.js";
export { operationOptionsToRequestParameters } from "./client/operationOptionHelpers.js";
export * from "./client/getClient.js";
export * from "./client/common.js";
