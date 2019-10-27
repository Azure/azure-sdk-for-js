// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  HttpClient as IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpPipelineLogger as IHttpPipelineLogger,
  HttpPipelineLogLevel,
  HttpRequestBody,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  ServiceClientOptions,
  WebResource,
  proxyPolicy,
  getDefaultProxySettings,
  isNode,
  TokenCredential,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  ProxySettings,
  tracingPolicy,
  logPolicy
} from "@azure/core-http";

import { logger } from "./log";
import { KeepAliveOptions, KeepAlivePolicyFactory } from "./KeepAlivePolicyFactory";
import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { RetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryOptions, TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
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
  IHttpPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
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
   * Optional. Configures the HTTP pipeline logger.
   *
   * @type {IHttpPipelineLogger}
   * @memberof PipelineOptions
   */
  logger?: IHttpPipelineLogger;
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof PipelineOptions
   */
  HttpClient?: IHttpClient;
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
      httpClient: this.options.HttpClient,
      httpPipelineLogger: this.options.logger,
      requestPolicyFactories: this.factories
    };
  }
}

/**
 * Option interface for newPipeline() method.
 *
 * @export
 * @interface NewPipelineOptions
 */
export interface NewPipelineOptions {
  proxy?: ProxySettings | string;
  /**
   * Telemetry configures the built-in telemetry policy behavior.
   *
   * @type {TelemetryOptions}
   * @memberof NewPipelineOptions
   */
  telemetry?: TelemetryOptions;
  /**
   * Configures the built-in retry policy behavior.
   *
   * @type {RetryOptions}
   * @memberof NewPipelineOptions
   */
  retryOptions?: RetryOptions;

  /**
   * Keep alive configurations. Default keep-alive is enabled.
   *
   * @type {KeepAliveOptions}
   * @memberof NewPipelineOptions
   */
  keepAliveOptions?: KeepAliveOptions;

  /**
   * Configures the HTTP pipeline logger.
   *
   * @type {IHttpPipelineLogger}
   * @memberof NewPipelineOptions
   */
  logger?: IHttpPipelineLogger;
  /**
   * Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof NewPipelineOptions
   */
  httpClient?: IHttpClient;
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @static
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity. If not specified,
 *                                                  AnonymousCredential is used.
 * @param {NewPipelineOptions} [pipelineOptions] Options.
 * @returns {Pipeline} A new Pipeline object.
 * @memberof Pipeline
 */
export function newPipeline(
  credential: SharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: NewPipelineOptions = {}
): Pipeline {
  // Order is important. Closer to the API at the top & closer to the network at the bottom.
  // The credential's policy factory must appear close to the wire so it can sign any
  // changes made by other factories (like UniqueRequestIDPolicyFactory)
  const factories: RequestPolicyFactory[] = [
    tracingPolicy(),
    new KeepAlivePolicyFactory(pipelineOptions.keepAliveOptions),
    new TelemetryPolicyFactory(pipelineOptions.telemetry),
    new UniqueRequestIDPolicyFactory(),
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
    let proxySettings: ProxySettings | undefined;
    if (typeof pipelineOptions.proxy === "string" || !pipelineOptions.proxy) {
      proxySettings = getDefaultProxySettings(pipelineOptions.proxy);
    } else {
      proxySettings = pipelineOptions.proxy;
    }
    factories.push(proxyPolicy(proxySettings));
  }
  factories.push(
    isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, StorageOAuthScopes)
      : credential
  );

  return new Pipeline(factories, {
    HttpClient: pipelineOptions.httpClient,
    logger: pipelineOptions.logger
  });
}
