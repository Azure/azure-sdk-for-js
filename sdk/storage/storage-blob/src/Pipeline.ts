// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  isNode,
  bearerTokenAuthenticationPolicy,
  decompressResponsePolicy,
  HttpsClient as IHttpClient,
  logPolicy,
  proxyPolicy,
  RequestBodyType,
  setClientRequestIdPolicy,
  tracingPolicy,
  userAgentPolicy,
  UserAgentPolicyOptions,
  Pipeline as CorePipeline,
  createEmptyPipeline,
  ProxySettings as ProxyOptions,
  HttpHeaders,
  PipelineResponse
} from "@azure/core-https";
import {
  deserializationPolicy,
  serializationPolicy,
  ServiceClientOptions
} from "@azure/core-client";
import { stringifyXML, parseXML } from "@azure/core-xml";
import { logger } from "./log";
import { StorageRetryOptions } from "./policies/StorageRetryPolicy";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  StorageOAuthScopes,
  StorageBlobLoggingAllowedHeaderNames,
  StorageBlobLoggingAllowedQueryParameters
} from "./utils/constants";
import { getCachedDefaultHttpClient } from "./utils/cache";
import { storageBrowserPolicy } from "./policies/StorageBrowserPolicy";
import { storageRetryPolicy } from "./policies/StorageRetryPolicy";
import { attachCredential } from "./utils/utils.common";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  StorageOAuthScopes,
  deserializationPolicy,
  RequestBodyType,
  IHttpClient,
  HttpHeaders,
  PipelineResponse
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
export class Pipeline {
  /**
   * A list of chained request policy factories.
   *
   * @type {RequestPolicyFactory[]}
   * @memberof Pipeline
   */
  public readonly factories: CorePipeline;
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
  constructor(factories: CorePipeline, options: PipelineOptions = {}) {
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
      httpsClient: this.options.httpClient,
      pipeline: this.factories
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
  userAgentOptions?: UserAgentPolicyOptions;
  /**
   * Configures the built-in retry policy behavior.
   *
   * @type {StorageRetryOptions}
   * @memberof StoragePipelineOptions
   */
  retryOptions?: StorageRetryOptions;

  /**
   * Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof StoragePipelineOptions
   */
  httpClient?: IHttpClient;

  keepAliveOptions?: {
    enable: boolean;
  };
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

  const factories: CorePipeline = createEmptyPipeline();

  if (isNode) {
    factories.addPolicy(proxyPolicy(pipelineOptions.proxyOptions));
    factories.addPolicy(decompressResponsePolicy());
  }

  factories.addPolicy(tracingPolicy(pipelineOptions.userAgentOptions));
  factories.addPolicy(userAgentPolicy(pipelineOptions.userAgentOptions));
  factories.addPolicy(setClientRequestIdPolicy());
  factories.addPolicy(
    logPolicy({
      logger: logger.info,
      additionalAllowedHeaderNames: StorageBlobLoggingAllowedHeaderNames,
      additionalAllowedQueryParameters: StorageBlobLoggingAllowedQueryParameters
    }),
    { afterPhase: "Retry" }
  );

  // Default deserializationPolicy is provided by protocol layer
  // Use customized XML char key of "#" so we could deserialize metadata
  // with "_" key
  factories.addPolicy(
    serializationPolicy({ stringifyXML, serializerOptions: { xml: { xmlCharKey: "#" } } }),
    {
      phase: "Serialize"
    }
  );
  factories.addPolicy(
    deserializationPolicy({ parseXML, serializerOptions: { xml: { xmlCharKey: "#" } } }),
    {
      phase: "Deserialize"
    }
  );

  factories.addPolicy(storageBrowserPolicy());
  factories.addPolicy(storageRetryPolicy(pipelineOptions.retryOptions));

  if (isTokenCredential(credential)) {
    factories.addPolicy(
      attachCredential(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: typeof StorageOAuthScopes === "string" ? [StorageOAuthScopes] : StorageOAuthScopes
        }),
        credential
      )
    );
  } else {
    factories.addPolicy(credential);
  }

  return new Pipeline(factories, pipelineOptions);
}
