// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  HttpClient as IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpRequestBody,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  ServiceClientOptions,
  WebResource,
  proxyPolicy,
  isNode,
  TokenCredential,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  tracingPolicy,
  logPolicy,
  ProxyOptions,
  KeepAliveOptions,
  keepAlivePolicy,
  generateClientRequestIdPolicy,
  UserAgentOptions
} from "@azure/core-http";

import { logger } from "./log";
import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { RetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  StorageOAuthScopes,
  StorageQueueLoggingAllowedHeaderNames,
  StorageQueueLoggingAllowedQueryParameters
} from "./utils/constants";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  BaseRequestPolicy,
  StorageOAuthScopes,
  deserializationPolicy,
  IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpRequestBody,
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
 * You can create a default Pipeline by calling newPipeline().
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 * Refer to newPipeline() and provided policies as reference before
 * implementing your customized Pipeline.
 *
 * @export
 * @class Pipeline
 */
export class Pipeline {
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
    this.factories = factories;
    this.options = options;
  }

  /**
   * Transfers Pipeline object to ServiceClientOptions object which required by
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
 * Option interface for newPipeline() method.
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
   * @type {RetryOptions}
   * @memberof StoragePipelineOptions
   */
  retryOptions?: RetryOptions;

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
 * @static
 * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, StorageSharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity. If not specified,
 *                                                  AnonymousCredential is used.
 * @param {StoragePipelineOptions} [pipelineOptions] Options.
 * @returns {Pipeline} A new Pipeline object.
 * @memberof Pipeline
 */
export function newPipeline(
  credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
): Pipeline {
  // Order is important. Closer to the API at the top & closer to the network at the bottom.
  // The credential's policy factory must appear close to the wire so it can sign any
  // changes made by other factories (like UniqueRequestIDPolicyFactory)
  const factories: RequestPolicyFactory[] = [
    tracingPolicy(),
    keepAlivePolicy(pipelineOptions.keepAliveOptions),
    new TelemetryPolicyFactory(pipelineOptions.userAgentOptions),
    generateClientRequestIdPolicy(),
    new BrowserPolicyFactory(),
    deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
    new RetryPolicyFactory(pipelineOptions.retryOptions),
    logPolicy({
      logger: logger.info,
      allowedHeaderNames: StorageQueueLoggingAllowedHeaderNames,
      allowedQueryParameters: StorageQueueLoggingAllowedQueryParameters
    })
  ];

  if (isNode) {
    // ProxyPolicy is only avaiable in Node.js runtime, not in browsers
    factories.push(proxyPolicy(pipelineOptions.proxyOptions));
  }
  factories.push(
    isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes)
      : credential
  );

  return new Pipeline(factories, {
    httpClient: pipelineOptions.httpClient
  });
}
