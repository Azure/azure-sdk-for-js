// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  Pipeline,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import {
  OperationArguments,
  OperationSpec,
  OperationRequest,
  CommonClientOptions
} from "./interfaces";
import { getStreamingResponseStatusCodes } from "./interfaceHelpers";
import { getRequestUrl } from "./urlHelpers";
import { flattenResponse } from "./utils";
import { URL } from "./url";
import { getCachedDefaultHttpClient } from "./httpClientCache";
import { getOperationRequestInfo } from "./operationHelpers";
import { createClientPipeline } from "./pipeline";

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions extends CommonClientOptions {
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
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  allowInsecureConnection?: boolean;
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
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  private readonly _allowInsecureConnection?: boolean;

  /**
   * The HTTP client that will be used to send requests.
   */
  private readonly _httpClient: HttpClient;

  /**
   * The pipeline used by this client to make requests
   */
  public readonly pipeline: Pipeline;

  /**
   * The ServiceClient constructor
   * @param credential - The credentials used for authentication with the service.
   * @param options - The service client options that govern the behavior of the client.
   */
  constructor(options: ServiceClientOptions = {}) {
    this._requestContentType = options.requestContentType;
    this._baseUri = options.baseUri;
    this._allowInsecureConnection = options.allowInsecureConnection;
    this._httpClient = options.httpClient || getCachedDefaultHttpClient();

    this.pipeline = options.pipeline || createDefaultPipeline(options);
  }

  /**
   * Send the provided httpRequest.
   */
  async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    return this.pipeline.sendRequest(this._httpClient, request);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @typeParam T - The typed result of the request, based on the OperationSpec.
   * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
   * @param operationSpec - The OperationSpec to use to populate the httpRequest.
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
    const operationInfo = getOperationRequestInfo(request);
    operationInfo.operationSpec = operationSpec;
    operationInfo.operationArguments = operationArguments;

    const contentType = operationSpec.contentType || this._requestContentType;
    if (contentType && operationSpec.requestBody) {
      request.headers.set("Content-Type", contentType);
    }

    const options = operationArguments.options;
    if (options) {
      const requestOptions = options.requestOptions;

      if (requestOptions) {
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
          operationInfo.shouldDeserialize = requestOptions.shouldDeserialize;
        }

        if (requestOptions.allowInsecureConnection) {
          request.allowInsecureConnection = true;
        }
      }

      if (options.abortSignal) {
        request.abortSignal = options.abortSignal;
      }

      if (options.tracingOptions) {
        request.tracingOptions = options.tracingOptions;
      }
    }

    if (this._allowInsecureConnection) {
      request.allowInsecureConnection = true;
    }

    if (request.streamResponseStatusCodes === undefined) {
      request.streamResponseStatusCodes = getStreamingResponseStatusCodes(operationSpec);
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

function createDefaultPipeline(options: ServiceClientOptions): Pipeline {
  const credentialScopes = getCredentialScopes(options);
  const credentialOptions =
    options.credential && credentialScopes
      ? { credentialScopes, credential: options.credential }
      : undefined;

  return createClientPipeline({
    ...options,
    credentialOptions
  });
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
