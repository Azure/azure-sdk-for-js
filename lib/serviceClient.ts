// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AxiosHttpClient } from "./axiosHttpClient";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
import { OperationParameterType } from "./operationParameterType";
import { OperationSpec } from "./operationSpec";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import { msRestUserAgentPolicy } from "./policies/msRestUserAgentPolicy";
import { redirectPolicy } from "./policies/redirectPolicy";
import { RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { serializationPolicy } from "./policies/serializationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { Serializer, serializeObject } from "./serializer";
import { Constants } from "./util/constants";
import * as utils from "./util/utils";
import { RequestPrepareOptions, WebResource } from "./webResource";
import { URLBuilder } from "./url";
import { QueryCollectionFormat } from "./msRest";

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
  /**
   * @property {RequestInit} [requestOptions] The request options. Detailed info can be found
   * here https://github.github.io/fetch/#Request
   */
  requestOptions?: RequestInit;
  /**
   * @property {Array<RequestPolicyCreator>} [requestPolicyCreators] An array of functions that will be
   * invoked to create the RequestPolicy pipeline that will be used to send a HTTP request on the
   * wire.
   */
  requestPolicyCreators?: RequestPolicyCreator[];
  /**
   * @property {HttpClient} [httpClient] - The HttpClient that will be used to send HTTP requests.
   */
  httpClient?: HttpClient;
  /**
   * @property {HttpPipelineLogger} [httpPipelineLogger] - The HttpPipelineLogger that can be used
   * to debug RequestPolicies within the HTTP pipeline.
   */
  httpPipelineLogger?: HttpPipelineLogger;
  /**
   * @property {bool} [noRetryPolicy] - If set to true, turn off the default retry policy.
   */
  noRetryPolicy?: boolean;
  /**
   * @property {number} [rpRegistrationRetryTimeout] - Gets or sets the retry timeout
   * in seconds for AutomaticRPRegistration. Default value is 30.
   */
  rpRegistrationRetryTimeout?: number;
  /**
   * @property {Serializer} [serializer] - The serializer that will be used in the serialization
   * request policy.
   */
  serializer?: Serializer;
  /**
   * Whether or not to generate a client request ID header for each HTTP request.
   */
  generateClientRequestIdHeader?: boolean;
  /**
   * If specified, a GenerateRequestIdPolicy will be added to the HTTP pipeline that will add a
   * header to all outgoing requests with this header name and a random UUID as the request ID.
   */
  clientRequestIdHeaderName?: string;
}

/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
export class ServiceClient {
  /**
   * The string to be appended to the User-Agent header while sending the request.
   * This will be applicable only for node.js environment as the fetch library in browser does not allow setting custom UA.
   * @property {Array<string>} value - An array of string that need to be appended to the User-Agent request header.
   */
  userAgentInfo: { value: Array<string> };

  /**
   * The HTTP client that will be used to send requests.
   */
  private readonly _httpClient: HttpClient;
  private readonly _requestPolicyOptions: RequestPolicyOptions;

  private readonly _requestPolicyCreators: RequestPolicyCreator[];

  private readonly _serializer: Serializer;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
   * TokenCredentials object used for authentication.
   * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
   */
  constructor(credentials?: ServiceClientCredentials, options?: ServiceClientOptions) {
    if (!options) {
      options = {};
    }

    if (!options.requestOptions) {
      options.requestOptions = {};
    }

    this.userAgentInfo = { value: [] };

    if (credentials && !credentials.signRequest) {
      throw new Error("credentials argument needs to implement signRequest method");
    }

    try {
      const moduleName = "ms-rest-js";
      const moduleVersion = Constants.msRestVersion;
      this.addUserAgentInfo(`${moduleName}/${moduleVersion}`);
    } catch (err) {
      // do nothing
    }

    this._httpClient = options.httpClient || new AxiosHttpClient();
    this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);

    this._requestPolicyCreators = options.requestPolicyCreators || createDefaultRequestPolicyCreators(credentials, options, this.userAgentInfo.value);

