// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
  DefaultHttpsClient,
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  Pipeline,
  createPipelineRequest,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions
} from "@azure/core-https";
import {
  OperationResponse,
  OperationArguments,
  OperationSpec,
  OperationRequest,
  OperationResponseMap,
  FullOperationResponse,
  DictionaryMapper,
  CompositeMapper,
  XmlOptions,
  XML_CHARKEY,
  XML_ATTRKEY,
  RequiredSerializerOptions
} from "./interfaces";
import { getPathStringFromParameter, isStreamOperation } from "./interfaceHelpers";
import { MapperTypeNames } from "./serializer";
import { getRequestUrl } from "./urlHelpers";
import { isPrimitiveType } from "./utils";
import { getOperationArgumentValueFromParameter } from "./operationHelpers";
import { deserializationPolicy, DeserializationPolicyOptions } from "./deserializationPolicy";

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
  /**
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   */
  baseUri?: string;
  /**
   * The default request content type for the service.
   * Used if no requestContentType is present on an OperationSpec.
   */
  requestContentType?: string;
  /**
   * Credential used to authenticate the request.
   */
  credential?: TokenCredential;
  /**
   * A customized pipeline to use, otherwise a default one will be created.
   */
  pipeline?: Pipeline;
  /**
   * The HttpClient that will be used to send HTTP requests.
   */
  httpsClient?: HttpsClient;

  /**
   * A method that is able to turn an XML object model into a string.
   */
  stringifyXML?: (obj: any, opts?: XmlOptions) => string;

  /**
   * A method that is able to parse XML.
   */
  parseXML?: (str: string, opts?: XmlOptions) => Promise<any>;
}

/**
 * Initializes a new instance of the ServiceClient.
 */
export class ServiceClient {
  /**
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   */
  private readonly _baseUri?: string;

  /**
   * The default request content type for the service.
   * Used if no requestContentType is present on an OperationSpec.
   */
  private readonly _requestContentType?: string;

  /**
   * Decoupled method for processing XML into a string.
   */
  private readonly _stringifyXML?: (obj: any, opts?: XmlOptions) => string;

  /**
   * The HTTP client that will be used to send requests.
   */
  private readonly _httpsClient: HttpsClient;

  private readonly _pipeline: Pipeline;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param credential The credentials used for authentication with the service.
   * @param options The service client options that govern the behavior of the client.
   */
  constructor(options: ServiceClientOptions = {}) {
    this._requestContentType = options.requestContentType;
    this._baseUri = options.baseUri;
    this._httpsClient = options.httpsClient || new DefaultHttpsClient();
    this._stringifyXML = options.stringifyXML;
    this._pipeline =
      options.pipeline ||
      createDefaultPipeline({
        baseUri: this._baseUri,
        credential: options.credential,
        parseXML: options.parseXML
      });
  }

