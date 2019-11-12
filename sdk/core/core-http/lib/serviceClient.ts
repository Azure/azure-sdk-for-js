// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { DefaultHttpClient } from "./defaultHttpClient";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse, RestResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { logPolicy, LogPolicyOptions } from "./policies/logPolicy";
import { OperationArguments } from "./operationArguments";
import {
  getPathStringFromParameter,
  getPathStringFromParameterPath,
  OperationParameter,
  ParameterPath
} from "./operationParameter";
import { isStreamOperation, OperationSpec } from "./operationSpec";
import {
  deserializationPolicy,
  DeserializationContentTypes,
  DefaultDeserializationOptions
} from "./policies/deserializationPolicy";
import { exponentialRetryPolicy, DefaultRetryOptions } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import {
  userAgentPolicy,
  getDefaultUserAgentHeaderName,
  getDefaultUserAgentValue
} from "./policies/userAgentPolicy";
import { redirectPolicy, DefaultRedirectOptions } from "./policies/redirectPolicy";
import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { bearerTokenAuthenticationPolicy } from "./policies/bearerTokenAuthenticationPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { CompositeMapper, DictionaryMapper, Mapper, MapperType, Serializer } from "./serializer";
import { URLBuilder } from "./url";
import * as utils from "./util/utils";
import { stringifyXML } from "./util/xml";
import { RequestOptionsBase, RequestPrepareOptions, WebResource } from "./webResource";
import { OperationResponse } from "./operationResponse";
import { ServiceCallback, isNode } from "./util/utils";
import { proxyPolicy, getDefaultProxySettings } from "./policies/proxyPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { signingPolicy } from "./policies/signingPolicy";
import { logger } from "./log";
import { InternalPipelineOptions } from "./pipelineOptions";
import { DefaultKeepAliveOptions, keepAlivePolicy } from "./policies/keepAlivePolicy";
import { tracingPolicy } from "./policies/tracingPolicy";

/**
 * Options to configure a proxy for outgoing requests (Node.js only).
 */
export interface ProxySettings {
  /*
   * The proxy's host address.
   */
  host: string;

  /*
   * The proxy host's port.
   */
  port: number;

  /**
   * The user name to authenticate with the proxy, if required.
   */
  username?: string;

  /**
   * The password to authenticate with the proxy, if required.
   */
  password?: string;
}

