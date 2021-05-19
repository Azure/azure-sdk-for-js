// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { isTokenCredential, TokenCredential } from "@azure/core-auth";
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
import {
  ContainerRegistryClientOptions,
  DeleteRepositoryResult,
  RepositoryPageResponse
} from "./models";
import { extractNextLink } from "./utils";
import { ChallengeHandler } from "./containerRegistryChallengeHandler";
import {
  ContainerRepository,
  ContainerRepositoryImpl,
  DeleteRepositoryOptions
} from "./containerRepository";
import { RegistryArtifact } from "./registryArtifact";
import { ContainerRegistryRefreshTokenCredential } from "./containerRegistryTokenCredential";

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
  public readonly endpoint: string;

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
   * @param endpoint - the URL to the Container Registry endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: ContainerRegistryClientOptions
  );

  /**
   * Creates an instance of a ContainerRegistryClient to interact with
   * an Azure Container Registry that has anonymous pull access enabled.
   *
   * Example usage:
   * ```ts
   * import { ContainerRegistryClient } from "@azure/container-registry";
   *
   * const client = new ContainerRegistryClient(
   *    "<container registry API endpoint>",
   * );
   * ```
   * @param endpoint - the URL to the Container Registry endpoint
   * @param options - optional configuration used to send requests to the service
   */
  constructor(endpoint: string, options?: ContainerRegistryClientOptions);

  constructor(
    endpoint: string,
    credentialOrOptions?: TokenCredential | ContainerRegistryClientOptions,
    clientOptions: ContainerRegistryClientOptions = {}
  ) {
    this.endpoint = endpoint;

    let credential: TokenCredential | undefined;
    let options: ContainerRegistryClientOptions | undefined;
    if (isTokenCredential(credentialOrOptions)) {
      credential = credentialOrOptions;
      options = clientOptions;
    } else {
      options = credentialOrOptions ?? {};
    }

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
        additionalAllowedQueryParameters: ["last", "n", "orderby", "digest"]
      }
    };

    const authClient = new GeneratedClient(endpoint, internalPipelineOptions);
    this.client = new GeneratedClient(endpoint, internalPipelineOptions);
    this.client.pipeline.addPolicy(
      bearerTokenChallengeAuthenticationPolicy({
        credential,
        scopes: ["https://management.core.windows.net/.default"],
        challengeCallbacks: new ChallengeHandler(
          new ContainerRegistryRefreshTokenCredential(authClient, credential)
        )
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
    return new ContainerRepositoryImpl(this.endpoint, repositoryName, this.client).getArtifact(
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
    return new ContainerRepositoryImpl(this.endpoint, repositoryName, this.client);
  }

  /**
   * Iterates repositories.
   *
   * Example usage:
   * ```ts
   * let client = new ContainerRegistryClient(url, credentials);
   * for await (const repository of client.listRepositoryNames()) {
   *   console.log("repository name: ", repository);
   * }
   * ```
   * @param options -
   */
  public listRepositoryNames(
    options: ListRepositoriesOptions = {}
  ): PagedAsyncIterableIterator<string, RepositoryPageResponse> {
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
  ): AsyncIterableIterator<RepositoryPageResponse> {
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize
      };
      const currentPage = await this.client.containerRegistry.getRepositories(optionsComplete);
      if (currentPage.repositories) {
        const array = currentPage.repositories;
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
      continuationState.continuationToken = extractNextLink(currentPage.link);
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistry.getRepositoriesNext(
        continuationState.continuationToken,
        options
      );
      if (currentPage.repositories) {
        const array = currentPage.repositories;
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
      continuationState.continuationToken = extractNextLink(currentPage.link);
    }
  }
}
