// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommonClientOptions,
  OperationArguments,
  OperationRequest,
  OperationSpec,
} from "./interfaces";
import {
  HttpClient,
  Pipeline,
  PipelineRequest,
  PipelineResponse,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { createClientPipeline } from "./pipeline";
import { flattenResponse } from "./utils";
import { getCachedDefaultHttpClient } from "./httpClientCache";
import { getOperationRequestInfo } from "./operationHelpers";
import { getRequestUrl } from "./urlHelpers";
import { getStreamingResponseStatusCodes } from "./interfaceHelpers";
import { logger } from "./log";

/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions extends CommonClientOptions {
  /**
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   * @deprecated This property is deprecated and will be removed soon, please use endpoint instead
   */
  baseUri?: string;
  /**
   * If specified, this is the endpoint that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   * to encourage customer to use endpoint, we mark the baseUri as deprecated.
   */
  endpoint?: string;
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
}

/**
 * Initializes a new instance of the ServiceClient.
 */
export class ServiceClient {
  /**
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   */
  private readonly _endpoint?: string;

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
    this._endpoint = options.endpoint ?? options.baseUri;
    if (options.baseUri) {
      logger.warning(
        "The baseUri option for SDK Clients has been deprecated, please use endpoint instead."
      );
    }
    this._allowInsecureConnection = options.allowInsecureConnection;
    this._httpClient = options.httpClient || getCachedDefaultHttpClient();

    this.pipeline = options.pipeline || createDefaultPipeline(options);
    if (options.additionalPolicies?.length) {
      for (const { policy, position } of options.additionalPolicies) {
        // Sign happens after Retry and is commonly needed to occur
        // before policies that intercept post-retry.
        const afterPhase = position === "perRetry" ? "Sign" : undefined;
        this.pipeline.addPolicy(policy, {
          afterPhase,
        });
      }
    }
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
    const endpoint: string | undefined = operationSpec.baseUrl || this._endpoint;
    if (!endpoint) {
      throw new Error(
        "If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use."
      );
    }

    // Templatized URLs sometimes reference properties on the ServiceClient child class,
    // so we have to pass `this` below in order to search these properties if they're
    // not part of OperationArguments
    const url = getRequestUrl(endpoint, operationSpec, operationArguments, this);

    const request: OperationRequest = createPipelineRequest({
      url,
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
    } catch (error: any) {
      if (typeof error === "object" && error?.response) {
        const rawResponse = error.response;
        const flatResponse = flattenResponse(
          rawResponse,
          operationSpec.responses[error.statusCode] || operationSpec.responses["default"]
        );
        error.details = flatResponse;
        if (options?.onResponse) {
          options.onResponse(rawResponse, flatResponse, error);
        }
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
    credentialOptions,
  });
}

function getCredentialScopes(options: ServiceClientOptions): string | string[] | undefined {
  if (options.credentialScopes) {
    const scopes = options.credentialScopes;
    return Array.isArray(scopes)
      ? scopes.map((scope) => new URL(scope).toString())
      : new URL(scopes).toString();
  }

  if (options.endpoint) {
    return `${options.endpoint}/.default`;
  }

  if (options.baseUri) {
    return `${options.baseUri}/.default`;
  }

  if (options.credential && !options.credentialScopes) {
    throw new Error(
      `When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`
    );
  }

  return undefined;
}