  /**
   * Send the provided httpRequest.
   */
  async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    return this._pipeline.sendRequest(this._httpsClient, request);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
   * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
   */
  async sendOperationRequest(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec
  ): Promise<OperationResponse> {
    const baseUri: string | undefined = operationSpec.baseUrl || this._baseUri;
    if (!baseUri) {
      throw new Error(
        "If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use."
      );
    }

    // Templatized URLs sometimes reference properties on the ServiceClient child class,
    // so we have to pass `this` below in order to search these properties if they're
    // not part of OperationArguments
    const url = getRequestUrl(baseUri, operationSpec, operationArguments, this);

    const request: OperationRequest = createPipelineRequest({
      url
    });
    request.method = operationSpec.httpMethod;
    request.additionalInfo = {};
    request.additionalInfo.operationSpec = operationSpec;

    const contentType = operationSpec.contentType || this._requestContentType;
    if (contentType) {
      request.headers.set("Content-Type", contentType);
    }

    if (operationSpec.headerParameters) {
      for (const headerParameter of operationSpec.headerParameters) {
        let headerValue = getOperationArgumentValueFromParameter(
          operationArguments,
          headerParameter
        );
        if (headerValue !== null && headerValue !== undefined) {
          headerValue = operationSpec.serializer.serialize(
            headerParameter.mapper,
            headerValue,
            getPathStringFromParameter(headerParameter)
          );
          const headerCollectionPrefix = (headerParameter.mapper as DictionaryMapper)
            .headerCollectionPrefix;
          if (headerCollectionPrefix) {
            for (const key of Object.keys(headerValue)) {
              request.headers.set(headerCollectionPrefix + key, headerValue[key]);
            }
          } else {
            request.headers.set(
              headerParameter.mapper.serializedName || getPathStringFromParameter(headerParameter),
              headerValue
            );
          }
        }
      }
    }

    const options = operationArguments.options;
    if (options) {
      const requestOptions = options.requestOptions;

      if (requestOptions) {
        if (requestOptions.customHeaders) {
          for (const customHeaderName of Object.keys(requestOptions.customHeaders)) {
            request.headers.set(customHeaderName, requestOptions.customHeaders[customHeaderName]);
          }
        }

        if (requestOptions.timeout) {
          request.timeout = requestOptions.timeout;
        }

        if (requestOptions.onUploadProgress) {
          request.onUploadProgress = requestOptions.onUploadProgress;
        }

        if (requestOptions.onDownloadProgress) {
          request.onDownloadProgress = requestOptions.onDownloadProgress;
        }

        if (requestOptions.shouldDeserialize !== undefined) {
          request.additionalInfo.shouldDeserialize = requestOptions.shouldDeserialize;
        }
      }

      if (options.abortSignal) {
        request.abortSignal = options.abortSignal;
      }

      if (options.tracingOptions?.spanOptions) {
        request.spanOptions = options.tracingOptions.spanOptions;
      }
    }

    serializeRequestBody(request, operationArguments, operationSpec, this._stringifyXML);

    if (request.streamResponseBody === undefined) {
      request.streamResponseBody = isStreamOperation(operationSpec);
    }

    try {
      const rawResponse = await this.sendRequest(request);
      return flattenResponse(rawResponse, operationSpec.responses[rawResponse.status]);
    } catch (error) {
      if (error.response) {
        error.details = flattenResponse(
          error.response,
          operationSpec.responses[error.statusCode] || operationSpec.responses["default"]
        );
      }
      throw error;
    }
  }
}

/**
 * @internal @ignore
 */
export function serializeRequestBody(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec,
  stringifyXML: (obj: any, opts?: XmlOptions) => string = function() {
    throw new Error("XML serialization unsupported!");
  }
): void {
  const serializerOptions = operationArguments.options?.serializerOptions;
  const updatedOptions: RequiredSerializerOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };

  const xmlCharKey = updatedOptions.xml.xmlCharKey;
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(
      operationArguments,
      operationSpec.requestBody
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const {
      required,
      serializedName,
      xmlName,
      xmlElementName,
      xmlNamespace,
      xmlNamespacePrefix
    } = bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if (request.body || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        request.body = operationSpec.serializer.serialize(
          bodyMapper,
          request.body,
          requestBodyParameterPathString,
          updatedOptions
        );

        const isStream = typeName === MapperTypeNames.Stream;

        if (operationSpec.isXML) {
          const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
          const value = getXmlValueWithNamespace(
            xmlNamespace,
            xmlnsKey,
            typeName,
            request.body,
            updatedOptions
          );

          if (typeName === MapperTypeNames.Sequence) {
            request.body = stringifyXML(
              prepareXMLRootList(
                value,
                xmlElementName || xmlName || serializedName!,
                xmlnsKey,
                xmlNamespace
              ),
              { rootName: xmlName || serializedName, xmlCharKey }
            );
          } else if (!isStream) {
            request.body = stringifyXML(value, {
              rootName: xmlName || serializedName,
              xmlCharKey
            });
          }
        } else if (
          typeName === MapperTypeNames.String &&
          (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")
        ) {
          // the String serializer has validated that request body is a string
          // so just send the string.
          return;
        } else if (!isStream) {
          request.body = JSON.stringify(request.body);
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
    request.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue = getOperationArgumentValueFromParameter(
        operationArguments,
        formDataParameter
      );
      if (formDataParameterValue !== undefined && formDataParameterValue !== null) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
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
  options: RequiredSerializerOptions
): any {
  // Composite and Sequence schemas already got their root namespace set during serialization
  // We just need to add xmlns to the other schema types
  if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
    const result: any = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
    return result;
  }

  return serializedValue;
}

function createDefaultPipeline(
  options: {
    baseUri?: string;
    credential?: TokenCredential;
    parseXML?: (str: string, opts?: XmlOptions) => Promise<any>;
  } = {}
): Pipeline {
  return createClientPipeline({
    credentialOptions: options,
    deserializationOptions: {
      parseXML: options.parseXML
    }
  });
}

/**
 * Options for creating a Pipeline to use with ServiceClient.
 * Mostly for customizing the auth policy (if using token auth) or
 * the deserialization options when using XML.
 */
export interface ClientPipelineOptions extends InternalPipelineOptions {
  /**
   * Options to customize bearerTokenAuthenticationPolicy.
   */
  credentialOptions?: { baseUri?: string; credential?: TokenCredential };
  /**
   * Options to customize deserializationPolicy.
   */
  deserializationOptions?: DeserializationPolicyOptions;
}

/**
 * Creates a new Pipeline for use with a Service Client.
 * Adds in deserializationPolicy by default.
 * Also adds in bearerTokenAuthenticationPolicy if passed a TokenCredential.
 * @param options Options to customize the created pipeline.
 */
export function createClientPipeline(options: ClientPipelineOptions = {}): Pipeline {
  const pipeline = createPipelineFromOptions(options ?? {});

  const credential = options.credentialOptions?.credential;
  if (credential) {
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: `${options.credentialOptions?.baseUri || ""}/.default`
      })
    );
  }

  pipeline.addPolicy(deserializationPolicy(options.deserializationOptions), { phase: "Serialize" });

  return pipeline;
}

