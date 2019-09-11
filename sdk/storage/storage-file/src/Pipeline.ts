// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  HttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpPipelineLogger,
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
  ProxySettings
} from "@azure/core-http";
import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { Credential } from "./credentials/Credential";
import { LoggingPolicyFactory } from "./LoggingPolicyFactory";
import { RetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryOptions, TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";
import { KeepAlivePolicyFactory, KeepAliveOptions } from "./KeepAlivePolicyFactory";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  deserializationPolicy,
  HttpClient,
  HttpPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
  HttpOperationResponse,
  HttpRequestBody,
  WebResource,
  BaseRequestPolicy,
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
   * @type {HttpPipelineLogger}
   * @memberof PipelineOptions
   */
  logger?: HttpPipelineLogger;
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   *
   * @type {HttpClient}
   * @memberof PipelineOptions
   */
  HTTPClient?: HttpClient;
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
   * Transfer Pipeline object to ServiceClientOptions object which required by
   * ServiceClient constructor.
   *
   * @returns {ServiceClientOptions} The ServiceClientOptions object from this Pipeline.
   * @memberof Pipeline
   */
  public toServiceClientOptions(): ServiceClientOptions {
    return {
      httpClient: this.options.HTTPClient,
      httpPipelineLogger: this.options.logger,
      requestPolicyFactories: this.factories
    };
  }
}

/**
 * Option interface for newPipeline() function.
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
   * @type {HttpPipelineLogger}
   * @memberof NewPipelineOptions
   */
  logger?: HttpPipelineLogger;
  /**
   * Configures the HTTP client to send requests and receive responses.
   *
   * @type {HttpClient}
   * @memberof NewPipelineOptions
   */
  httpClient?: HttpClient;
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @static
 * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential.
 * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 * @memberof Pipeline
 */
export function newPipeline(
  credential: Credential,
  pipelineOptions: NewPipelineOptions = {}
): Pipeline {
  // Order is important. Closer to the API at the top & closer to the network at the bottom.
  // The credential's policy factory must appear close to the wire so it can sign any
  // changes made by other factories (like UniqueRequestIDPolicyFactory)
  const factories: RequestPolicyFactory[] = [
    new KeepAlivePolicyFactory(pipelineOptions.keepAliveOptions),
    new TelemetryPolicyFactory(pipelineOptions.telemetry),
    new UniqueRequestIDPolicyFactory(),
    new BrowserPolicyFactory(),
    deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
    new RetryPolicyFactory(pipelineOptions.retryOptions),
    new LoggingPolicyFactory()
  ];

  if (isNode) {
    // ProxyPolicy is only avaiable in Node.js runtime, not in browsers
    let proxySettings: ProxySettings | undefined;
    if (typeof pipelineOptions.proxy === "string") {
      proxySettings = getDefaultProxySettings(pipelineOptions.proxy);
    } else {
      proxySettings = pipelineOptions.proxy;
    }
    factories.push(proxyPolicy(proxySettings));
  }
  factories.push(credential);

  return new Pipeline(factories, {
    HTTPClient: pipelineOptions.httpClient,
    logger: pipelineOptions.logger
  });
}
