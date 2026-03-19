// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AbortError } from "./abort-controller/AbortError.js";
export {
  createClientLogger,
  getLogLevel,
  setLogLevel,
  TypeSpecRuntimeLogger,
  type Debugger,
  type TypeSpecRuntimeClientLogger,
  type TypeSpecRuntimeLogLevel,
} from "./logger/logger.js";

export type {
  BodyPart,
  FormDataValue,
  RawHttpHeaders,
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  RequestBodyType,
  FormDataMap,
  HttpHeaders,
  HttpMethods,
  MultipartRequestBody,
  TransferProgressEvent,
  RawHttpHeadersInput,
  PipelineRetryOptions,
  PipelineRequestOptions,
  PipelineOptions,
  TelemetryOptions,
  UserAgentPolicyOptions,
  RedirectPolicyOptions,
  KeyObject,
  PxfObject,
  TlsSettings,
  Agent,
  ProxySettings,
} from "./interfacesCommon.js";
export { createHttpHeaders } from "./httpHeaders.js";
export * from "./auth/schemes.js";
export * from "./auth/oauth2Flows.js";
export {
  type BasicCredential,
  type BearerTokenCredential,
  type OAuth2TokenCredential,
  type GetOAuth2TokenOptions,
  type GetBearerTokenOptions,
  type ApiKeyCredential,
  type ClientCredential,
} from "./auth/credentials.js";
export { createPipelineRequest } from "#platform/pipelineRequest";
export {
  type Pipeline,
  type PipelinePolicy,
  type AddPolicyOptions,
  type PipelinePhase,
  createEmptyPipeline,
} from "./pipeline.js";
export { RestError, isRestError, type RestErrorOptions } from "#platform/restError";
export {
  stringToUint8Array,
  uint8ArrayToString,
  type EncodingType,
} from "#platform/util/bytesEncoding";
export { createDefaultHttpClient } from "#platform/defaultHttpClient";
export { getClient } from "#platform/client/getClient";
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
  HttpBrowserStreamResponse,
  HttpNodeStreamResponse,
  FullOperationResponse,
} from "./client/common.js";
export type { LogPolicyOptions } from "./policies/logPolicy.js";
