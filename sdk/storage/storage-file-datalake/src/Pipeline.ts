import {
  BaseRequestPolicy,
  bearerTokenAuthenticationPolicy,
  deserializationPolicy,
  disableResponseDecompressionPolicy,
  generateClientRequestIdPolicy,
  HttpClient as IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpRequestBody,
  isNode,
  isTokenCredential,
  KeepAliveOptions,
  keepAlivePolicy,
  logPolicy,
  ProxyOptions,
  proxyPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  ServiceClientOptions,
  TokenCredential,
  tracingPolicy,
  UserAgentOptions,
  WebResource
} from "@azure/core-http";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { logger } from "./log";
import { StorageBrowserPolicyFactory } from "./StorageBrowserPolicyFactory";
import { StorageRetryOptions, StorageRetryPolicyFactory } from "./StorageRetryPolicyFactory";
import { TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { Pipeline as BlobPipeline } from "@azure/storage-blob";
import {
  StorageDataLakeLoggingAllowedHeaderNames,
  StorageDataLakeLoggingAllowedQueryParameters,
  StorageOAuthScopes
} from "./utils/constants";
import { getCachedDefaultHttpClient } from "./utils/cache";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  BaseRequestPolicy,
  StorageOAuthScopes,
  deserializationPolicy,
  IHttpClient,
  HttpHeaders,
  HttpRequestBody,
  HttpOperationResponse,
  WebResource,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
};

/**
 * Option interface for Pipeline constructor.
 *
 * @export
 * @interface PipelineOptions
 */
export interface PipelineOptions {
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof PipelineOptions
   */
  httpClient?: IHttpClient;
}

/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 *
 * @export
 * @class Pipeline
 */
export class Pipeline extends BlobPipeline {
  /**
   * A list of chained request policy factories.
   *
   * @type {RequestPolicyFactory[]}
   * @memberof Pipeline
   */
  public readonly factories: RequestPolicyFactory[];
  /**
   * Configures pipeline logger and HTTP client.
   *
   * @type {PipelineOptions}
   * @memberof Pipeline
   */
  public readonly options: PipelineOptions;

  /**
   * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
   *
   * @param {RequestPolicyFactory[]} factories
   * @param {PipelineOptions} [options={}]
   * @memberof Pipeline
   */
  constructor(factories: RequestPolicyFactory[], options: PipelineOptions = {}) {
    super(factories, options);
    this.factories = factories;
    // when options.httpClient is not specified, passing in a DefaultHttpClient instance to
    // avoid each client creating its own http client.
    this.options = {
      ...options,
      httpClient: options.httpClient || getCachedDefaultHttpClient()
    };
  }

  /**
   * Transfer Pipeline object to ServiceClientOptions object which is required by
   * ServiceClient constructor.
   *
   * @returns {ServiceClientOptions} The ServiceClientOptions object from this Pipeline.
   * @memberof Pipeline
   */
  public toServiceClientOptions(): ServiceClientOptions {
    return {
      httpClient: this.options.httpClient,
      requestPolicyFactories: this.factories
    };
  }
}

/**
 * Options interface for the {@link newPipeline} function.
 *
 * @export
 * @interface StoragePipelineOptions
 */
export interface StoragePipelineOptions {
  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxyOptions;
  /**
   * Options for adding user agent details to outgoing requests.
   *
   * @type {UserAgentOptions}
   * @memberof StoragePipelineOptions
   */
  userAgentOptions?: UserAgentOptions;
  /**
   * Configures the built-in retry policy behavior.
   *
   * @type {StorageRetryOptions}
   * @memberof StoragePipelineOptions
   */
  retryOptions?: StorageRetryOptions;
  /**
   * Keep alive configurations. Default keep-alive is enabled.
   *
   * @type {KeepAliveOptions}
   * @memberof StoragePipelineOptions
   */
  keepAliveOptions?: KeepAliveOptions;

  /**
   * Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof StoragePipelineOptions
   */
  httpClient?: IHttpClient;
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @export
 * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param {StoragePipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 */
export function newPipeline(
  credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
): Pipeline {
  if (credential === undefined) {
    credential = new AnonymousCredential();
  }
  // Order is important. Closer to the API at the top & closer to the network at the bottom.
  // The credential's policy factory must appear close to the wire so it can sign any
  // changes made by other factories (like UniqueRequestIDPolicyFactory)

  const telemetryPolicy = new TelemetryPolicyFactory(pipelineOptions.userAgentOptions);
  const factories: RequestPolicyFactory[] = [
    tracingPolicy({ userAgent: telemetryPolicy.telemetryString }),
    keepAlivePolicy(pipelineOptions.keepAliveOptions),
    telemetryPolicy,
    generateClientRequestIdPolicy(),
    new StorageBrowserPolicyFactory(),
    new StorageRetryPolicyFactory(pipelineOptions.retryOptions), // Retry policy should be above any policy that throws retryable errors
    deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
    logPolicy({
      logger: logger.info,
      allowedHeaderNames: StorageDataLakeLoggingAllowedHeaderNames,
      allowedQueryParameters: StorageDataLakeLoggingAllowedQueryParameters
    })
  ];

  if (isNode) {
    // policies only available in Node.js runtime, not in browsers
    factories.push(proxyPolicy(pipelineOptions.proxyOptions));
    factories.push(disableResponseDecompressionPolicy());
  }
  factories.push(
    isTokenCredential(credential)
      ? attachCredential(
          bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes),
          credential
        )
      : credential
  );

  return new Pipeline(factories, pipelineOptions);
}

/**
 * Attach a TokenCredential to an object.
 *
 * @export
 * @param {T} thing
 * @param {TokenCredential} credential
 * @returns {T}
 */
function attachCredential<T>(thing: T, credential: TokenCredential): T {
  (thing as any).credential = credential;
  return thing;
}
