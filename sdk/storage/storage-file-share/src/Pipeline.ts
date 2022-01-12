// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  disableResponseDecompressionPolicy,
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
  tracingPolicy,
  logPolicy,
  ProxyOptions,
  UserAgentOptions,
  KeepAliveOptions,
  keepAlivePolicy,
  generateClientRequestIdPolicy,
} from "@azure/core-http";

import { logger } from "./log";
import { StorageBrowserPolicyFactory } from "./StorageBrowserPolicyFactory";
import { Credential } from "./credentials/Credential";
import { StorageRetryOptions, StorageRetryPolicyFactory } from "./StorageRetryPolicyFactory";
import { TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import {
  StorageFileLoggingAllowedHeaderNames,
  StorageFileLoggingAllowedQueryParameters,
} from "./utils/constants";
import { getCachedDefaultHttpClient } from "./utils/cache";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  deserializationPolicy,
  IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpRequestBody,
  WebResource,
  BaseRequestPolicy,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
};

/**
 * Option interface for Pipeline constructor.
 */
export interface PipelineOptions {
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   */
  httpClient?: IHttpClient;
}

/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies as reference before
 * implementing your customized Pipeline.
 */
export class Pipeline {
  /**
   * A list of chained request policy factories.
   */
  public readonly factories: RequestPolicyFactory[];
  /**
   * Configures pipeline logger and HTTP client.
   */
  public readonly options: PipelineOptions;

  /**
   * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
   *
   * @param factories -
   * @param options -
   */
  constructor(factories: RequestPolicyFactory[], options: PipelineOptions = {}) {
    this.factories = factories;
    // when options.httpClient is not specified, passing in a DefaultHttpClient instance to
    // avoid each client creating its own http client.
    this.options = {
      ...options,
      httpClient: options.httpClient || getCachedDefaultHttpClient(),
    };
  }

  /**
   * Transfer Pipeline object to ServiceClientOptions object which required by
   * ServiceClient constructor.
   *
   * @returns The ServiceClientOptions object from this Pipeline.
   */
  public toServiceClientOptions(): ServiceClientOptions {
    return {
      httpClient: this.options.httpClient,
      requestPolicyFactories: this.factories,
    };
  }
}

/**
 * Option interface for {@link newPipeline} function.
 */
export interface StoragePipelineOptions {
  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxyOptions;
  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentOptions;
  /**
   * Configures the built-in retry policy behavior.
   */
  retryOptions?: StorageRetryOptions;
  /**
   * Keep alive configurations. Default keep-alive is enabled.
   */
  keepAliveOptions?: KeepAliveOptions;
  /**
   * Configures the HTTP client to send requests and receive responses.
   */
  httpClient?: IHttpClient;
}

/**
 * Creates a new {@link Pipeline} object with {@link Credential} provided.
 *
 * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export function newPipeline(
  credential?: Credential,
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
      allowedHeaderNames: StorageFileLoggingAllowedHeaderNames,
      allowedQueryParameters: StorageFileLoggingAllowedQueryParameters,
    }),
  ];

  if (isNode) {
    // policies only available in Node.js runtime, not in browsers
    factories.push(proxyPolicy(pipelineOptions.proxyOptions));
    factories.push(disableResponseDecompressionPolicy());
  }
  factories.push(credential);

  return new Pipeline(factories, pipelineOptions);
}
