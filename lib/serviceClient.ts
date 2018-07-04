// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { DefaultHttpClient } from "./defaultHttpClient";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
import { getPathStringFromParameter, getPathStringFromParameterPath, OperationParameter, ParameterPath } from "./operationParameter";
import { OperationResponse } from "./operationResponse";
import { OperationSpec } from "./operationSpec";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import { msRestUserAgentPolicy } from "./policies/msRestUserAgentPolicy";
import { redirectPolicy } from "./policies/redirectPolicy";
import { RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { deserializationPolicy } from "./policies/deserializationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { CompositeMapper, DictionaryMapper, Mapper, MapperType, Serializer } from "./serializer";
import { URLBuilder } from "./url";
import { Constants } from "./util/constants";
import * as utils from "./util/utils";
import { RequestPrepareOptions, WebResource } from "./webResource";

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
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   */
  protected baseUri?: string;

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

    this._httpClient = options.httpClient || new DefaultHttpClient();
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
  sendRequest(options: RequestPrepareOptions | WebResource): Promise<HttpOperationResponse> {
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

    let httpPipeline: RequestPolicy = this._httpClient;
    if (this._requestPolicyCreators && this._requestPolicyCreators.length > 0) {
      for (let i = this._requestPolicyCreators.length - 1; i >= 0; --i) {
        httpPipeline = this._requestPolicyCreators[i](httpPipeline, this._requestPolicyOptions);
      }
    }
    return httpPipeline.sendRequest(httpRequest);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @param {WebResource} httpRequest - The HTTP request to populate and then to send.
   * @param {operationSpec} operationSpec - The OperationSpec to use to populate the httpRequest.
   */
  sendOperationRequest(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<HttpOperationResponse> {
    const httpRequest = new WebResource();

    let result: Promise<HttpOperationResponse>;
    try {
      if (operationSpec.baseUrl == undefined) {
        operationSpec.baseUrl = this.baseUri;
        if (!operationSpec.baseUrl) {
          throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use.");
        }
      }

      httpRequest.method = operationSpec.httpMethod;
      httpRequest.operationSpec = operationSpec;

      const requestUrl: URLBuilder = URLBuilder.parse(operationSpec.baseUrl);
      if (operationSpec.path) {
        requestUrl.setPath(operationSpec.path);
      }
      if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
        for (const urlParameter of operationSpec.urlParameters) {
          let urlParameterValue: string = getOperationArgumentValueFromParameter(operationArguments, urlParameter, operationSpec.serializer);
          urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, getPathStringFromParameter(urlParameter));
          if (!urlParameter.skipEncoding) {
            urlParameterValue = encodeURIComponent(urlParameterValue);
          }
          requestUrl.replaceAll(`{${urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)}}`, urlParameterValue);
        }
      }
      if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
        for (const queryParameter of operationSpec.queryParameters) {
          let queryParameterValue: any = getOperationArgumentValueFromParameter(operationArguments, queryParameter, operationSpec.serializer);
          if (queryParameterValue != undefined) {
            queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getPathStringFromParameter(queryParameter));
            if (queryParameter.collectionFormat != undefined) {
              if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                queryParameter.skipEncoding = true;
                if (queryParameterValue.length === 0) {
                  queryParameterValue = "";
                } else {
                  for (let item of queryParameterValue) {
                    item = item == undefined ? "" : item.toString();
                  }
                }
              } else {
                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
              }
            }
            if (!queryParameter.skipEncoding) {
              queryParameterValue = encodeURIComponent(queryParameterValue);
            }
            requestUrl.setQueryParameter(queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter), queryParameterValue);
          }
        }
      }
      httpRequest.url = requestUrl.toString();

      if (operationSpec.contentType) {
        httpRequest.headers.set("Content-Type", operationSpec.contentType);
      }

      if (operationSpec.headerParameters) {
        for (const headerParameter of operationSpec.headerParameters) {
          let headerValue: any = getOperationArgumentValueFromParameter(operationArguments, headerParameter, operationSpec.serializer);
          if (headerValue != undefined) {
            headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getPathStringFromParameter(headerParameter));
            const headerCollectionPrefix = (headerParameter.mapper as DictionaryMapper).headerCollectionPrefix;
            if (headerCollectionPrefix) {
              for (const key of Object.keys(headerValue)) {
                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
              }
            } else {
              httpRequest.headers.set(headerParameter.mapper.serializedName || getPathStringFromParameter(headerParameter), headerValue);
            }
          }
        }
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

      serializeRequestBody(httpRequest, operationArguments, operationSpec);

      if (operationSpec.responses) {
        let rawResponse = false;
        for (const responseStatusCode in operationSpec.responses) {
          const responseSpec: OperationResponse = operationSpec.responses[responseStatusCode];
          if (responseSpec.bodyMapper && responseSpec.bodyMapper.type.name === MapperType.Stream) {
            rawResponse = true;
            break;
          }
        }
        httpRequest.rawResponse = rawResponse;
      }

      result = this.sendRequest(httpRequest);
    } catch (error) {
      result = Promise.reject(error);
    }
    return result;
  }
}

