// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable-next-line @typescript-eslint/triple-slash-reference */
/// <reference path="../dom-shim.d.ts" />

export {
  WebResource,
  WebResourceLike,
  HttpRequestBody,
  RequestPrepareOptions,
  HttpMethods,
  ParameterValue,
  RequestOptionsBase,
  TransferProgressEvent
} from "./webResource";
export { DefaultHttpClient } from "./defaultHttpClient";
export { HttpClient } from "./httpClient";
export { HttpHeader, HttpHeaders, HttpHeadersLike, RawHttpHeaders } from "./httpHeaders";
export { HttpOperationResponse, HttpResponse, RestResponse } from "./httpOperationResponse";
export { HttpPipelineLogger } from "./httpPipelineLogger";
export { HttpPipelineLogLevel } from "./httpPipelineLogLevel";
export { RestError } from "./restError";
export { OperationArguments } from "./operationArguments";
export {
  OperationOptions,
  OperationRequestOptions,
  operationOptionsToRequestOptionsBase
} from "./operationOptions";
export {
  OperationParameter,
  OperationQueryParameter,
  OperationURLParameter,
  ParameterPath
} from "./operationParameter";
export { OperationResponse } from "./operationResponse";
export { OperationSpec } from "./operationSpec";
export {
  ServiceClient,
  ServiceClientOptions,
  flattenResponse,
  createPipelineFromOptions,
  ProxySettings,
  ProxyOptions
} from "./serviceClient";
export { PipelineOptions, InternalPipelineOptions } from "./pipelineOptions";
export { QueryCollectionFormat } from "./queryCollectionFormat";
export { Constants } from "./util/constants";
export { bearerTokenAuthenticationPolicy } from "./policies/bearerTokenAuthenticationPolicy";
export { LogPolicyOptions, logPolicy } from "./policies/logPolicy";
export {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  RequestPolicyOptionsLike
} from "./policies/requestPolicy";
export { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
export { exponentialRetryPolicy, RetryOptions, RetryMode } from "./policies/exponentialRetryPolicy";
export { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
export { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
export { getDefaultProxySettings, proxyPolicy } from "./policies/proxyPolicy";
export { redirectPolicy, RedirectOptions } from "./policies/redirectPolicy";
export { keepAlivePolicy, KeepAliveOptions } from "./policies/keepAlivePolicy";
export { disableResponseDecompressionPolicy } from "./policies/disableResponseDecompressionPolicy";
export { signingPolicy } from "./policies/signingPolicy";
export {
  userAgentPolicy,
  getDefaultUserAgentValue,
  UserAgentOptions,
  TelemetryInfo
} from "./policies/userAgentPolicy";
export {
  deserializationPolicy,
  DeserializationOptions,
  deserializeResponseBody,
  DeserializationContentTypes
} from "./policies/deserializationPolicy";
export { tracingPolicy, TracingPolicyOptions } from "./policies/tracingPolicy";
export {
  MapperType,
  SimpleMapperType,
  CompositeMapperType,
  DictionaryMapperType,
  SequenceMapperType,
  EnumMapperType,
  Mapper,
  BaseMapper,
  CompositeMapper,
  SequenceMapper,
  DictionaryMapper,
  EnumMapper,
  MapperConstraints,
  PolymorphicDiscriminator,
  Serializer,
  UrlParameterValue,
  serializeObject
} from "./serializer";
export {
  stripRequest,
  stripResponse,
  delay,
  executePromisesSequentially,
  generateUuid,
  encodeUri,
  ServiceCallback,
  promiseToCallback,
  promiseToServiceCallback,
  isValidUuid,
  applyMixins,
  isNode,
  isDuration
} from "./util/utils";
export { URLBuilder, URLQuery } from "./url";
export { AbortSignalLike } from "@azure/abort-controller";

// Credentials
export { TokenCredential, GetTokenOptions, AccessToken, isTokenCredential } from "@azure/core-auth";
export { AccessTokenCache, ExpiringAccessTokenCache } from "./credentials/accessTokenCache";
export { AccessTokenRefresher } from "./credentials/accessTokenRefresher";
export { BasicAuthenticationCredentials } from "./credentials/basicAuthenticationCredentials";
export { ApiKeyCredentials, ApiKeyCredentialOptions } from "./credentials/apiKeyCredentials";
export { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
export { TopicCredentials } from "./credentials/topicCredentials";
export { Authenticator } from "./credentials/credentials";

export { parseXML, stringifyXML } from "./util/xml";