export type ProxyOptions = ProxySettings; // Alias ProxySettings as ProxyOptions for future use.

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
  /**
   * An array of factories which get called to create the RequestPolicy pipeline used to send a HTTP
   * request on the wire, or a function that takes in the defaultRequestPolicyFactories and returns
   * the requestPolicyFactories that will be used.
   */
  requestPolicyFactories?:
    | RequestPolicyFactory[]
    | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
  /**
   * The HttpClient that will be used to send HTTP requests.
   */
  httpClient?: HttpClient;
  /**
   * The HttpPipelineLogger that can be used to debug RequestPolicies within the HTTP pipeline.
   */
  httpPipelineLogger?: HttpPipelineLogger;
  /**
   * If set to true, turn off the default retry policy.
   */
  noRetryPolicy?: boolean;
  /**
   * Gets or sets the retry timeout in seconds for AutomaticRPRegistration. Default value is 30.
   */
  rpRegistrationRetryTimeout?: number;
  /**
   * Whether or not to generate a client request ID header for each HTTP request.
   */
  generateClientRequestIdHeader?: boolean;
  /**
   * Whether to include credentials in CORS requests in the browser.
   * See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials for more information.
   */
  withCredentials?: boolean;
  /**
   * If specified, a GenerateRequestIdPolicy will be added to the HTTP pipeline that will add a
   * header to all outgoing requests with this header name and a random UUID as the request ID.
   */
  clientRequestIdHeaderName?: string;
  /**
   * The content-types that will be associated with JSON or XML serialization.
   */
  deserializationContentTypes?: DeserializationContentTypes;
  /**
   * The header name to use for the telemetry header while sending the request. If this is not
   * specified, then "User-Agent" will be used when running on Node.js and "x-ms-command-name" will
   * be used when running in a browser.
   */
  userAgentHeaderName?: string | ((defaultUserAgentHeaderName: string) => string);
  /**
   * The string to be set to the telemetry header while sending the request, or a function that
   * takes in the default user-agent string and returns the user-agent string that will be used.
   */
  userAgent?: string | ((defaultUserAgent: string) => string);
  /**
   * Proxy settings which will be used for every HTTP request (Node.js only).
   */
  proxySettings?: ProxySettings;
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
   * The default request content type for the service.
   * Used if no requestContentType is present on an OperationSpec.
   */
  protected requestContentType?: string;

  /**
   * The HTTP client that will be used to send requests.
   */
  private readonly _httpClient: HttpClient;
  private readonly _requestPolicyOptions: RequestPolicyOptions;

  private readonly _requestPolicyFactories: RequestPolicyFactory[];
  private readonly _withCredentials: boolean;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param credentials The credentials used for authentication with the service.
   * @param options The service client options that govern the behavior of the client.
   */
  constructor(
    credentials?: TokenCredential | ServiceClientCredentials,
    options?: ServiceClientOptions
  ) {
    if (!options) {
      options = {};
    }

    this._withCredentials = options.withCredentials || false;
    this._httpClient = options.httpClient || new DefaultHttpClient();
    this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);

    let requestPolicyFactories: RequestPolicyFactory[];
    if (Array.isArray(options.requestPolicyFactories)) {
      logger.info("ServiceClient: using custom request policies");
      requestPolicyFactories = options.requestPolicyFactories;
    } else {
      let authPolicyFactory: RequestPolicyFactory | undefined = undefined;
      if (isTokenCredential(credentials)) {
        logger.info(
          "ServiceClient: creating bearer token authentication policy from provided credentials"
        );
        // Create a wrapped RequestPolicyFactory here so that we can provide the
        // correct scope to the BearerTokenAuthenticationPolicy at the first time
        // one is requested.  This is needed because generated ServiceClient
        // implementations do not set baseUri until after ServiceClient's constructor
        // is finished, leaving baseUri empty at the time when it is needed to
        // build the correct scope name.
        const wrappedPolicyFactory: () => RequestPolicyFactory = () => {
          let bearerTokenPolicyFactory: RequestPolicyFactory | undefined = undefined;
          let serviceClient = this;
          return {
            create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPolicy {
              if (bearerTokenPolicyFactory === undefined) {
                bearerTokenPolicyFactory = bearerTokenAuthenticationPolicy(
                  credentials,
                  `${serviceClient.baseUri || ""}/.default`
                );
              }

              return bearerTokenPolicyFactory.create(nextPolicy, options);
            }
          };
        };

        authPolicyFactory = wrappedPolicyFactory();
      } else if (credentials && typeof credentials.signRequest === "function") {
        logger.info("ServiceClient: creating signing policy from provided credentials");
        authPolicyFactory = signingPolicy(credentials);
      } else if (credentials !== undefined) {
        throw new Error("The credentials argument must implement the TokenCredential interface");
      }

      logger.info("ServiceClient: using default request policies");
      requestPolicyFactories = createDefaultRequestPolicyFactories(authPolicyFactory, options);
      if (options.requestPolicyFactories) {
        // options.requestPolicyFactories can also be a function that manipulates
        // the default requestPolicyFactories array
        const newRequestPolicyFactories:
          | void
          | RequestPolicyFactory[] = options.requestPolicyFactories(requestPolicyFactories);
        if (newRequestPolicyFactories) {
          requestPolicyFactories = newRequestPolicyFactories;
        }
      }
    }
    this._requestPolicyFactories = requestPolicyFactories;
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
    if (this._requestPolicyFactories && this._requestPolicyFactories.length > 0) {
      for (let i = this._requestPolicyFactories.length - 1; i >= 0; --i) {
        httpPipeline = this._requestPolicyFactories[i].create(
          httpPipeline,
          this._requestPolicyOptions
        );
      }
    }
    return httpPipeline.sendRequest(httpRequest);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
   * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
   * @param {ServiceCallback} callback The callback to call when the response is received.
   */
  async sendOperationRequest(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec,
    callback?: ServiceCallback<any>
  ): Promise<RestResponse> {
    if (typeof operationArguments.options === "function") {
      callback = operationArguments.options;
      operationArguments.options = undefined;
    }

    const httpRequest = new WebResource();

    let result: Promise<RestResponse>;
    try {
      const baseUri: string | undefined = operationSpec.baseUrl || this.baseUri;
      if (!baseUri) {
        throw new Error(
          "If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use."
        );
      }

      httpRequest.method = operationSpec.httpMethod;
      httpRequest.operationSpec = operationSpec;

      const requestUrl: URLBuilder = URLBuilder.parse(baseUri);
      if (operationSpec.path) {
        requestUrl.appendPath(operationSpec.path);
      }
      if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
        for (const urlParameter of operationSpec.urlParameters) {
          let urlParameterValue: string = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            urlParameter,
            operationSpec.serializer
          );
          urlParameterValue = operationSpec.serializer.serialize(
            urlParameter.mapper,
            urlParameterValue,
            getPathStringFromParameter(urlParameter)
          );
          if (!urlParameter.skipEncoding) {
            urlParameterValue = encodeURIComponent(urlParameterValue);
          }
          requestUrl.replaceAll(
            `{${urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)}}`,
            urlParameterValue
          );
        }
      }
      if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
        for (const queryParameter of operationSpec.queryParameters) {
          let queryParameterValue: any = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            queryParameter,
            operationSpec.serializer
          );
          if (queryParameterValue != undefined) {
            queryParameterValue = operationSpec.serializer.serialize(
              queryParameter.mapper,
              queryParameterValue,
              getPathStringFromParameter(queryParameter)
            );
            if (queryParameter.collectionFormat != undefined) {
              if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                if (queryParameterValue.length === 0) {
                  queryParameterValue = "";
                } else {
                  for (const index in queryParameterValue) {
                    const item = queryParameterValue[index];
                    queryParameterValue[index] = item == undefined ? "" : item.toString();
                  }
                }
              } else {
                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
              }
            }
            if (!queryParameter.skipEncoding) {
              if (Array.isArray(queryParameterValue)) {
                for (const index in queryParameterValue) {
                  queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
                }
              } else {
                queryParameterValue = encodeURIComponent(queryParameterValue);
              }
            }
            requestUrl.setQueryParameter(
              queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter),
              queryParameterValue
            );
          }
        }
      }
      httpRequest.url = requestUrl.toString();

      const contentType = operationSpec.contentType || this.requestContentType;
      if (contentType) {
        httpRequest.headers.set("Content-Type", contentType);
      }

      if (operationSpec.headerParameters) {
        for (const headerParameter of operationSpec.headerParameters) {
          let headerValue: any = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            headerParameter,
            operationSpec.serializer
          );
          if (headerValue != undefined) {
            headerValue = operationSpec.serializer.serialize(
              headerParameter.mapper,
              headerValue,
              getPathStringFromParameter(headerParameter)
            );
            const headerCollectionPrefix = (headerParameter.mapper as DictionaryMapper)
              .headerCollectionPrefix;
            if (headerCollectionPrefix) {
              for (const key of Object.keys(headerValue)) {
                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
              }
            } else {
              httpRequest.headers.set(
                headerParameter.mapper.serializedName ||
                  getPathStringFromParameter(headerParameter),
                headerValue
              );
            }
          }
        }
      }

      const options: RequestOptionsBase | undefined = operationArguments.options;
      if (options) {
        if (options.customHeaders) {
          for (const customHeaderName in options.customHeaders) {
            httpRequest.headers.set(customHeaderName, options.customHeaders[customHeaderName]);
          }
        }

        if (options.abortSignal) {
          httpRequest.abortSignal = options.abortSignal;
        }

        if (options.timeout) {
          httpRequest.timeout = options.timeout;
        }

        if (options.onUploadProgress) {
          httpRequest.onUploadProgress = options.onUploadProgress;
        }

        if (options.onDownloadProgress) {
          httpRequest.onDownloadProgress = options.onDownloadProgress;
        }

        if (options.spanOptions) {
          httpRequest.spanOptions = options.spanOptions;
        }
      }

      httpRequest.withCredentials = this._withCredentials;

      serializeRequestBody(this, httpRequest, operationArguments, operationSpec);

      if (httpRequest.streamResponseBody == undefined) {
        httpRequest.streamResponseBody = isStreamOperation(operationSpec);
      }

      let rawResponse: HttpOperationResponse;
      let sendRequestError;
      try {
        rawResponse = await this.sendRequest(httpRequest);
      } catch (error) {
        sendRequestError = error;
      }
      if (sendRequestError) {
        if (sendRequestError.response) {
          sendRequestError.details = flattenResponse(
            sendRequestError.response,
            operationSpec.responses[sendRequestError.statusCode] ||
              operationSpec.responses["default"]
          );
        }
        result = Promise.reject(sendRequestError);
      } else {
        result = Promise.resolve(
          flattenResponse(rawResponse!, operationSpec.responses[rawResponse!.status])
        );
      }
    } catch (error) {
      result = Promise.reject(error);
    }

    const cb = callback;
    if (cb) {
      result
        // tslint:disable-next-line:no-null-keyword
        .then((res) => cb(null, res._response.parsedBody, res._response.request, res._response))
        .catch((err) => cb(err));
    }

    return result;
  }
}

