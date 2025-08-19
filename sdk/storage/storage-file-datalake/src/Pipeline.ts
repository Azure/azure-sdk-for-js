// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeepAliveOptions,
  ExtendedServiceClientOptions,
  HttpPipelineLogLevel,
} from "@azure/core-http-compat";
import {
  CompatResponse as HttpOperationResponse,
  RequestPolicy as IHttpClient,
  HttpHeadersLike as HttpHeaders,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  WebResourceLike as WebResource,
  convertHttpClient,
  createRequestPolicyFactoryPolicy,
} from "@azure/core-http-compat";
import type {
  ProxySettings as ProxyOptions,
  UserAgentPolicyOptions as UserAgentOptions,
  Pipeline as CorePipeline,
  PipelinePolicy,
  HttpClient,
} from "@azure/core-rest-pipeline";
import {
  RequestBodyType as HttpRequestBody,
  bearerTokenAuthenticationPolicy,
  decompressResponsePolicyName,
} from "@azure/core-rest-pipeline";
import { authorizeRequestOnTenantChallenge, createClientPipeline } from "@azure/core-client";
import { parseXML, stringifyXML } from "@azure/core-xml";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";

import { logger } from "./log.js";
import type { StorageRetryOptions } from "@azure/storage-blob";
import { StorageRetryPolicyFactory } from "@azure/storage-blob";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import { AnonymousCredential } from "@azure/storage-blob";
import {
  StorageOAuthScopes,
  StorageDataLakeLoggingAllowedHeaderNames,
  StorageDataLakeLoggingAllowedQueryParameters,
  SDK_VERSION,
} from "./utils/constants.js";
import {
  getCachedDefaultHttpClient,
  storageRequestFailureDetailsParserPolicy,
} from "@azure/storage-common";
import { storageBrowserPolicy } from "@azure/storage-common";
import { StorageBrowserPolicyFactory } from "@azure/storage-common";
import { storageCorrectContentLengthPolicy } from "@azure/storage-common";
import { storageRetryPolicy } from "@azure/storage-common";
import { storageSharedKeyCredentialPolicy } from "@azure/storage-common";
import {
  ServiceClientOptions,
  PipelineOptions,
  PipelineLike,
  isPipelineLike,
  Pipeline,
} from "@azure/storage-blob";

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
  ServiceClientOptions,
  PipelineOptions,
  PipelineLike,
  Pipeline,
  isPipelineLike,
};

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
   * By default, audience 'https://storage.azure.com/.default' will be used.
   */
  audience?: string;
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
  pipelineOptions: StoragePipelineOptions = {},
): Pipeline {
  if (!credential) {
    credential = new AnonymousCredential();
  }
  const pipeline = new Pipeline([], pipelineOptions);
  (pipeline as any)._credential = credential;
  return pipeline;
}

function processDownlevelPipeline(
  pipeline: PipelineLike,
): { wrappedPolicies: PipelinePolicy; afterRetry: boolean } | undefined {
  const knownFactoryFunctions = [
    isAnonymousCredential,
    isStorageSharedKeyCredential,
    isCoreHttpBearerTokenFactory,
    isStorageBrowserPolicyFactory,
    isStorageRetryPolicyFactory,
    isStorageTelemetryPolicyFactory,
    isCoreHttpPolicyFactory,
  ];
  if (pipeline.factories.length) {
    const novelFactories = pipeline.factories.filter((factory) => {
      return !knownFactoryFunctions.some((knownFactory) => knownFactory(factory));
    });
    if (novelFactories.length) {
      const hasInjector = novelFactories.some((factory) => isInjectorPolicyFactory(factory));
      // if there are any left over, wrap in a requestPolicyFactoryPolicy
      return {
        wrappedPolicies: createRequestPolicyFactoryPolicy(novelFactories),
        afterRetry: hasInjector,
      };
    }
  }
  return undefined;
}