function serializeRequestBody(httpRequest: WebResource, operationArguments: OperationArguments, operationSpec: OperationSpec): void {
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    httpRequest.body = getOperationArgumentValueFromParameter(operationArguments, operationSpec.requestBody, operationSpec.serializer);

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, xmlName, xmlElementName, serializedName } = bodyMapper;
    const typeName = bodyMapper.type.name;
    try {
      if (httpRequest.body != undefined || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(operationSpec.requestBody);
        httpRequest.body = operationSpec.serializer.serialize(bodyMapper, httpRequest.body, requestBodyParameterPathString);
        if (operationSpec.isXML) {
          if (typeName === MapperType.Sequence) {
            httpRequest.body = utils.stringifyXML(utils.prepareXMLRootList(httpRequest.body, xmlElementName || xmlName || serializedName), { rootName: xmlName || serializedName });
          }
          else {
            httpRequest.body = utils.stringifyXML(httpRequest.body, { rootName: xmlName || serializedName });
          }
        } else if (typeName !== MapperType.Stream) {
          httpRequest.body = JSON.stringify(httpRequest.body);
        }
      }
    } catch (error) {
      throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(serializedName, undefined, "  ")}.`);
    }
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    httpRequest.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue: any = getOperationArgumentValueFromParameter(operationArguments, formDataParameter, operationSpec.serializer);
      if (formDataParameterValue != undefined) {
        const formDataParameterPropertyName: string = formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getPathStringFromParameter(formDataParameter));
      }
    }
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

  defaultRequestPolicyCreators.push(deserializationPolicy());

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

function getOperationArgumentValueFromParameter(operationArguments: OperationArguments, parameter: OperationParameter, serializer: Serializer): any {
  return getOperationArgumentValueFromParameterPath(operationArguments, parameter.parameterPath, parameter.mapper, serializer);
}

function getOperationArgumentValueFromParameterPath(operationArguments: OperationArguments, parameterPath: ParameterPath, parameterMapper: Mapper, serializer: Serializer): any {
  let value: any;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (operationArguments.arguments) {
    if (Array.isArray(parameterPath)) {
      if (parameterPath.length > 0) {
        value = operationArguments.arguments;
        for (const parameterPathPart of parameterPath) {
          value = value[parameterPathPart];
          if (value == undefined) {
            break;
          }
        }

        // Serialize just for validation purposes.
        const parameterPathString: string = getPathStringFromParameterPath(parameterPath, parameterMapper);
        serializer.serialize(parameterMapper, value, parameterPathString);
      }
    } else {
      for (const propertyName in parameterPath) {
        const propertyMapper: Mapper = (parameterMapper as CompositeMapper).type.modelProperties[propertyName];
        const propertyPath: ParameterPath = parameterPath[propertyName];
        const propertyValue: any = getOperationArgumentValueFromParameterPath(operationArguments, propertyPath, propertyMapper, serializer);
        // Serialize just for validation purposes.
        const propertyPathString: string = getPathStringFromParameterPath(propertyPath, propertyMapper);
        serializer.serialize(propertyMapper, propertyValue, propertyPathString);
        if (propertyValue !== undefined) {
          if (!value) {
            value = {};
          }
          value[propertyName] = propertyValue;
        }
      }
    }
  }
  return value;
}