export function serializeRequestBody(
  serviceClient: ServiceClient,
  httpRequest: WebResource,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    httpRequest.body = getOperationArgumentValueFromParameter(
      serviceClient,
      operationArguments,
      operationSpec.requestBody,
      operationSpec.serializer
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, xmlName, xmlElementName, serializedName } = bodyMapper;
    const typeName = bodyMapper.type.name;
    try {
      if (httpRequest.body != undefined || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        httpRequest.body = operationSpec.serializer.serialize(
          bodyMapper,
          httpRequest.body,
          requestBodyParameterPathString
        );
        const isStream = typeName === MapperType.Stream;
        if (operationSpec.isXML) {
          if (typeName === MapperType.Sequence) {
            httpRequest.body = stringifyXML(
              utils.prepareXMLRootList(
                httpRequest.body,
                xmlElementName || xmlName || serializedName!
              ),
              { rootName: xmlName || serializedName }
            );
          } else if (!isStream) {
            httpRequest.body = stringifyXML(httpRequest.body, {
              rootName: xmlName || serializedName
            });
          }
        } else if (!isStream) {
          httpRequest.body = JSON.stringify(httpRequest.body);
        }
      }
    } catch (error) {
      throw new Error(
        `Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(
          serializedName,
          undefined,
          "  "
        )}.`
      );
    }
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    httpRequest.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue: any = getOperationArgumentValueFromParameter(
        serviceClient,
        operationArguments,
        formDataParameter,
        operationSpec.serializer
      );
      if (formDataParameterValue != undefined) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
          formDataParameter.mapper,
          formDataParameterValue,
          getPathStringFromParameter(formDataParameter)
        );
      }
    }
  }
}

