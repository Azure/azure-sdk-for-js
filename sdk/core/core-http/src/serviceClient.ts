// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as utils from "./util/utils";
import { CompositeMapper, DictionaryMapper, Mapper, MapperType, Serializer } from "./serializer";
import {
  DefaultDeserializationOptions,
  DeserializationContentTypes,
  deserializationPolicy,
} from "./policies/deserializationPolicy";
import { DefaultKeepAliveOptions, keepAlivePolicy } from "./policies/keepAlivePolicy";
import { DefaultRedirectOptions, redirectPolicy } from "./policies/redirectPolicy";
import { DefaultRetryOptions, exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { HttpOperationResponse, RestResponse } from "./httpOperationResponse";
import { LogPolicyOptions, logPolicy } from "./policies/logPolicy";
import {
  OperationParameter,
  ParameterPath,
  getPathStringFromParameter,
  getPathStringFromParameterPath,
} from "./operationParameter";
import { OperationSpec, getStreamResponseStatusCodes } from "./operationSpec";
import {
  RequestOptionsBase,
  RequestPrepareOptions,
  WebResource,
  WebResourceLike,
  isWebResourceLike,
} from "./webResource";
import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./policies/requestPolicy";
import { SerializerOptions, XML_ATTRKEY, XML_CHARKEY } from "./util/serializer.common";
import { ServiceCallback, isNode } from "./util/utils";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  getDefaultUserAgentHeaderName,
  getDefaultUserAgentValue,
  userAgentPolicy,
} from "./policies/userAgentPolicy";
import { HttpClient } from "./httpClient";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { InternalPipelineOptions } from "./pipelineOptions";
import { OperationArguments } from "./operationArguments";
import { OperationResponse } from "./operationResponse";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { URL } from "./url";
import { URLBuilder } from "./url";
import { bearerTokenAuthenticationPolicy } from "./policies/bearerTokenAuthenticationPolicy";
import { disableResponseDecompressionPolicy } from "./policies/disableResponseDecompressionPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import { getCachedDefaultHttpClient } from "./httpClientCache";
import { logger } from "./log";
import { ndJsonPolicy } from "./policies/ndJsonPolicy";
import { proxyPolicy } from "./policies/proxyPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { stringifyXML } from "./util/xml";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { tracingPolicy } from "./policies/tracingPolicy";

/**
 * Options to configure a proxy for outgoing requests (Node.js only).
 */
export interface ProxySettings {
  /**
   * The proxy's host address.
   */
  host: string;

  /**
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

/**
 * An alias of {@link ProxySettings} for future use.
 */
export type ProxyOptions = ProxySettings;

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
   * specified, then "User-Agent" will be used when running on Node.js and "x-ms-useragent" will
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
  /**
   * If specified, will be used to build the BearerTokenAuthenticationPolicy.
   */
  credentialScopes?: string | string[];
}

