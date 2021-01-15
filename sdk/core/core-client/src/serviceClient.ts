// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
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
  OperationArguments,
  OperationSpec,
  OperationRequest,
  OperationResponseMap,
  FullOperationResponse,
  CompositeMapper,
  XmlOptions
} from "./interfaces";
import { isStreamOperation } from "./interfaceHelpers";
import { getRequestUrl } from "./urlHelpers";
import { isPrimitiveType } from "./utils";
import { deserializationPolicy, DeserializationPolicyOptions } from "./deserializationPolicy";
import { URL } from "./url";
import { serializationPolicy, serializationPolicyOptions } from "./serializationPolicy";
import { getCachedDefaultHttpsClient } from "./httpClientCache";

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
   * If specified, will be used to build the BearerTokenAuthenticationPolicy.
   */
  credentialScopes?: string | string[];
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
    this._httpsClient = options.httpsClient || getCachedDefaultHttpsClient();
    const credentialScopes = getCredentialScopes(options);
    this._pipeline =
      options.pipeline ||
      createDefaultPipeline({
        credentialScopes,
        credential: options.credential,
        parseXML: options.parseXML,
        stringifyXML: options.stringifyXML
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
   * @typeParam T The typed result of the request, based on the OperationSpec.
   * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
   * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
   */
  async sendOperationRequest<T>(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec
  ): Promise<T> {
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
    request.additionalInfo.operationArguments = operationArguments;

    const contentType = operationSpec.contentType || this._requestContentType;
    if (contentType && operationSpec.requestBody) {
      request.headers.set("Content-Type", contentType);
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

    if (request.streamResponseBody === undefined) {
      request.streamResponseBody = isStreamOperation(operationSpec);
    }

    try {
      const rawResponse = await this.sendRequest(request);
      const flatResponse = flattenResponse(
        rawResponse,
        operationSpec.responses[rawResponse.status]
      ) as T;
      if (options?.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
      return flatResponse;
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

function createDefaultPipeline(
  options: {
    credentialScopes?: string | string[];
    credential?: TokenCredential;
    parseXML?: (str: string, opts?: XmlOptions) => Promise<any>;
    stringifyXML?: (obj: any, opts?: XmlOptions) => string;
  } = {}
): Pipeline {
  const credentialOptions =
    options.credential && options.credentialScopes
      ? { credentialScopes: options.credentialScopes, credential: options.credential }
      : undefined;

  return createClientPipeline({
    credentialOptions,
    deserializationOptions: {
      parseXML: options.parseXML
    },
    serializationOptions: {
      stringifyXML: options.stringifyXML
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
  credentialOptions?: { credentialScopes: string | string[]; credential: TokenCredential };
  /**
   * Options to customize deserializationPolicy.
   */
  deserializationOptions?: DeserializationPolicyOptions;
  /**
   * Options to customize serializationPolicy.
   */
  serializationOptions?: serializationPolicyOptions;
}

/**
 * Creates a new Pipeline for use with a Service Client.
 * Adds in deserializationPolicy by default.
 * Also adds in bearerTokenAuthenticationPolicy if passed a TokenCredential.
 * @param options Options to customize the created pipeline.
 */
export function createClientPipeline(options: ClientPipelineOptions = {}): Pipeline {
  const pipeline = createPipelineFromOptions(options ?? {});
  if (options.credentialOptions) {
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential: options.credentialOptions.credential,
        scopes: options.credentialOptions.credentialScopes
      })
    );
  }

  pipeline.addPolicy(serializationPolicy(options.serializationOptions), { phase: "Serialize" });
  pipeline.addPolicy(deserializationPolicy(options.deserializationOptions), {
    phase: "Deserialize"
  });

  return pipeline;
}

function flattenResponse(
  fullResponse: FullOperationResponse,
  responseSpec: OperationResponseMap | undefined
): unknown {
  const parsedHeaders = fullResponse.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return {
        ...parsedHeaders,
        blobBody: fullResponse.blobBody,
        readableStreamBody: fullResponse.readableStreamBody
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
      return arrayResponse;
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return {
        ...parsedHeaders,
        ...fullResponse.parsedBody
      };
    }
  }

  if (
    bodyMapper ||
    fullResponse.request.method === "HEAD" ||
    isPrimitiveType(fullResponse.parsedBody)
  ) {
    return {
      ...parsedHeaders,
      body: fullResponse.parsedBody
    };
  }

  return {
    ...parsedHeaders,
    ...fullResponse.parsedBody
  };
}

function getCredentialScopes(options: ServiceClientOptions): string | string[] | undefined {
  if (options.credentialScopes) {
    const scopes = options.credentialScopes;
    return Array.isArray(scopes)
      ? scopes.map((scope) => new URL(scope).toString())
      : new URL(scopes).toString();
  }

  if (options.baseUri) {
    return `${options.baseUri}/.default`;
  }

  if (options.credential && !options.credentialScopes) {
    throw new Error(
      `When using credentials, the ServiceClientOptions must contain either a baseUri or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`
    );
  }

  return undefined;
}