function prepareXMLRootList(
  obj: any,
  elementName: string,
  xmlNamespaceKey?: string,
  xmlNamespace?: string
): { [key: string]: any[] } {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  if (!xmlNamespaceKey || !xmlNamespace) {
    return { [elementName]: obj };
  }

  const result = { [elementName]: obj };
  result[XML_ATTRKEY] = { [xmlNamespaceKey]: xmlNamespace };
  return result;
}

function flattenResponse(
  fullResponse: FullOperationResponse,
  responseSpec: OperationResponseMap | undefined
): OperationResponse {
  const parsedHeaders = fullResponse.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  function addResponse<T extends object>(
    obj: T
  ): T & { readonly _response: FullOperationResponse } {
    return Object.defineProperty(obj, "_response", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: fullResponse
    });
  }

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return addResponse({
        ...parsedHeaders,
        blobBody: fullResponse.blobBody,
        readableStreamBody: fullResponse.readableStreamBody
      });
    }

    const modelProperties =
      (typeName === "Composite" && (bodyMapper as CompositeMapper).type.modelProperties) || {};
    const isPageableResponse = Object.keys(modelProperties).some(
      (k) => modelProperties[k].serializedName === ""
    );
    if (typeName === "Sequence" || isPageableResponse) {
      const arrayResponse: { [key: string]: unknown } =
        fullResponse.parsedBody ?? (([] as unknown) as { [key: string]: unknown });

      for (const key of Object.keys(modelProperties)) {
        if (modelProperties[key].serializedName) {
          arrayResponse[key] = fullResponse.parsedBody?.[key];
        }
      }

      if (parsedHeaders) {
        for (const key of Object.keys(parsedHeaders)) {
          arrayResponse[key] = parsedHeaders[key];
        }
      }
      return addResponse(arrayResponse);
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return addResponse({
        ...parsedHeaders,
        ...fullResponse.parsedBody
      });
    }
  }

  if (
    bodyMapper ||
    fullResponse.request.method === "HEAD" ||
    isPrimitiveType(fullResponse.parsedBody)
  ) {
    return addResponse({
      ...parsedHeaders,
      body: fullResponse.parsedBody
    });
  }

  return addResponse({
    ...parsedHeaders,
    ...fullResponse.parsedBody
  });
}