function getValueOrFunctionResult(
  value: undefined | string | ((defaultValue: string) => string),
  defaultValueCreator: () => string
): string {
  let result: string;
  if (typeof value === "string") {
    result = value;
  } else {
    result = defaultValueCreator();
    if (typeof value === "function") {
      result = value(result);
    }
  }
  return result;
}

function createDefaultRequestPolicyFactories(
  authPolicyFactory: RequestPolicyFactory | undefined,
  options: ServiceClientOptions
): RequestPolicyFactory[] {
  const factories: RequestPolicyFactory[] = [];

  if (options.generateClientRequestIdHeader) {
    factories.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
  }

  if (authPolicyFactory) {
    factories.push(authPolicyFactory);
  }

  const userAgentHeaderName: string = getValueOrFunctionResult(
    options.userAgentHeaderName,
    getDefaultUserAgentHeaderName
  );
  const userAgentHeaderValue: string = getValueOrFunctionResult(
    options.userAgent,
    getDefaultUserAgentValue
  );
  if (userAgentHeaderName && userAgentHeaderValue) {
    factories.push(userAgentPolicy({ key: userAgentHeaderName, value: userAgentHeaderValue }));
  }
  factories.push(redirectPolicy());
  factories.push(rpRegistrationPolicy(options.rpRegistrationRetryTimeout));

  if (!options.noRetryPolicy) {
    factories.push(exponentialRetryPolicy());
    factories.push(systemErrorRetryPolicy());
    factories.push(throttlingRetryPolicy());
  }

  factories.push(deserializationPolicy(options.deserializationContentTypes));

  const proxySettings = options.proxySettings || getDefaultProxySettings();
  if (proxySettings) {
    factories.push(proxyPolicy(proxySettings));
  }

  factories.push(logPolicy({ logger: logger.info }));

  return factories;
}

