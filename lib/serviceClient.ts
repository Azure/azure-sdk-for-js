// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AxiosHttpClient } from "./axiosHttpClient";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
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
import { QueryCollectionFormat, getQueryCollectionFormatSeparator } from "./queryCollectionFormat";
import { URLBuilder } from "./url";
import { Constants } from "./util/constants";
import * as utils from "./util/utils";
import { RequestPrepareOptions, WebResource } from "./webResource";
import { OperationParameter, getParameterPathString, ParameterPath } from "./operationParameter";

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
        let urlParameterValue: string = getOperationArgumentValueFromParameter(operationArguments, urlParameter);
        urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, getParameterPathString(urlParameter));
        if (!urlParameter.skipEncoding) {
          urlParameterValue = encodeURIComponent(urlParameterValue);
        }
        requestUrl.replaceAll(`{${urlParameter.mapper.serializedName || getParameterPathString(urlParameter)}}`, urlParameterValue);
      }
    }
    if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
      for (const queryParameter of operationSpec.queryParameters) {
        let queryParameterValue: any = getOperationArgumentValueFromParameter(operationArguments, queryParameter);
        if (queryParameterValue != undefined) {
          queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getParameterPathString(queryParameter));
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
              const queryParameterValueSeparator: string = getQueryCollectionFormatSeparator(queryParameter.collectionFormat);
              queryParameterValue = queryParameterValue.join(queryParameterValueSeparator);
            }
          }
          if (!queryParameter.skipEncoding) {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
          requestUrl.setQueryParameter(queryParameter.mapper.serializedName || getParameterPathString(queryParameter), queryParameterValue);
        }
      }
    }
    httpRequest.url = requestUrl.toString();

    if (operationSpec.headerParameters) {
      for (const headerParameter of operationSpec.headerParameters) {
        let headerValue: any = getOperationArgumentValueFromParameter(operationArguments, headerParameter);
        if (headerValue != undefined) {
          headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getParameterPathString(headerParameter));
          httpRequest.headers.set(headerParameter.mapper.serializedName || getParameterPathString(headerParameter), headerValue);
        }
      }
    }

    if (operationSpec.contentType) {
      httpRequest.headers.set("Content-Type", operationSpec.contentType);
    }

    if (operationArguments.customHeaders) {
      for (const customHeaderName in operationArguments.customHeaders) {
        httpRequest.headers.set(customHeaderName, operationArguments.customHeaders[customHeaderName]);
      }
    }

    if (operationArguments.abortSignal) {
      httpRequest.abortSignal = operationArguments.abortSignal;
    }

    if (operationArguments.onUploadProgress) {
      httpRequest.onUploadProgress = operationArguments.onUploadProgress;
    }

    if (operationArguments.onDownloadProgress) {
      httpRequest.onDownloadProgress = operationArguments.onDownloadProgress;
    }

    if (operationSpec.requestBody) {
      httpRequest.body = getOperationArgumentValueFromParameter(operationArguments, operationSpec.requestBody);
    } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
      httpRequest.formData = {};
      for (const formDataParameter of operationSpec.formDataParameters) {
        const formDataParameterValue: any = getOperationArgumentValueFromParameter(operationArguments, formDataParameter);
        if (formDataParameterValue != undefined) {
          const formDataParameterPropertyName: string = formDataParameter.mapper.serializedName || getParameterPathString(formDataParameter);
          httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getParameterPathString(formDataParameter));
        }
      }
    }

    return this.sendRequest(httpRequest);
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

  defaultRequestPolicyCreators.push(serializationPolicy());

  return defaultRequestPolicyCreators;
}

export type PropertyParent = { [propertyName: string]: any };

/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export function getPropertyParent(parent: PropertyParent, propertyPath: string[]): PropertyParent {
  if (parent && propertyPath) {
    const propertyPathLength: number = propertyPath.length;
    for (let i = 0; i < propertyPathLength - 1; ++i) {
      const propertyName: string = propertyPath[i];
      if (!parent[propertyName]) {
        parent[propertyName] = {};
      }
      parent = parent[propertyName];
    }
  }
  return parent;
}

function getOperationArgumentValueFromParameter(operationArguments: OperationArguments, parameter: OperationParameter): any {
  return getOperationArgumentValueFromParameterPath(operationArguments, parameter.parameterPath);
}

function getOperationArgumentValueFromParameterPath(operationArguments: OperationArguments, parameterPath: ParameterPath): any {
  let value: any;
  if (parameterPath) {
    if (typeof parameterPath === "string") {
      parameterPath = [parameterPath];
    }

    if (operationArguments.arguments && parameterPath) {
      if (Array.isArray(parameterPath)) {
        if (parameterPath && parameterPath.length > 0) {
          value = operationArguments.arguments;
          for (const parameterPathPart of parameterPath) {
            value = value[parameterPathPart];
            if (value == undefined) {
              break;
            }
          }
        }
      } else {
        for (const propertyName in parameterPath) {
          const propertyValue: any = getOperationArgumentValueFromParameterPath(operationArguments, parameterPath[propertyName]);
          if (propertyValue !== undefined) {
            if (!value) {
              value = {};
            }
            value[propertyName] = propertyValue;
          }
        }
      }
    }
  }
  return value;
}