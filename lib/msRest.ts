// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export { WebResource, RequestPrepareOptions, HttpMethods, ParameterValue, RequestOptionsBase } from "./webResource";
export { FetchHttpClient } from "./fetchHttpClient";
export { HttpClient } from "./httpClient";
export { HttpHeaders } from "./httpHeaders";
export { HttpOperationResponse } from "./httpOperationResponse";
export { HttpPipelineLogger } from "./httpPipelineLogger";
export { HttpPipelineLogLevel } from "./httpPipelineLogLevel";
export { RestError } from "./restError";
export { OperationSpec } from "./operationSpec";
export { OperationParameterType } from "./operationParameterType";
export { ServiceClient, ServiceClientOptions } from "./serviceClient";
export { Constants } from "./util/constants";
export { logPolicy } from "./policies/logPolicy";
export { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator } from "./policies/requestPolicy";
export { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
export { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
export { redirectPolicy } from "./policies/redirectPolicy";
export { signingPolicy } from "./policies/signingPolicy";
export { msRestUserAgentPolicy } from "./policies/msRestUserAgentPolicy";
export { serializationPolicy } from "./policies/serializationPolicy";
export {
  BaseMapperType, CompositeMapper, DictionaryMapper, EnumMapper, Mapper,
  MapperConstraints, MapperType, PolymorphicDiscriminator,
  SequenceMapper, Serializer, UrlParameterValue, serializeObject
} from "./serializer";
export {
  stripRequest, stripResponse, delay,
  executePromisesSequentially, generateUuid, encodeUri, ServiceCallback,
  promiseToCallback, promiseToServiceCallback, isValidUuid,
  applyMixins, isNode, stringifyXML, prepareXMLRootList, isDuration
} from "./util/utils";
export { URLBuilder, URLQuery } from "./url";

// Credentials
export { TokenCredentials } from "./credentials/tokenCredentials";
export { BasicAuthenticationCredentials } from "./credentials/basicAuthenticationCredentials";
export { ApiKeyCredentials, ApiKeyCredentialOptions } from "./credentials/apiKeyCredentials";
export { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
export const isStream = require("is-stream");