export function getCoreClientOptions(pipeline: PipelineLike): ExtendedServiceClientOptions {
  const { httpClient: v1Client, ...restOptions } = pipeline.options as StoragePipelineOptions;

  let httpClient: HttpClient = (pipeline as any)._coreHttpClient;
  if (!httpClient) {
    httpClient = v1Client ? convertHttpClient(v1Client) : getCachedDefaultHttpClient();
    (pipeline as any)._coreHttpClient = httpClient;
  }

  let corePipeline: CorePipeline = (pipeline as any)._corePipeline;
  if (!corePipeline) {
    const packageDetails = `azsdk-js-azure-storage-blob/${SDK_VERSION}`;
    const userAgentPrefix =
      restOptions.userAgentOptions && restOptions.userAgentOptions.userAgentPrefix
        ? `${restOptions.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;
    corePipeline = createClientPipeline({
      ...restOptions,
      loggingOptions: {
        additionalAllowedHeaderNames: StorageDataLakeLoggingAllowedHeaderNames,
        additionalAllowedQueryParameters: StorageDataLakeLoggingAllowedQueryParameters,
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
    corePipeline.addPolicy(storageCorrectContentLengthPolicy());
    corePipeline.addPolicy(storageRetryPolicy(restOptions.retryOptions), { phase: "Retry" });
    corePipeline.addPolicy(storageRequestFailureDetailsParserPolicy());
    corePipeline.addPolicy(storageBrowserPolicy());
    const downlevelResults = processDownlevelPipeline(pipeline);
    if (downlevelResults) {
      corePipeline.addPolicy(
        downlevelResults.wrappedPolicies,
        downlevelResults.afterRetry ? { afterPhase: "Retry" } : undefined,
      );
    }
    const credential = getCredentialFromPipeline(pipeline);
    if (isTokenCredential(credential)) {
      corePipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: restOptions.audience ?? StorageOAuthScopes,
          challengeCallbacks: { authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge },
        }),
        { phase: "Sign" },
      );
    } else if (credential instanceof StorageSharedKeyCredential) {
      corePipeline.addPolicy(
        storageSharedKeyCredentialPolicy({
          accountName: credential.accountName,
          accountKey: (credential as any).accountKey,
        }),
        { phase: "Sign" },
      );
    }
    (pipeline as any)._corePipeline = corePipeline;
  }
  return {
    ...restOptions,
    allowInsecureConnection: true,
    httpClient,
    pipeline: corePipeline,
  };
}

export function getCredentialFromPipeline(
  pipeline: PipelineLike,
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
    } else if (isStorageSharedKeyCredential(factory)) {
      return factory;
    }
  }
  return credential;
}

function isStorageSharedKeyCredential(
  factory: RequestPolicyFactory,
): factory is StorageSharedKeyCredential {
  if (factory instanceof StorageSharedKeyCredential) {
    return true;
  }
  return factory.constructor.name === "StorageSharedKeyCredential";
}

function isAnonymousCredential(factory: RequestPolicyFactory): factory is AnonymousCredential {
  if (factory instanceof AnonymousCredential) {
    return true;
  }
  return factory.constructor.name === "AnonymousCredential";
}

function isCoreHttpBearerTokenFactory(factory: RequestPolicyFactory): boolean {
  return isTokenCredential((factory as any).credential);
}

function isStorageBrowserPolicyFactory(
  factory: RequestPolicyFactory,
): factory is StorageBrowserPolicyFactory {
  if (factory instanceof StorageBrowserPolicyFactory) {
    return true;
  }
  return factory.constructor.name === "StorageBrowserPolicyFactory";
}

function isStorageRetryPolicyFactory(
  factory: RequestPolicyFactory,
): factory is StorageRetryPolicyFactory {
  if (factory instanceof StorageRetryPolicyFactory) {
    return true;
  }
  return factory.constructor.name === "StorageRetryPolicyFactory";
}

function isStorageTelemetryPolicyFactory(factory: RequestPolicyFactory): boolean {
  return factory.constructor.name === "TelemetryPolicyFactory";
}

function isInjectorPolicyFactory(factory: RequestPolicyFactory): boolean {
  return factory.constructor.name === "InjectorPolicyFactory";
}

function isCoreHttpPolicyFactory(factory: RequestPolicyFactory): boolean {
  const knownPolicies = [
    "GenerateClientRequestIdPolicy",
    "TracingPolicy",
    "LogPolicy",
    "ProxyPolicy",
    "DisableResponseDecompressionPolicy",
    "KeepAlivePolicy",
    "DeserializationPolicy",
  ];

  const mockHttpClient: IHttpClient = {
    sendRequest: async (request: WebResource) => {
      return {
        request,
        headers: request.headers.clone(),
        status: 500,
      };
    },
  };
  const mockRequestPolicyOptions: RequestPolicyOptions = {
    log(_logLevel: HttpPipelineLogLevel, _message: string): void {
      /* do nothing */
    },
    shouldLog(_logLevel: HttpPipelineLogLevel): boolean {
      return false;
    },
  };
  const policyInstance = factory.create(mockHttpClient, mockRequestPolicyOptions);
  const policyName = policyInstance.constructor.name;
  // bundlers sometimes add a custom suffix to the class name to make it unique
  return knownPolicies.some((knownPolicyName) => {
    return policyName.startsWith(knownPolicyName);
  });
}
