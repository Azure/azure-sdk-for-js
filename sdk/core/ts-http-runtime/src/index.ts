// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  interface FormData {}
  interface Blob {}
  interface File {}
  interface ReadableStream<R = any> {}
  interface TransformStream<I = any, O = any> {}
}

export { AbortSignalLike } from "./abort-controller/AbortSignalLike.js";
export { AbortError } from "./abort-controller/AbortError.js";
export {
  createClientLogger,
  TypeSpecRuntimeLogger,
  type TypeSpecRuntimeClientLogger,
  type Debugger,
} from "./logger/logger.js";
export type {
  BodyPart,
  FormDataValue,
  RawHttpHeaders,
  KeyObject,
  PxfObject,
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  TlsSettings,
  Agent,
  RequestBodyType,
  FormDataMap,
  HttpHeaders,
  HttpMethods,
  MultipartRequestBody,
  TransferProgressEvent,
  ProxySettings,
  RawHttpHeadersInput,
  PipelineRetryOptions,
} from "./interfaces.js";
export { createHttpHeaders } from "./httpHeaders.js";
export { isKeyCredential, type KeyCredential } from "./auth/keyCredential.js";
export {
  isTokenCredential,
  type TokenCredential,
  type GetTokenOptions,
  type AccessToken,
} from "./auth/tokenCredential.js";
export { createPipelineRequest, type PipelineRequestOptions } from "./pipelineRequest.js";
export type { Pipeline, PipelinePolicy, AddPolicyOptions, PipelinePhase } from "./pipeline.js";
export { RestError, isRestError, type RestErrorOptions } from "./restError.js";
export { stringToUint8Array, uint8ArrayToString, type EncodingType } from "./util/bytesEncoding.js";
export { getClient } from "./client/getClient.js";
export { operationOptionsToRequestParameters } from "./client/operationOptionHelpers.js";
export { createRestError } from "./client/restError.js";
export type {
  Client,
  ClientOptions,
  OperationOptions,
  AdditionalPolicyConfig,
  PathUnchecked,
  PathUncheckedResponse,
  HttpResponse,
  RawResponseCallback,
  OperationRequestOptions,
  PathParameters,
  ResourceMethods,
  PathParameterWithOptions,
  StreamableMethod,
  RequestParameters,
  HttpNodeStreamResponse,
  HttpBrowserStreamResponse,
  FullOperationResponse,
} from "./client/common.js";
export type { PipelineOptions, TelemetryOptions } from "./createPipelineFromOptions.js";
export type { LogPolicyOptions } from "./policies/logPolicy.js";
export type { RedirectPolicyOptions } from "./policies/redirectPolicy.js";
export type { UserAgentPolicyOptions } from "./policies/userAgentPolicy.js";
