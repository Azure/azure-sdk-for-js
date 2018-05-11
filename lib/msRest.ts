// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource, RequestPrepareOptions, HttpMethods, ParameterValue, RequestOptionsBase } from "./webResource";
import { FetchHttpClient } from "./fetchHttpClient";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { HttpPipelineLogLevel } from "./httpPipelineLogLevel";
import { RestError } from "./restError";
import { ServiceClient, ServiceClientOptions } from "./serviceClient";
import { Constants } from "./util/constants";
import { logPolicy } from "./policies/logPolicy";
import { BaseRequestPolicy, RequestPolicy } from "./policies/requestPolicy";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { redirectPolicy } from "./policies/redirectPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { msRestUserAgentPolicy } from "./policies/msRestUserAgentPolicy";
import {
  BaseMapperType, CompositeMapper, DictionaryMapper, EnumMapper, Mapper,
  MapperConstraints, MapperType, PolymorphicDiscriminator,
  SequenceMapper, Serializer, UrlParameterValue, serializeObject
} from "./serializer";
import {
  stripRequest, stripResponse, delay,
  executePromisesSequentially, generateUuid, encodeUri, ServiceCallback,
  promiseToCallback, promiseToServiceCallback, isValidUuid,
  applyMixins, isNode, stringifyXML, prepareXMLRootList, isDuration
} from "./util/utils";
import { URLBuilder, URLQuery } from "./url";

// Credentials
import { TokenCredentials } from "./credentials/tokenCredentials";
import { BasicAuthenticationCredentials } from "./credentials/basicAuthenticationCredentials";
import { ApiKeyCredentials, ApiKeyCredentialOptions } from "./credentials/apiKeyCredentials";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import * as isStream from "is-stream";

export {
  BaseMapperType, CompositeMapper, DictionaryMapper, EnumMapper, Mapper, MapperConstraints, MapperType, FetchHttpClient,
  PolymorphicDiscriminator, SequenceMapper, UrlParameterValue, Serializer, serializeObject, HttpClient, HttpPipelineLogger, HttpPipelineLogLevel, TokenCredentials,
  WebResource, RequestPrepareOptions, HttpMethods, ParameterValue, HttpOperationResponse, ServiceClient, Constants,
  BasicAuthenticationCredentials, ApiKeyCredentials, ApiKeyCredentialOptions, ServiceClientCredentials, BaseRequestPolicy, logPolicy, ServiceClientOptions, exponentialRetryPolicy,
  systemErrorRetryPolicy, signingPolicy, msRestUserAgentPolicy, stripRequest, stripResponse, delay, executePromisesSequentially,
  generateUuid, isValidUuid, encodeUri, RestError, RequestOptionsBase, RequestPolicy, ServiceCallback, promiseToCallback,
  promiseToServiceCallback, isStream, redirectPolicy, applyMixins, isNode, stringifyXML, prepareXMLRootList, isDuration,
  URLBuilder, URLQuery
};
