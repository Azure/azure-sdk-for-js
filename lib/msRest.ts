// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource, RequestPrepareOptions, HttpMethods, ParameterValue, RequestOptionsBase } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { RestError } from "./restError";
import { ServiceClient, ServiceClientOptions } from "./serviceClient";
import { Constants } from "./util/constants";
import { RequestPipeline, RequestFunction } from "./requestPipeline";
import { LogFilter } from "./filters/logFilter";
import { BaseFilter } from "./filters/baseFilter";
import { ExponentialRetryPolicyFilter } from "./filters/exponentialRetryPolicyFilter";
import { SystemErrorRetryPolicyFilter } from "./filters/systemErrorRetryPolicyFilter";
import { RedirectFilter } from "./filters/redirectFilter";
import { SigningFilter } from "./filters/signingFilter";
import { MsRestUserAgentFilter } from "./filters/msRestUserAgentFilter";
import {
  BaseMapperType, CompositeMapper, DictionaryMapper, EnumMapper, Mapper,
  MapperConstraints, MapperType, PolymorphicDiscriminator,
  SequenceMapper, Serializer, UrlParameterValue, serializeObject
} from "./serializer";
import {
  stripRequest, stripResponse, delay,
  executePromisesSequentially, generateUuid, encodeUri, ServiceCallback,
  promiseToCallback, promiseToServiceCallback, isValidUuid, dispatchRequest,
  applyMixins, isNode
} from "./util/utils";

// Credentials
import { TokenCredentials } from "./credentials/tokenCredentials";
import { BasicAuthenticationCredentials } from "./credentials/basicAuthenticationCredentials";
import { ApiKeyCredentials, ApiKeyCredentialOptions } from "./credentials/apiKeyCredentials";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import * as isStream from "is-stream";

export {
  BaseMapperType, CompositeMapper, DictionaryMapper, EnumMapper, Mapper, MapperConstraints, MapperType,
  PolymorphicDiscriminator, SequenceMapper, UrlParameterValue, Serializer, serializeObject, TokenCredentials,
  WebResource, RequestPrepareOptions, HttpMethods, ParameterValue, HttpOperationResponse, ServiceClient, Constants, RequestPipeline,
  BasicAuthenticationCredentials, ApiKeyCredentials, ApiKeyCredentialOptions, ServiceClientCredentials, BaseFilter, LogFilter, ServiceClientOptions, ExponentialRetryPolicyFilter,
  SystemErrorRetryPolicyFilter, SigningFilter, MsRestUserAgentFilter, stripRequest, stripResponse, delay, executePromisesSequentially,
  generateUuid, isValidUuid, encodeUri, RestError, RequestOptionsBase, RequestFunction, ServiceCallback, promiseToCallback,
  promiseToServiceCallback, isStream, dispatchRequest, RedirectFilter, applyMixins, isNode
};