/**
 * ServiceClient sends service requests and receives responses.
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
   * @param credentials - The credentials used for authentication with the service.
   * @param options - The service client options that govern the behavior of the client.
   */
  constructor(
    credentials?: TokenCredential | ServiceClientCredentials,
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ServiceClientOptions
  ) {
    if (!options) {
      options = {};
    }

    this._withCredentials = options.withCredentials || false;
    this._httpClient = options.httpClient || getCachedDefaultHttpClient();
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
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const serviceClient = this;
          const serviceClientOptions = options;
          return {
            create(nextPolicy: RequestPolicy, createOptions: RequestPolicyOptions): RequestPolicy {
              const credentialScopes = getCredentialScopes(
                serviceClientOptions,
                serviceClient.baseUri
              );

              if (!credentialScopes) {
                throw new Error(
                  `When using credential, the ServiceClient must contain a baseUri or a credentialScopes in ServiceClientOptions. Unable to create a bearerTokenAuthenticationPolicy`
                );
              }

              if (bearerTokenPolicyFactory === undefined || bearerTokenPolicyFactory === null) {
                bearerTokenPolicyFactory = bearerTokenAuthenticationPolicy(
                  credentials,
                  credentialScopes
                );
              }

              return bearerTokenPolicyFactory.create(nextPolicy, createOptions);
            },
          };
        };

        authPolicyFactory = wrappedPolicyFactory();
      } else if (credentials && typeof credentials.signRequest === "function") {
        logger.info("ServiceClient: creating signing policy from provided credentials");
        authPolicyFactory = signingPolicy(credentials);
      } else if (credentials !== undefined && credentials !== null) {
        throw new Error("The credentials argument must implement the TokenCredential interface");
      }

      logger.info("ServiceClient: using default request policies");
      requestPolicyFactories = createDefaultRequestPolicyFactories(authPolicyFactory, options);
      if (options.requestPolicyFactories) {
        // options.requestPolicyFactories can also be a function that manipulates
        // the default requestPolicyFactories array
        const newRequestPolicyFactories: void | RequestPolicyFactory[] =
          options.requestPolicyFactories(requestPolicyFactories);
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
  sendRequest(options: RequestPrepareOptions | WebResourceLike): Promise<HttpOperationResponse> {
    if (options === null || options === undefined || typeof options !== "object") {
      throw new Error("options cannot be null or undefined and it must be of type object.");
    }

    let httpRequest: WebResourceLike;
    try {
      if (isWebResourceLike(options)) {
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
   * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
   * @param operationSpec - The OperationSpec to use to populate the httpRequest.
   * @param callback - The callback to call when the response is received.
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

    const serializerOptions = operationArguments.options?.serializerOptions;
    const httpRequest: WebResourceLike = new WebResource();

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
            getPathStringFromParameter(urlParameter),
            serializerOptions
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
          if (queryParameterValue !== undefined && queryParameterValue !== null) {
            queryParameterValue = operationSpec.serializer.serialize(
              queryParameter.mapper,
              queryParameterValue,
              getPathStringFromParameter(queryParameter),
              serializerOptions
            );
            if (
              queryParameter.collectionFormat !== undefined &&
              queryParameter.collectionFormat !== null
            ) {
              if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                if (queryParameterValue.length === 0) {
                  // The collection is empty, no need to try serializing the current queryParam
                  continue;
                } else {
                  for (const index in queryParameterValue) {
                    const item = queryParameterValue[index];
                    queryParameterValue[index] =
                      item === undefined || item === null ? "" : item.toString();
                  }
                }
              } else if (
                queryParameter.collectionFormat === QueryCollectionFormat.Ssv ||
                queryParameter.collectionFormat === QueryCollectionFormat.Tsv
              ) {
                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
              }
            }
            if (!queryParameter.skipEncoding) {
              if (Array.isArray(queryParameterValue)) {
                for (const index in queryParameterValue) {
                  if (
                    queryParameterValue[index] !== undefined &&
                    queryParameterValue[index] !== null
                  ) {
                    queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
                  }
                }
              } else {
                queryParameterValue = encodeURIComponent(queryParameterValue);
              }
            }
            if (
              queryParameter.collectionFormat !== undefined &&
              queryParameter.collectionFormat !== null &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Multi &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Ssv &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Tsv
            ) {
              queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
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
      if (contentType && operationSpec.requestBody) {
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
          if (headerValue !== undefined && headerValue !== null) {
            headerValue = operationSpec.serializer.serialize(
              headerParameter.mapper,
              headerValue,
              getPathStringFromParameter(headerParameter),
              serializerOptions
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
          // By passing spanOptions if they exist at runtime, we're backwards compatible with @azure/core-tracing@preview.13 and earlier.
          (httpRequest as any).spanOptions = options.spanOptions;
        }

        if (options.tracingContext) {
          httpRequest.tracingContext = options.tracingContext;
        }

        if (options.shouldDeserialize !== undefined && options.shouldDeserialize !== null) {
          httpRequest.shouldDeserialize = options.shouldDeserialize;
        }
      }

      httpRequest.withCredentials = this._withCredentials;

      serializeRequestBody(this, httpRequest, operationArguments, operationSpec);

      if (httpRequest.streamResponseStatusCodes === undefined) {
        httpRequest.streamResponseStatusCodes = getStreamResponseStatusCodes(operationSpec);
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
        .then((res) => cb(null, res._response.parsedBody, res._response.request, res._response))
        .catch((err) => cb(err));
    }

    return result;
  }
}

export function serializeRequestBody(
  serviceClient: ServiceClient,
  httpRequest: WebResourceLike,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  const serializerOptions = operationArguments.options?.serializerOptions ?? {};
  const updatedOptions: Required<SerializerOptions> = {
    rootName: serializerOptions.rootName ?? "",
    includeRoot: serializerOptions.includeRoot ?? false,
    xmlCharKey: serializerOptions.xmlCharKey ?? XML_CHARKEY,
  };

  const xmlCharKey = serializerOptions.xmlCharKey;
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    httpRequest.body = getOperationArgumentValueFromParameter(
      serviceClient,
      operationArguments,
      operationSpec.requestBody,
      operationSpec.serializer
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, xmlName, xmlElementName, serializedName, xmlNamespace, xmlNamespacePrefix } =
      bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if ((httpRequest.body !== undefined && httpRequest.body !== null) || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        httpRequest.body = operationSpec.serializer.serialize(
          bodyMapper,
          httpRequest.body,
          requestBodyParameterPathString,
          updatedOptions
        );

        const isStream = typeName === MapperType.Stream;

        if (operationSpec.isXML) {
          const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
          const value = getXmlValueWithNamespace(
            xmlNamespace,
            xmlnsKey,
            typeName,
            httpRequest.body,
            updatedOptions
          );
          if (typeName === MapperType.Sequence) {
            httpRequest.body = stringifyXML(
              utils.prepareXMLRootList(
                value,
                xmlElementName || xmlName || serializedName!,
                xmlnsKey,
                xmlNamespace
              ),
              {
                rootName: xmlName || serializedName,
                xmlCharKey,
              }
            );
          } else if (!isStream) {
            httpRequest.body = stringifyXML(value, {
              rootName: xmlName || serializedName,
              xmlCharKey,
            });
          }
        } else if (
          typeName === MapperType.String &&
          (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")
        ) {
          // the String serializer has validated that request body is a string
          // so just send the string.
          return;
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
      if (formDataParameterValue !== undefined && formDataParameterValue !== null) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
          formDataParameter.mapper,
          formDataParameterValue,
          getPathStringFromParameter(formDataParameter),
          updatedOptions
        );
      }
    }
  }
}

/**
 * Adds an xml namespace to the xml serialized object if needed, otherwise it just returns the value itself
 */
function getXmlValueWithNamespace(
  xmlNamespace: string | undefined,
  xmlnsKey: string,
  typeName: string,
  serializedValue: any,
  options: Required<SerializerOptions>
): any {
  // Composite and Sequence schemas already got their root namespace set during serialization
  // We just need to add xmlns to the other schema types
  if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
    const result: any = {};
    result[options.xmlCharKey] = serializedValue;
    result[XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
    return result;
  }

  return serializedValue;
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

  if (isNode) {
    factories.push(proxyPolicy(options.proxySettings));
  }

  factories.push(logPolicy({ logger: logger.info }));

  return factories;
}

/**
 * Creates an HTTP pipeline based on the given options.
 * @param pipelineOptions - Defines options that are used to configure policies in the HTTP pipeline for an SDK client.
 * @param authPolicyFactory - An optional authentication policy factory to use for signing requests.
 * @returns A set of options that can be passed to create a new {@link ServiceClient}.
 */
export function createPipelineFromOptions(
  pipelineOptions: InternalPipelineOptions,
  authPolicyFactory?: RequestPolicyFactory
): ServiceClientOptions {
  const requestPolicyFactories: RequestPolicyFactory[] = [];

  if (pipelineOptions.sendStreamingJson) {
    requestPolicyFactories.push(ndJsonPolicy());
  }

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
    ...pipelineOptions.keepAliveOptions,
  };

  const retryOptions = {
    ...DefaultRetryOptions,
    ...pipelineOptions.retryOptions,
  };

  const redirectOptions = {
    ...DefaultRedirectOptions,
    ...pipelineOptions.redirectOptions,
  };

  if (isNode) {
    requestPolicyFactories.push(proxyPolicy(pipelineOptions.proxyOptions));
  }

  const deserializationOptions = {
    ...DefaultDeserializationOptions,
    ...pipelineOptions.deserializationOptions,
  };

  const loggingOptions: LogPolicyOptions = {
    ...pipelineOptions.loggingOptions,
  };

  requestPolicyFactories.push(
    tracingPolicy({ userAgent: userAgentValue }),
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

  if (isNode && pipelineOptions.decompressResponse === false) {
    requestPolicyFactories.push(disableResponseDecompressionPolicy());
  }

  return {
    httpClient: pipelineOptions.httpClient,
    requestPolicyFactories,
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
  const serializerOptions = operationArguments.options?.serializerOptions;
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
      serializer.serialize(parameterMapper, value, parameterPathString, serializerOptions);
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
      serializer.serialize(propertyMapper, propertyValue, propertyPathString, serializerOptions);
      if (propertyValue !== undefined && propertyValue !== null) {
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
    if (parent !== undefined && parent !== null && parameterPathPart in parent) {
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

/**
 * Parses an {@link HttpOperationResponse} into a normalized HTTP response object ({@link RestResponse}).
 * @param _response - Wrapper object for http response.
 * @param responseSpec - Mappers for how to parse the response properties.
 * @returns - A normalized response object.
 */
export function flattenResponse(
  _response: HttpOperationResponse,
  responseSpec: OperationResponse | undefined
): RestResponse {
  const parsedHeaders = _response.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  const addOperationResponse = (
    obj: Record<string, unknown>
  ): {
    _response: HttpOperationResponse;
  } => {
    return Object.defineProperty(obj, "_response", {
      value: _response,
    });
  };

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return addOperationResponse({
        ...parsedHeaders,
        blobBody: _response.blobBody,
        readableStreamBody: _response.readableStreamBody,
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
        ..._response.parsedBody,
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
      body: _response.parsedBody,
    });
  }

  return addOperationResponse({
    ...parsedHeaders,
    ..._response.parsedBody,
  });
}

function getCredentialScopes(
  options?: ServiceClientOptions,
  baseUri?: string
): string | string[] | undefined {
  if (options?.credentialScopes) {
    const scopes = options.credentialScopes;
    return Array.isArray(scopes)
      ? scopes.map((scope) => new URL(scope).toString())
      : new URL(scopes).toString();
  }

  if (baseUri) {
    return `${baseUri}/.default`;
  }
  return undefined;
}
