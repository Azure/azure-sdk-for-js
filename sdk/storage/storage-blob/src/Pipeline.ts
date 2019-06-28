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
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { Credential } from "./credentials/Credential";
import { LoggingPolicyFactory } from "./LoggingPolicyFactory";
import { RetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryOptions, TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  BaseRequestPolicy,
  deserializationPolicy,
  IHttpClient,
  IHttpPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
  HttpRequestBody,
  HttpOperationResponse,
  WebResource,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
};

/**
 * Interface of proxy policy options.
 *
 * @example
 * // Use SharedKeyCredential with storage account and account key
 * // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
 * const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
 * const blobServiceClient = new BlobServiceClient(
 *  `https://${account}.blob.core.windows.net`,
 *  sharedKeyCredential,
 *  {
 *    proxy: { url: "http://localhost:3128" }
 *  });
 *
 * @export
 * @interface ProxyOptions
 */

export interface ProxyOptions {
  url?: string;
}
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
  HTTPClient?: IHttpClient;
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
 * Option interface for newPipeline() method.
 *
 * @export
 * @interface NewPipelineOptions
 */
export interface NewPipelineOptions {
  proxy?: ProxyOptions;
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
 * @export
 * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
 *                                                  or a TokenCredential from @azure/identity.
 * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 */
export function newPipeline(
  credential: Credential | TokenCredential,
  pipelineOptions: NewPipelineOptions = {}
): Pipeline {
  // Order is important. Closer to the API at the top & closer to the network at the bottom.
  // The credential's policy factory must appear close to the wire so it can sign any
  // changes made by other factories (like UniqueRequestIDPolicyFactory)
  const factories: RequestPolicyFactory[] = [
    new TelemetryPolicyFactory(pipelineOptions.telemetry),
    new UniqueRequestIDPolicyFactory(),
    new BrowserPolicyFactory(),
    deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
    new RetryPolicyFactory(pipelineOptions.retryOptions),
    new LoggingPolicyFactory()
  ];

  if (isNode) {
    // ProxyPolicy is only avaiable in Node.js runtime, not in browsers
    factories.push(
      proxyPolicy(
        getDefaultProxySettings(pipelineOptions.proxy ? pipelineOptions.proxy.url : undefined)
      )
    );
  }
  factories.push(
    isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, "https://storage.azure.com/.default")
      : credential
  );

  return new Pipeline(factories, {
    HTTPClient: pipelineOptions.httpClient,
    logger: pipelineOptions.logger
  });
}
