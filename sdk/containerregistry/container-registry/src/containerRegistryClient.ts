// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  PipelineOptions
} from "@azure/core-rest-pipeline";
import { OperationOptions } from "@azure/core-client";

import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { logger } from "./logger";
import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import { RepositoryPageResponse } from "./models";
import { extractNextLink } from "./utils/helpers";
import { ChallengeHandler } from "./containerRegistryChallengeHandler";
import {
  ContainerRepository,
  ContainerRepositoryImpl,
  DeleteRepositoryOptions
} from "./containerRepository";
import { RegistryArtifact } from "./registryArtifact";
import { ContainerRegistryRefreshTokenCredential } from "./containerRegistryTokenCredential";

const LATEST_API_VERSION = "2021-07-01";

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  /**
   * Gets or sets the audience to use for authentication with Azure Active Directory.
   * The authentication scope will be set from this audience.
   * See {@link KnownContainerRegistryAudience} for known audience values.
   */
  audience?: string;
  /**
   * The version of service API to make calls against.
   */
  serviceVersion?: "2021-07-01";
}

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
   * @param endpoint - the URL endpoint of the container registry
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
   * Only operations that support anonymous access are enabled. Other service
   * methods will throw errors.
   *
   * Example usage:
   * ```ts
   * import { ContainerRegistryClient } from "@azure/container-registry";
   *
   * const client = new ContainerRegistryClient(
   *    "<container registry API endpoint>",
   * );
   * ```
   * @param endpoint - the URL endpoint of the container registry
   * @param options - optional configuration used to send requests to the service
   */
  constructor(endpoint: string, options?: ContainerRegistryClientOptions);

  constructor(
    endpoint: string,
    credentialOrOptions?: TokenCredential | ContainerRegistryClientOptions,
    clientOptions: ContainerRegistryClientOptions = {}
  ) {
    if (!endpoint) {
      throw new Error("invalid endpoint");
    }

    this.endpoint = endpoint;

    let credential: TokenCredential | undefined;
    let options: ContainerRegistryClientOptions | undefined;
    if (isTokenCredential(credentialOrOptions)) {
      credential = credentialOrOptions;
      options = clientOptions;
    } else {
      options = credentialOrOptions ?? {};
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
    // Require audience now until we have a default ACR audience from the service.
    if (!options.audience) {
      throw new Error(
        "ContainerRegistryClientOptions.audience must be set to initialize ContainerRegistryClient."
      );
    }

    const defaultScope = `${options.audience}/.default`;
    const serviceVersion = options.serviceVersion ?? LATEST_API_VERSION;
    const authClient = new GeneratedClient(endpoint, serviceVersion, internalPipelineOptions);
    this.client = new GeneratedClient(endpoint, serviceVersion, internalPipelineOptions);
    this.client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: [defaultScope],
        challengeCallbacks: new ChallengeHandler(
          new ContainerRegistryRefreshTokenCredential(authClient, defaultScope, credential)
        )
      })
    );
  }

  /**
   * Deletes the repository identified by the given name and all associated artifacts.
   *
   * @param repositoryName - the name of repository to delete
   * @param options - optional configuration for the operation
   */
  public async deleteRepository(
    repositoryName: string,
    options: DeleteRepositoryOptions = {}
  ): Promise<void> {
    if (!repositoryName) {
      throw new Error("invalid repositoryName");
    }

    const { span, updatedOptions } = createSpan(
      "ContainerRegistryClient-deleteRepository",
      options
    );

    try {
      await this.client.containerRegistry.deleteRepository(repositoryName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an instance of {@link RegistryArtifact} for calling service methods related to the artifact specified by `repositoryName` and `tagOrDigest`.
   *
   * @param repositoryName - the name of repository
   * @param tagOrDigest - tag or digest of the artifact to retrieve
   */
  public getArtifact(repositoryName: string, tagOrDigest: string): RegistryArtifact {
    if (!repositoryName) {
      throw new Error("invalid repositoryName");
    }
    if (!tagOrDigest) {
      throw new Error("invalid tagOrDigest");
    }

    return new ContainerRepositoryImpl(this.endpoint, repositoryName, this.client).getArtifact(
      tagOrDigest
    );
  }

  /**
   * Returns an instance of {@link ContainerRepository} for calling service methods related to the repository specified by `repositoryName`.
   *
   * @param repositoryName - the name of repository
   */
  public getRepository(repositoryName: string): ContainerRepository {
    if (!repositoryName) {
      throw new Error("invalid repositoryName");
    }

    return new ContainerRepositoryImpl(this.endpoint, repositoryName, this.client);
  }

  /**
   * Returns an async iterable iterator to list names of repositories in this registry.
   *
   * Example usage:
   * ```javascript
   * let client = new ContainerRegistryClient(url, credential);
   * for await (const repository of client.listRepositoryNames()) {
   *   console.log("repository name: ", repository);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```javascript
   * let iter = client.listRepositoryNames();
   * let item = await iter.next();
   * while (!item.done) {
   *   console.log(`repository name: ${item.value}`);
   *   item = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```javascript
   * const pages = client.listRepositoryNames().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const name of page.value) {
   *      console.log(`  repository name: ${name}`);
   *    }
   *  }
   *  page = await pages.next();
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
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.repositories) {
        const array = currentPage.repositories;
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistry.getRepositoriesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.repositories) {
        const array = currentPage.repositories;
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
    }
  }
}
