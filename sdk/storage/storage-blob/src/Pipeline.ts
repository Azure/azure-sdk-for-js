// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CompatResponse as HttpOperationResponse,
  RequestPolicy as IHttpClient,
  HttpHeadersLike as HttpHeaders,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  WebResourceLike as WebResource,
  KeepAliveOptions,
  ExtendedServiceClientOptions,
} from "@azure/core-http-compat";
import {
  RequestBodyType as HttpRequestBody,
  ProxySettings as ProxyOptions,
  UserAgentPolicyOptions as UserAgentOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline as CorePipeline,
  decompressResponsePolicyName,
} from "@azure/core-rest-pipeline";
import { authorizeRequestOnTenantChallenge, createClientPipeline } from "@azure/core-client";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

import { logger } from "./log";
import { StorageRetryOptions } from "./StorageRetryPolicyFactory";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  StorageOAuthScopes,
  StorageBlobLoggingAllowedHeaderNames,
  StorageBlobLoggingAllowedQueryParameters,
  SDK_VERSION,
} from "./utils/constants";
import { getCachedDefaultHttpClient } from "./utils/cache";
import { storageBrowserPolicy } from "./policies/StorageBrowserPolicyV2";
import { storageRetryPolicy } from "./policies/StorageRetryPolicyV2";
import { storageSharedKeyCredentialPolicy } from "./policies/StorageSharedKeyCredentialPolicyV2";
import { pathParameterWorkaroundPolicy } from "./policies/PathParameterWorkaroundPolicy";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  StorageOAuthScopes,
  IHttpClient,
  HttpHeaders,
  HttpRequestBody,
  HttpOperationResponse,
  WebResource,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
};

/**
 * A subset of @azure/core-http's ServiceClientOptions
 */
export interface ServiceClientOptions {
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   */
  httpClient?: IHttpClient;
  /**
   * Optional. Overrides the default policy factories.
   */
  requestPolicyFactories?: RequestPolicyFactory[];
}

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
 * An interface for the {@link Pipeline} class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export interface PipelineLike {
  /**
   * A list of chained request policy factories.
   */
  readonly factories: RequestPolicyFactory[];
  /**
   * Configures pipeline logger and HTTP client.
   */
  readonly options: PipelineOptions;
  /**
   * Transfer Pipeline object to ServiceClientOptions object which is required by
   * ServiceClient constructor.
   *
   * @returns The ServiceClientOptions object from this Pipeline.
   */
  toServiceClientOptions(): ServiceClientOptions;
}

/**
 * A helper to decide if a given argument satisfies the Pipeline contract
 * @param pipeline - An argument that may be a Pipeline
 * @returns true when the argument satisfies the Pipeline contract
 */
export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike {
  if (!pipeline || typeof pipeline !== "object") {
    return false;
  }

  const castPipeline = pipeline as PipelineLike;

  return (
    Array.isArray(castPipeline.factories) &&
    typeof castPipeline.options === "object" &&
    typeof castPipeline.toServiceClientOptions === "function"
  );
}

/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export class Pipeline implements PipelineLike {
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
    this.options = options;
  }

  /**
   * Transfer Pipeline object to ServiceClientOptions object which is required by
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
 * Options interface for the {@link newPipeline} function.
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
  /**
   * The audience used to retrieve an AAD token.
   */
  audience?: string | string[];
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export function newPipeline(
  credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
): Pipeline {
  if (!credential) {
    credential = new AnonymousCredential();
  }
  const pipeline = new Pipeline([], pipelineOptions);
  (pipeline as any)._credential = credential;
  return pipeline;
}

export function getCoreClientOptions(pipeline: PipelineLike): ExtendedServiceClientOptions {
  const { httpClient, ...restOptions } = pipeline.options as StoragePipelineOptions;
  // TODO: handle if this pipeline came from another package
  // TODO: wrap httpClient in adapter

  const packageDetails = `azsdk-js-azure-storage-blob/${SDK_VERSION}`;
  const userAgentPrefix =
    restOptions.userAgentOptions && restOptions.userAgentOptions.userAgentPrefix
      ? `${restOptions.userAgentOptions.userAgentPrefix} ${packageDetails}`
      : `${packageDetails}`;

  let corePipeline: CorePipeline = (pipeline as any)._corePipeline;
  if (!corePipeline) {
    corePipeline = createClientPipeline({
      ...restOptions,
      loggingOptions: {
        additionalAllowedHeaderNames: StorageBlobLoggingAllowedHeaderNames,
        additionalAllowedQueryParameters: StorageBlobLoggingAllowedQueryParameters,
        logger: logger.info,
      },
      userAgentOptions: {
        userAgentPrefix,
      },
      serializationOptions: {
        stringifyXML,
        serializerOptions: {
          xml: {
            // Use customized XML char key of "#" so we can deserialize metadata
            // with "_" key
            xmlCharKey: "#",
          },
        },
      },
      deserializationOptions: {
        parseXML,
        serializerOptions: {
          xml: {
            // Use customized XML char key of "#" so we can deserialize metadata
            // with "_" key
            xmlCharKey: "#",
          },
        },
      },
    });
    corePipeline.removePolicy({ phase: "Retry" });
    corePipeline.removePolicy({ name: decompressResponsePolicyName });
    corePipeline.addPolicy(pathParameterWorkaroundPolicy());
    corePipeline.addPolicy(storageRetryPolicy(restOptions.retryOptions), { phase: "Retry" });
    corePipeline.addPolicy(storageBrowserPolicy());
    const credential = getCredentialFromPipeline(pipeline);
    if (isTokenCredential(credential)) {
      corePipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: restOptions.audience ?? StorageOAuthScopes,
          challengeCallbacks: { authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge },
        }),
        { phase: "Sign" }
      );
    } else if (credential instanceof StorageSharedKeyCredential) {
      corePipeline.addPolicy(
        storageSharedKeyCredentialPolicy({
          accountName: credential.accountName,
          accountKey: (credential as any).accountKey,
        }),
        { phase: "Sign" }
      );
    }
    (pipeline as any)._corePipeline = corePipeline;
  }
  return {
    ...restOptions,
    httpClient: getCachedDefaultHttpClient(),
    pipeline: corePipeline,
  };
}

export function getCredentialFromPipeline(
  pipeline: PipelineLike
): StorageSharedKeyCredential | AnonymousCredential | TokenCredential {
  // see if we squirreled one away on the type itself
  if ((pipeline as any)._credential) {
    return (pipeline as any)._credential;
  }
  // if it came from another package, loop over the factories and look for one like before
  let credential = new AnonymousCredential();
  for (const factory of pipeline.factories) {
    if (isTokenCredential((factory as any).credential)) {
      // Only works if the factory has been attached a "credential" property.
      // We do that in newPipeline() when using TokenCredential.
      credential = (factory as any).credential;
    }
  }
  return credential;
}
