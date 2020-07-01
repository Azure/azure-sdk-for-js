// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
  DefaultHttpsClient,
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  Pipeline,
  createPipelineRequest
} from "@azure/core-https";
import {
  OperationResponse,
  OperationParameter,
  ParameterPath,
  OperationArguments,
  OperationSpec,
  QueryCollectionFormat,
  ServiceClientCredentials,
  OperationRequest,
  OperationResponseMap,
  FullOperationResponse,
  Serializer,
  Mapper,
  DictionaryMapper,
  CompositeMapper
} from "./interfaces";
import { getPathStringFromParameter, isStreamOperation } from "./interfaceHelpers";
import { MapperType } from "./serializer";
import { URL } from "./url";
import { appendPath, replaceAll, setQueryParameter } from "./urlHelpers";
import { isPrimitiveType } from "./utils";

// TODO: bring back signingPolicy / bearerTokenAuthenticationPolicy?

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
   * Credentials used to authenticate the request.
   */
  credentials?: TokenCredential | ServiceClientCredentials;
  /**
   * A customized pipeline to use, otherwise a default one will be created.
   */
  pipeline?: Pipeline;
  /**
   * The HttpClient that will be used to send HTTP requests.
   */
  httpsClient?: HttpsClient;
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
  private readonly _baseUri?: string;

  /**
   * The default request content type for the service.
   * Used if no requestContentType is present on an OperationSpec.
   */
  private readonly _requestContentType?: string;

  /**
   * The HTTP client that will be used to send requests.
   */
  private readonly _httpsClient: HttpsClient;

  private readonly _pipeline: Pipeline;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param credentials The credentials used for authentication with the service.
   * @param options The service client options that govern the behavior of the client.
   */
  constructor(options: ServiceClientOptions = {}) {
    this._requestContentType = options.requestContentType;
    this._baseUri = options.baseUri;
    this._httpsClient = options.httpsClient || new DefaultHttpsClient();
    this._pipeline = options.pipeline || createDefaultPipeline();
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

    const url = getRequestUrl(baseUri, operationSpec, operationArguments);

    const request: OperationRequest = createPipelineRequest({
      url
    });
    request.method = operationSpec.httpMethod;
    request.operationSpec = operationSpec;

    const contentType = operationSpec.contentType || this._requestContentType;
    if (contentType) {
      request.headers.set("Content-Type", contentType);
    }

    if (operationSpec.headerParameters) {
      for (const headerParameter of operationSpec.headerParameters) {
        let headerValue = getOperationArgumentValueFromParameter(
          operationArguments,
          headerParameter,
          operationSpec.serializer
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
          request.shouldDeserialize = requestOptions.shouldDeserialize;
        }
      }

      if (options.abortSignal) {
        request.abortSignal = options.abortSignal;
      }

      if (options.tracingOptions?.spanOptions) {
        request.spanOptions = options.tracingOptions.spanOptions;
      }
    }

    serializeRequestBody(request, operationArguments, operationSpec);

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

function getRequestUrl(
  baseUri: string,
  operationSpec: OperationSpec,
  operationArguments: OperationArguments
): string {
  let requestUrl = new URL(baseUri);
  if (operationSpec.path) {
    requestUrl = appendPath(requestUrl, operationSpec.path);
  }
  if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
    for (const urlParameter of operationSpec.urlParameters) {
      let urlParameterValue: string = getOperationArgumentValueFromParameter(
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
      requestUrl = replaceAll(
        requestUrl,
        `{${urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)}}`,
        urlParameterValue
      );
    }
  }
  if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
    for (const queryParameter of operationSpec.queryParameters) {
      let queryParameterValue = getOperationArgumentValueFromParameter(
        operationArguments,
        queryParameter,
        operationSpec.serializer
      );
      if (queryParameterValue !== undefined && queryParameterValue !== null) {
        queryParameterValue = operationSpec.serializer.serialize(
          queryParameter.mapper,
          queryParameterValue,
          getPathStringFromParameter(queryParameter)
        );
        if (queryParameter.collectionFormat) {
          if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
            if (queryParameterValue.length === 0) {
              queryParameterValue = "";
            } else {
              for (const index in queryParameterValue) {
                const item = queryParameterValue[index];
                if (item === null || item === undefined) {
                  queryParameterValue[index] = "";
                } else {
                  queryParameterValue[index] = item.toString();
                }
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
              if (queryParameterValue[index] !== undefined && queryParameterValue[index] !== null) {
                queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
              }
            }
          } else {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
        }
        if (
          queryParameter.collectionFormat &&
          queryParameter.collectionFormat !== QueryCollectionFormat.Multi &&
          queryParameter.collectionFormat !== QueryCollectionFormat.Ssv &&
          queryParameter.collectionFormat !== QueryCollectionFormat.Tsv
        ) {
          queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
        }
        requestUrl = setQueryParameter(
          requestUrl,
          queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter),
          queryParameterValue
        );
      }
    }
  }
  return requestUrl.toString();
}

export function serializeRequestBody(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(
      operationArguments,
      operationSpec.requestBody,
      operationSpec.serializer
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, serializedName } = bodyMapper;
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

        const isStream = typeName === MapperType.Stream;

        /* if (operationSpec.isXML) {
          if (typeName === MapperType.Sequence) {
            request.body = stringifyXML(
              utils.prepareXMLRootList(request.body, xmlElementName || xmlName || serializedName!),
              { rootName: xmlName || serializedName }
            );
          } else if (!isStream) {
            request.body = stringifyXML(request.body, {
              rootName: xmlName || serializedName
            });
          }
        } else */

        if (
          typeName === MapperType.String &&
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
        formDataParameter,
        operationSpec.serializer
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

function createDefaultPipeline(): Pipeline {
  // TODO: mix in auth and deserialization
  return createDefaultPipeline();
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
  operationArguments: OperationArguments,
  parameter: OperationParameter,
  serializer: Serializer
): any {
  let parameterPath = parameter.parameterPath;
  const parameterMapper = parameter.mapper;
  let value: any;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        value = parameterMapper.defaultValue;
      } else {
        const propertySearchResult = getPropertyFromParameterPath(
          operationArguments,
          parameterPath
        );

        let useDefaultValue = false;
        if (!propertySearchResult.propertyFound) {
          useDefaultValue =
            parameterMapper.required ||
            (parameterPath[0] === "options" && parameterPath.length === 2);
        }
        value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
      }
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
      const propertyValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath: propertyPath,
          mapper: propertyMapper
        },
        serializer
      );
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
    if (parent && parameterPathPart in parent) {
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
  fullResponse: FullOperationResponse,
  responseSpec: OperationResponseMap | undefined
): OperationResponse {
  const parsedHeaders = fullResponse.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return {
        full: fullResponse,
        flat: {
          ...parsedHeaders,
          blobBody: fullResponse.blobBody,
          readableStreamBody: fullResponse.readableStreamBody
        }
      };
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
      return {
        full: fullResponse,
        flat: arrayResponse
      };
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return {
        full: fullResponse,
        flat: {
          ...parsedHeaders,
          ...fullResponse.parsedBody
        }
      };
    }
  }

  if (
    bodyMapper ||
    fullResponse.request.method === "HEAD" ||
    isPrimitiveType(fullResponse.parsedBody)
  ) {
    return {
      full: fullResponse,
      flat: {
        ...parsedHeaders,
        body: fullResponse.parsedBody
      }
    };
  }

  return {
    full: fullResponse,
    flat: {
      ...parsedHeaders,
      ...fullResponse.parsedBody
    }
  };
}