export function createPipelineFromOptions(
  pipelineOptions: InternalPipelineOptions,
  authPolicyFactory?: RequestPolicyFactory
): ServiceClientOptions {
  let requestPolicyFactories: RequestPolicyFactory[] = [];

  let userAgentValue = undefined;
  if (pipelineOptions.userAgentOptions && pipelineOptions.userAgentOptions.userAgentPrefix) {
    const userAgentInfo: string[] = [];
    userAgentInfo.push(pipelineOptions.userAgentOptions.userAgentPrefix);

    // Add the default user agent value if it isn't already specified
    // by the userAgentPrefix option.
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }

    userAgentValue = userAgentInfo.join(" ");
  }

  const keepAliveOptions = {
    ...DefaultKeepAliveOptions,
    ...pipelineOptions.keepAliveOptions
  };

  const retryOptions = {
    ...DefaultRetryOptions,
    ...pipelineOptions.retryOptions
  };

  const redirectOptions = {
    ...DefaultRedirectOptions,
    ...pipelineOptions.redirectOptions
  };

  const proxySettings = pipelineOptions.proxyOptions || getDefaultProxySettings();
  if (isNode && proxySettings) {
    requestPolicyFactories.push(proxyPolicy(proxySettings));
  }

  const deserializationOptions = {
    ...DefaultDeserializationOptions,
    ...pipelineOptions.deserializationOptions
  };

  const loggingOptions: LogPolicyOptions = {
    ...pipelineOptions.loggingOptions
  };

  requestPolicyFactories.push(
    tracingPolicy(),
    keepAlivePolicy(keepAliveOptions),
    userAgentPolicy({ value: userAgentValue }),
    generateClientRequestIdPolicy(),
    deserializationPolicy(deserializationOptions.expectedContentTypes),
    throttlingRetryPolicy(),
    systemErrorRetryPolicy(),
    exponentialRetryPolicy(
      retryOptions.maxRetries,
      retryOptions.retryDelayInMs,
      retryOptions.maxRetryDelayInMs
    )
  );

  if (redirectOptions.handleRedirects) {
    requestPolicyFactories.push(redirectPolicy(redirectOptions.maxRetries));
  }

  if (authPolicyFactory) {
    requestPolicyFactories.push(authPolicyFactory);
  }

  requestPolicyFactories.push(logPolicy(loggingOptions));

  return {
    httpClient: pipelineOptions.httpClient,
    requestPolicyFactories
  };
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

function getOperationArgumentValueFromParameter(
  serviceClient: ServiceClient,
  operationArguments: OperationArguments,
  parameter: OperationParameter,
  serializer: Serializer
): any {
  return getOperationArgumentValueFromParameterPath(
    serviceClient,
    operationArguments,
    parameter.parameterPath,
    parameter.mapper,
    serializer
  );
}

