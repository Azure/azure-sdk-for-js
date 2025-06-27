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
} from "./interfaces.js";
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
export { createPipelineRequest } from "./pipelineRequest.js";
export {
  type Pipeline,
  type PipelinePolicy,
  type AddPolicyOptions,
  type PipelinePhase,
  createEmptyPipeline,
} from "./pipeline.js";
export { RestError, isRestError, type RestErrorOptions } from "./restError.js";
export { stringToUint8Array, uint8ArrayToString, type EncodingType } from "./util/bytesEncoding.js";
export { createDefaultHttpClient } from "./defaultHttpClient.js";
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
export type { LogPolicyOptions } from "./policies/logPolicy.js";
