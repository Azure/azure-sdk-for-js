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
import {
  ContainerRepository,
  ContainerRepositoryImpl,
  DeleteRepositoryOptions
} from "./containerRepository";
import { URL } from "./url";
import { RegistryArtifact } from "./registryArtifact";

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
  public readonly registryUrl: string;

  /** The login server of the registry */
  public readonly loginServer: string;

  /** The name of the registry */
  public readonly name: string;

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
    credential: TokenCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    this.registryUrl = endpointUrl;
    const parsedUrl = new URL(endpointUrl);
    this.loginServer = parsedUrl.hostname;
    this.name = parsedUrl.pathname;

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

    const authClient = new GeneratedClient(endpointUrl, internalPipelineOptions);
    this.client = new GeneratedClient(endpointUrl, internalPipelineOptions);
    this.client.pipeline.addPolicy(
      bearerTokenChallengeAuthenticationPolicy({
        credential,
        scopes: [`https://management.core.windows.net/.default`],
        challengeCallbacks: new ChallengeHandler(authClient)
      })
    );
  }

  /**
   * Deletes the repository identified by the given name.
   *
   * @param repositoryName - the name of repository to delete
   * @param options - optional configuration for the operation
   */
  public async deleteRepository(
    repositoryName: string,
    options: DeleteRepositoryOptions = {}
  ): Promise<DeleteRepositoryResult> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryClient-deleteRepository",
      options
    );

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        repositoryName,
        updatedOptions
      );
      return {
        deletedManifests: result.deletedManifests ?? [],
        deletedTags: result.deletedTags ?? []
      };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an artifact for given repository name, and a tag or digest.
   *
   * @param repositoryName - the name of repository
   * @param tagOrDigest - tag or digest of the artifact to retrieve
   */
  public getArtifact(repositoryName: string, tagOrDigest: string): RegistryArtifact {
    return new ContainerRepositoryImpl(this.registryUrl, repositoryName, this.client).getArtifact(
      tagOrDigest
    );
  }

  /**
   * Returns a ContainerRepositoryClient instance for the given repository.
   *
   * @param repositoryName - the name of repository to delete
   * @param options - optional configuration for the operation
   */
  public getRepository(repositoryName: string): ContainerRepository {
    return new ContainerRepositoryImpl(this.registryUrl, repositoryName, this.client);
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
  public listRepositoryNames(
    options: ListRepositoriesOptions = {}
  ): PagedAsyncIterableIterator<string, string[]> {
    const iter = this.listRepositoryItems(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listRepositoriesPage(settings, options)
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