export function getOperationArgumentValueFromParameterPath(
  serviceClient: ServiceClient,
  operationArguments: OperationArguments,
  parameterPath: ParameterPath,
  parameterMapper: Mapper,
  serializer: Serializer
): any {
  let value: any;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        value = parameterMapper.defaultValue;
      } else {
        let propertySearchResult: PropertySearchResult = getPropertyFromParameterPath(
          operationArguments,
          parameterPath
        );
        if (!propertySearchResult.propertyFound) {
          propertySearchResult = getPropertyFromParameterPath(serviceClient, parameterPath);
        }

        let useDefaultValue = false;
        if (!propertySearchResult.propertyFound) {
          useDefaultValue =
            parameterMapper.required ||
            (parameterPath[0] === "options" && parameterPath.length === 2);
        }
        value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
      }

      // Serialize just for validation purposes.
      const parameterPathString: string = getPathStringFromParameterPath(
        parameterPath,
        parameterMapper
      );
      serializer.serialize(parameterMapper, value, parameterPathString);
    }
  } else {
    if (parameterMapper.required) {
      value = {};
    }

    for (const propertyName in parameterPath) {
      const propertyMapper: Mapper = (parameterMapper as CompositeMapper).type.modelProperties![
        propertyName
      ];
      const propertyPath: ParameterPath = parameterPath[propertyName];
      const propertyValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        propertyPath,
        propertyMapper,
        serializer
      );
      // Serialize just for validation purposes.
      const propertyPathString: string = getPathStringFromParameterPath(
        propertyPath,
        propertyMapper
      );
      serializer.serialize(propertyMapper, propertyValue, propertyPathString);
      if (propertyValue !== undefined) {
        if (!value) {
          value = {};
        }
        value[propertyName] = propertyValue;
      }
    }
  }
  return value;
}

interface PropertySearchResult {
  propertyValue?: any;
  propertyFound: boolean;
}

function getPropertyFromParameterPath(
  parent: { [parameterName: string]: any },
  parameterPath: string[]
): PropertySearchResult {
  const result: PropertySearchResult = { propertyFound: false };
  let i = 0;
  for (; i < parameterPath.length; ++i) {
    const parameterPathPart: string = parameterPath[i];
    // Make sure to check inherited properties too, so don't use hasOwnProperty().
    if (parent != undefined && parameterPathPart in parent) {
      parent = parent[parameterPathPart];
    } else {
      break;
    }
  }
  if (i === parameterPath.length) {
    result.propertyValue = parent;
    result.propertyFound = true;
  }
  return result;
}

export function flattenResponse(
  _response: HttpOperationResponse,
  responseSpec: OperationResponse | undefined
): RestResponse {
  const parsedHeaders = _response.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  const addOperationResponse = (obj: {}) =>
    Object.defineProperty(obj, "_response", {
      value: _response
    });

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return addOperationResponse({
        ...parsedHeaders,
        blobBody: _response.blobBody,
        readableStreamBody: _response.readableStreamBody
      });
    }

    const modelProperties =
      (typeName === "Composite" && (bodyMapper as CompositeMapper).type.modelProperties) || {};
    const isPageableResponse = Object.keys(modelProperties).some(
      (k) => modelProperties[k].serializedName === ""
    );
    if (typeName === "Sequence" || isPageableResponse) {
      const arrayResponse = [...(_response.parsedBody || [])] as RestResponse & any[];

      for (const key of Object.keys(modelProperties)) {
        if (modelProperties[key].serializedName) {
          arrayResponse[key] = _response.parsedBody[key];
        }
      }

      if (parsedHeaders) {
        for (const key of Object.keys(parsedHeaders)) {
          arrayResponse[key] = parsedHeaders[key];
        }
      }
      addOperationResponse(arrayResponse);
      return arrayResponse;
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return addOperationResponse({
        ...parsedHeaders,
        ..._response.parsedBody
      });
    }
  }

  if (
    bodyMapper ||
    _response.request.method === "HEAD" ||
    utils.isPrimitiveType(_response.parsedBody)
  ) {
    // primitive body types and HEAD booleans
    return addOperationResponse({
      ...parsedHeaders,
      body: _response.parsedBody
    });
  }

  return addOperationResponse({
    ...parsedHeaders,
    ..._response.parsedBody
  });
}
