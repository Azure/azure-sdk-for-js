// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  DefaultHttpsClient,
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  Pipeline,
  createPipelineRequest,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-https";
import {
  OperationResponse,
  OperationArguments,
  OperationSpec,
  OperationRequest,
  OperationResponseMap,
  FullOperationResponse,
  DictionaryMapper,
  CompositeMapper
} from "./interfaces";
import { getPathStringFromParameter, isStreamOperation } from "./interfaceHelpers";
import { MapperTypeNames } from "./serializer";
import { getRequestUrl } from "./urlHelpers";
import { isPrimitiveType } from "./utils";
import { getOperationArgumentValueFromParameter } from "./operationHelpers";
import { deserializationPolicy } from "./deserializationPolicy";

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
  stringifyXML?: (obj: any, opts?: { rootName?: string }) => string;
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
  private readonly _stringifyXML?: (obj: any, opts?: { rootName?: string }) => string;

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
    this._pipeline =
      options.pipeline ||
      createDefaultPipeline({ baseUri: this._baseUri, credential: options.credential });
    this._stringifyXML = options.stringifyXML;
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
  stringifyXML: (obj: any, opts?: { rootName?: string }) => string = function() {
    throw new Error("XML serialization unsupported!");
  }
): void {
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(
      operationArguments,
      operationSpec.requestBody
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, serializedName, xmlName, xmlElementName } = bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if (request.body || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        request.body = operationSpec.serializer.serialize(
          bodyMapper,
          request.body,
          requestBodyParameterPathString
        );

        const isStream = typeName === MapperTypeNames.Stream;

        if (operationSpec.isXML) {
          if (typeName === MapperTypeNames.Sequence) {
            request.body = stringifyXML(
              prepareXMLRootList(request.body, xmlElementName || xmlName || serializedName!),
              { rootName: xmlName || serializedName }
            );
          } else if (!isStream) {
            request.body = stringifyXML(request.body, {
              rootName: xmlName || serializedName
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
          getPathStringFromParameter(formDataParameter)
        );
      }
    }
  }
}

function createDefaultPipeline(
  options: { baseUri?: string; credential?: TokenCredential } = {}
): Pipeline {
  const pipeline = createPipelineFromOptions({});

  const credential = options.credential;
  if (credential) {
    if (isTokenCredential(credential)) {
      pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: `${options.baseUri || ""}/.default` })
      );
    } else {
      throw new Error("The credential argument must implement the TokenCredential interface");
    }
  }

  pipeline.addPolicy(deserializationPolicy(), { phase: "Serialize" });

  return pipeline;
}

function prepareXMLRootList(obj: any, elementName: string): { [key: string]: any[] } {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  return { [elementName]: obj };
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
