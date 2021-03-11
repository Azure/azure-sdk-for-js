// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import { ContainerRegistryClientOptions, DeletedRepositoryResult } from "./model";
import {
  ContainerRegistryUserCredential,
  createContainerRegistryUserCredentialPolicy
} from "./containerRegistryUserCredentialPolicy";

/**
 * Options for the `deleteRepository` method of `ContainerRegistryClient`.
 */
export interface DeleteRepositoryOptions extends OperationOptions {}

/**
 * The client class used to interact with the Container Registry service.
 */
export class ContainerRegistryClient {
  private client: GeneratedClient;

  /**
   * Creates an instance of a ContainerRegistryClient.
   *
   * Example usage:
   * ```ts
   * import { ContainerRegistryClient } from "@azure/container-registry";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ContainerRegistryClient(
   *    "<container registry API endpoint>",
   *    new DefaultAzureCredential()
   * );
   * ```
   * @param endpointUrl - the URL to the Container Registry endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | ContainerRegistryUserCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-container-registry/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    // The AAD scope for an API is usually the baseUri + "/.default", but it
    // may be different for your service.
    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, `${endpointUrl}/.default`)
      : createContainerRegistryUserCredentialPolicy(credential);
    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        // This array contains header names we want to log that are not already
        // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
        allowedHeaderNames: ["x-ms-correlation-request-id"]
      }
    };
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient(endpointUrl, pipeline);
  }

  /**
   * Deletes the repository identified by the given name.
   *
   * @param name - the name of repository to delete
   * @param options - optional configuration for the operation
   */
  public async deleteRepository(
    name: string,
    options: DeleteRepositoryOptions = {}
  ): Promise<DeletedRepositoryResult> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryClient-deleteRepository",
      options
    );

    try {
      const result = await this.client.containerRegistry.deleteRepository(name, updatedOptions);
      return result;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }
}