    this._serializer = options.serializer!;
  }

  /**
   * Adds custom information to user agent header
   * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
   */
  addUserAgentInfo(additionalUserAgentInfo: string): void {
    if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
      this.userAgentInfo.value.push(additionalUserAgentInfo);
    }
    return;
  }

  /**
   * Send the provided httpRequest.
   */
  async sendRequest(options: RequestPrepareOptions | WebResource): Promise<HttpOperationResponse> {
    if (options === null || options === undefined || typeof options !== "object") {
      throw new Error("options cannot be null or undefined and it must be of type object.");
    }

    let httpRequest: WebResource;
    try {
      if (options instanceof WebResource) {
        options.validateRequestProperties();
        httpRequest = options;
      } else {
        httpRequest = new WebResource();
        httpRequest = httpRequest.prepare(options);
      }
    } catch (error) {
      return Promise.reject(error);
    }

    // send request
    let operationResponse: HttpOperationResponse;
    try {
      let httpPipeline: RequestPolicy = this._httpClient;
      if (this._requestPolicyCreators && this._requestPolicyCreators.length > 0) {
        for (let i = this._requestPolicyCreators.length - 1; i >= 0; --i) {
          httpPipeline = this._requestPolicyCreators[i](httpPipeline, this._requestPolicyOptions);
        }
      }
      operationResponse = await httpPipeline.sendRequest(httpRequest);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationResponse);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @param {WebResource} httpRequest - The HTTP request to populate and then to send.
   * @param {operationSpec} operationSpec - The OperationSpec to use to populate the httpRequest.
   */
  async sendOperationRequest(httpRequest: WebResource, operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<HttpOperationResponse> {
    httpRequest.method = operationSpec.httpMethod;
    httpRequest.operationSpec = operationSpec;

    const requestUrl: URLBuilder = URLBuilder.parse(operationSpec.baseUrl);
    if (operationSpec.path) {
      requestUrl.setPath(operationSpec.path);
    }
    if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
      for (const urlParameter of operationSpec.urlParameters) {
        let urlParameterValue: string = operationArguments.arguments[urlParameter.parameterName];
        if (urlParameter.type != undefined) {
          urlParameterValue = serializeParameterValue(urlParameterValue, urlParameter.type, this._serializer, urlParameter.parameterName);
        }
        if (!urlParameter.skipEncoding) {
          urlParameterValue = encodeURIComponent(urlParameterValue);
        }
        requestUrl.replaceAll(`{${urlParameter.urlParameterName || urlParameter.parameterName}}`, urlParameterValue);
      }
    }
    if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
      for (const queryParameter of operationSpec.queryParameters) {
        let queryParameterValue: any = operationArguments.arguments[queryParameter.parameterName];
        if (queryParameterValue != undefined) {
          if (queryParameter.type != undefined) {
            queryParameterValue = serializeParameterValue(queryParameterValue, queryParameter.type, this._serializer, queryParameter.parameterName);
          }
          if (queryParameter.collectionFormat != undefined) {
            if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
              if (queryParameterValue.length === 0) {
                queryParameterValue = "";
              } else {
                for (const item of queryParameterValue) {
                  queryParameterValue = (item == undefined ? "" : item.toString());
                }
              }
            } else {
              let queryParameterValueSeparator: string;
              switch (queryParameter.collectionFormat) {
                case QueryCollectionFormat.Csv:
                  queryParameterValueSeparator = ",";
                  break;
                case QueryCollectionFormat.Pipes:
                  queryParameterValueSeparator = "|";
                  break;
                case QueryCollectionFormat.Ssv:
                  queryParameterValueSeparator = " ";
                  break;
                case QueryCollectionFormat.Tsv:
                  queryParameterValueSeparator = "\t";
                  break;
                default:
                  throw new Error(`Unrecognized QueryCollectionFormat: ${QueryCollectionFormat[queryParameter.collectionFormat]}`);
              }
              queryParameterValue = queryParameterValue.join(queryParameterValueSeparator);
            }
          }
          if (!queryParameter.skipEncoding) {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
          requestUrl.setQueryParameter(queryParameter.queryParameterName || queryParameter.parameterName, queryParameterValue);
        }
      }
    }
    httpRequest.url = requestUrl.toString();

    if (operationSpec.headerParameters) {
      for (const headerParameter of operationSpec.headerParameters) {
        const parameterType: OperationParameterType | undefined = headerParameter.type;
        let headerValue: any = operationArguments.arguments[headerParameter.parameterName];
        if (headerValue != undefined) {
          if (parameterType != undefined) {
            headerValue = serializeParameterValue(headerValue, parameterType, this._serializer, headerParameter.parameterName);
          }
          httpRequest.headers.set(headerParameter.headerName || headerParameter.parameterName, headerValue);
        }
      }
    }

    if (operationArguments.customHeaders) {
      for (const customHeader of operationArguments.customHeaders.headersArray()) {
        httpRequest.headers.set(customHeader.name, customHeader.value);
      }
    }

    return this.sendRequest(httpRequest);
  }
}

function serializeParameterValue(value: any, parameterType: OperationParameterType | undefined, serializer: Serializer, parameterName: string): any {
  if (value != undefined) {
    if (parameterType != undefined) {
      switch (parameterType) {
        case OperationParameterType.Date:
          value = serializeObject(value).replace(/[Tt].*[Zz]/, "");
          break;

        case OperationParameterType.DateTimeRfc1123:
          if (value instanceof Date) {
            value = value.toUTCString();
          }
          break;

        case OperationParameterType.DateTime:
        case OperationParameterType.ByteArray:
          value = serializeObject(value);
          break;

        case OperationParameterType.Base64Url:
          value = serializer.serialize({ required: true, serializedName: parameterName, type: { name: "Base64Url" } }, value, parameterName);
          break;

        case OperationParameterType.UnixTime:
          value = serializer.serialize({ required: true, serializedName: parameterName, type: { name: "UnixTime" } }, value, parameterName);
          break;

        default:
          value = value.toString();
          break;
      }
    }
    return value;
  }
}

function createDefaultRequestPolicyCreators(credentials: ServiceClientCredentials | undefined, options: ServiceClientOptions, userAgentInfo: string[]): RequestPolicyCreator[] {
  const defaultRequestPolicyCreators: RequestPolicyCreator[] = [];

  if (options.generateClientRequestIdHeader) {
    defaultRequestPolicyCreators.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
  }

  if (credentials) {
    defaultRequestPolicyCreators.push(signingPolicy(credentials));
  }

  if (utils.isNode) {
    defaultRequestPolicyCreators.push(msRestUserAgentPolicy(userAgentInfo));
  }

  defaultRequestPolicyCreators.push(redirectPolicy());
  defaultRequestPolicyCreators.push(rpRegistrationPolicy(options.rpRegistrationRetryTimeout));

  if (!options.noRetryPolicy) {
    defaultRequestPolicyCreators.push(exponentialRetryPolicy());
    defaultRequestPolicyCreators.push(systemErrorRetryPolicy());
  }

  if (options.serializer) {
    defaultRequestPolicyCreators.push(serializationPolicy(options.serializer));
  }

  return defaultRequestPolicyCreators;
}
