// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { TokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenChallengeAuthenticationPolicy
} from "@azure/core-rest-pipeline";
import { OperationOptions } from "@azure/core-client";

import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import { ContainerRegistryClientOptions, DeleteRepositoryResult } from "./model";
import { extractNextLink } from "./utils";
import { ChallengeHandler } from "./containerRegistryChallengeHandler";
import { ContainerRepositoryClient, DeleteRepositoryOptions } from "./containerRepositoryClient";

/**
 * Options for the `listRepositories` method of `ContainerRegistryClient`.
 */
export interface ListRepositoriesOptions extends OperationOptions {}

/**
 * The client class used to interact with the Container Registry service.
 */
export class ContainerRegistryClient {
  /**
   * The Azure Container Registry endpoint.
   */
  public endpoint: string;
  private credential: TokenCredential;
  private clientOptions: ContainerRegistryClientOptions;
  private client: GeneratedClient;
  private authClient: GeneratedClient;

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
    credential: TokenCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    this.endpoint = endpointUrl;
    this.credential = credential;
    this.clientOptions = options;
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

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        // This array contains header names we want to log that are not already
        // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
        additionalAllowedHeaderNames: ["x-ms-correlation-request-id"],
        additionalAllowedQueryParameters: ["last", "n"]
      }
    };

    this.authClient = new GeneratedClient(endpointUrl, internalPipelineOptions);
    this.client = new GeneratedClient(endpointUrl, internalPipelineOptions);
    this.client.pipeline.addPolicy(
      bearerTokenChallengeAuthenticationPolicy({
        credential,
        scopes: [`https://management.core.windows.net/.default`],
        challengeCallbacks: new ChallengeHandler(this.authClient)
      })
    );
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
  ): Promise<DeleteRepositoryResult> {
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

  /**
   * Returns a ContainerRepositoryClient instance for the given repository.
   *
   * @param name - the name of repository to delete
   * @param options - optional configuration for the operation
   */
  // The method name follows beta.1 API design
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients
  public getRepositoryClient(repository: string): ContainerRepositoryClient {
    return new ContainerRepositoryClient(
      this.endpoint,
      repository,
      this.credential,
      this.clientOptions
    );
  }

  /**
   * Iterates repositories.
   *
   * Example usage:
   * ```ts
   * let client = new ContainerRegistryClient(url, credentials);
   * for await (const repository of client.listRepositories()) {
   *   console.log("repository name: ", repository);
   * }
   * ```
   * @param options -
   */
  public listRepositories(
    options: ListRepositoriesOptions = {}
  ): PagedAsyncIterableIterator<string, string[]> {
    const { span, updatedOptions } = createSpan("listRepositories", options);
    const iter = this.listRepositoryItems(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listRepositoriesPage(settings, updatedOptions)
    };
  }

  private async *listRepositoryItems(
    options: ListRepositoriesOptions = {}
  ): AsyncIterableIterator<string> {
    for await (const page of this.listRepositoriesPage({}, options)) {
      yield* page;
    }
  }

  private async *listRepositoriesPage(
    continuationState: PageSettings,
    options: ListRepositoriesOptions = {}
  ): AsyncIterableIterator<string[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize
      };
      const currentPage = await this.client.containerRegistry.getRepositories(optionsComplete);
      if (currentPage.repositories) {
        yield currentPage.repositories;
      }
      continuationState.continuationToken = extractNextLink(currentPage.link);
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistry.getRepositoriesNext(
        continuationState.continuationToken,
        options
      );
      if (currentPage.repositories) {
        yield currentPage.repositories;
      }
      continuationState.continuationToken = extractNextLink(currentPage.link);
    }
  }
}
