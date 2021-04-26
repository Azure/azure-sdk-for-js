// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { TokenCredential } from "@azure/core-auth";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { URL } from "./url";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import {
  ContainerRegistryClientOptions,
  ContentProperties,
  DeleteRepositoryResult,
  RegistryArtifactOrderBy,
  RegistryArtifactProperties,
  RepositoryProperties,
  TagOrderBy,
  TagProperties
} from "./model";
import { extractNextLink } from "./utils";
import { ChallengeHandler } from "./containerRegistryChallengeHandler";
import { bearerTokenChallengeAuthenticationPolicy } from "./bearerTokenChallengeAuthenticationPolicy";
import { ContainerRegistryRefreshTokenCredential } from "./containerRegistryTokenCredential";

/**
 * Options for the `getProperties` method of `ContainerRepositoryClient`.
 */
export interface GetRepositoryPropertiesOptions extends OperationOptions {}

/**
 * Options for delete repository operation.
 */
export interface DeleteRepositoryOptions extends OperationOptions {}

/**
 * Options for the `deleteRegistryArtifact` method of `ContainerRepositoryClient`.
 */
export interface DeleteRegistryArtifactOptions extends OperationOptions {}

/**
 * Options for the `deleteTag` method of `ContainerRepositoryClient`.
 */
export interface DeleteTagOptions extends OperationOptions {}

/**
 * Options for the `getRegistryArtifactProperties` method of `ContainerRepositoryClient`.
 */
export interface GetRegistryArtifactPropertiesOptions extends OperationOptions {}

/**
 * Options for the `getTagProperties` method of `ContainerRepositoryClient`.
 */
export interface GetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `setManifestProperties` method of `ContainerRepositoryClient`.
 */
export interface SetManifestPropertiesOptions extends OperationOptions {}

/**
 * Options for the `setProperties` method of `ContainerRepositoryClient`.
 */
export interface SetRepositoryPropertiesOptions extends OperationOptions {}
/**
 * Options for the `setTagProperties` method of `ContainerRepositoryClient`.
 */
export interface SetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `listRegistryArtifacts` method of `ContainerRepositoryClient`.
 */
export interface ListRegistryArtifactsOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: RegistryArtifactOrderBy;
}

/**
 * Options for the `listTags` method of `ContainerRepositoryClient`.
 */
export interface ListTagsOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: TagOrderBy;
}

function isDigest(tagOrDigest: string): boolean {
  return tagOrDigest.includes(":");
}

/**
 * The client class used to interact with the Container Registry service.
 */
export class ContainerRepositoryClient {
  private client: GeneratedClient;
  private authClient: GeneratedClient;
  /**
   * The Azure Container Registry endpoint.
   */
  public endpoint: string;
  /**
   * Repository name.
   */
  public repository: string;
  /**
   * Registry name.
   */
  public registry: string;

  /**
   * Creates an instance of a ContainerRepositoryClient.
   *
   * Example usage:
   * ```ts
   * import { ContainerRepositoryClient } from "@azure/container-registry";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ContainerRepositoryClient(
   *    "<container registry API endpoint>",
   *    "<repository name>"
   *    new DefaultAzureCredential()
   * );
   * ```
   * @param endpointUrl - the URL to the Container Registry endpoint
   * @param repository - the URL to the Container Registry endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpointUrl: string,
    repository: string,
    credential: TokenCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    this.endpoint = endpointUrl;
    this.repository = repository;
    const parsedUrl = new URL(endpointUrl);
    this.registry = parsedUrl.hostname;

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
        additionalAllowedQueryParameters: ["last", "n", "orderby", "digest"]
      }
    };

    this.authClient = new GeneratedClient(endpointUrl, internalPipelineOptions);
    this.client = new GeneratedClient(endpointUrl, internalPipelineOptions);
    const authPolicy = bearerTokenChallengeAuthenticationPolicy({
      credential,
      scopes: `https://management.core.windows.net/.default`,
      challengeCallbacks: new ChallengeHandler(
        new ContainerRegistryRefreshTokenCredential(credential, this.authClient)
      )
    });
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Deletes this repository.
   *
   * @param options - optional configuration for the operation
   */
  public async delete(options: DeleteRepositoryOptions = {}): Promise<DeleteRepositoryResult> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-delete", options);

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        this.repository,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a registry artifact in this repository.
   * @param digest - the digest of the artifact to be deleted.
   * @param options -
   */
  public async deleteRegistryArtifact(
    digest: string,
    options: DeleteRegistryArtifactOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-deleteRegistryArtifact",
      options
    );

    try {
      await this.client.containerRegistryRepository.deleteManifest(
        this.repository,
        digest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a tag.
   * @param tag - the name of the tag to be deleted.
   * @param options -
   */
  public async deleteTag(tag: string, options: DeleteTagOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-deleteTag", options);

    try {
      await this.client.containerRegistryRepository.deleteTag(this.repository, tag, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of this repository.
   * @param options -
   */
  public async getProperties(
    options: GetRepositoryPropertiesOptions = {}
  ): Promise<RepositoryProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-getProperties", options);

    try {
      const result = await this.client.containerRegistryRepository.getProperties(
        this.repository,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of a registry artifact.
   * @param tagOrDigest - the tag or digest of the registry artifact.
   * @param options -
   */
  public async getRegistryArtifactProperties(
    tagOrDigest: string,
    options: GetRegistryArtifactPropertiesOptions = {}
  ): Promise<RegistryArtifactProperties> {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-getRegistryArtifactProperties",
      options
    );

    let digest: string = tagOrDigest;
    if (!isDigest(tagOrDigest)) {
      digest = (await this.getTagProperties(tagOrDigest)).digest!; // TODO: (jeremymeng) swagger update to make digest non-optional
    }

    try {
      const result = await this.client.containerRegistryRepository.getRegistryArtifactProperties(
        this.repository,
        digest,
        updatedOptions
      );
      const registryArtifacts = result.references;
      delete result.references;
      return { ...result, registryArtifacts };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of a tag.
   * @param digest - the tag to be deleted.
   * @param options -
   */
  public async getTagProperties(
    tag: string,
    options: GetTagPropertiesOptions = {}
  ): Promise<TagProperties> {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-getTagProperties",
      options
    );
    try {
      const result = await this.client.containerRegistryRepository.getTagProperties(
        this.repository,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates manifest artifact attributes.
   * @param digest - the digest of the manifest.
   * @param options -
   */
  public async setManifestProperties(
    digest: string,
    value: ContentProperties,
    options: SetManifestPropertiesOptions = {}
  ): Promise<RegistryArtifactProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-setManifestProperties", {
      ...options,
      value: value
    });

    try {
      return await this.client.containerRegistryRepository.updateManifestAttributes(
        this.repository,
        digest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates repository attributes.
   * @param options -
   */
  public async setProperties(
    value: ContentProperties,
    options: SetRepositoryPropertiesOptions = {}
  ): Promise<RepositoryProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-setProperties", {
      ...options,
      value: value
    });

    try {
      return await this.client.containerRegistryRepository.setProperties(
        this.repository,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates tag attributes.
   * @param tag - name of the tag
   * @param options -
   */
  public async setTagProperties(
    tag: string,
    value: ContentProperties,
    options: SetTagPropertiesOptions = {}
  ): Promise<TagProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-setTagProperties", {
      ...options,
      value: value
    });

    try {
      return await this.client.containerRegistryRepository.updateTagAttributes(
        this.repository,
        tag,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates artifacts.
   *
   * Example usage:
   * ```ts
   * let client = new ContainerRepositoryClient(url, repository, credentials);
   * for await (const repository of client.listRegistryArtifacts()) {
   *   console.log("artifact: ", artifact);
   * }
   * ```
   * @param options -
   */
  public listRegistryArtifacts(
    options: ListRegistryArtifactsOptions = {}
  ): PagedAsyncIterableIterator<RegistryArtifactProperties> {
    const { span, updatedOptions } = createSpan("listRegistryArtifacts", options);
    const iter = this.listArtifactItems(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listArtifactPage(settings, updatedOptions)
    };
  }

  private async *listArtifactItems(
    options: ListRegistryArtifactsOptions = {}
  ): AsyncIterableIterator<RegistryArtifactProperties> {
    for await (const page of this.listArtifactPage({}, options)) {
      yield* page;
    }
  }

  private async *listArtifactPage(
    continuationState: PageSettings,
    options: ListRegistryArtifactsOptions = {}
  ): AsyncIterableIterator<RegistryArtifactProperties[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize,
        orderby: options.orderBy
      };
      const currentPage = await this.client.containerRegistryRepository.getManifests(
        this.repository,
        optionsComplete
      );
      if (currentPage.link) {
        continuationState.continuationToken = currentPage.link.substr(
          1,
          currentPage.link.indexOf(">") - 1
        );
      } else {
        continuationState.continuationToken = undefined;
      }
      if (currentPage.manifests) {
        yield currentPage.manifests.map((t) => {
          return {
            ...t,
            repository: currentPage.repository!
          };
        });
      }
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistryRepository.getManifestsNext(
        this.repository,
        continuationState.continuationToken,
        options
      );
      if (currentPage.link) {
        continuationState.continuationToken = currentPage.link.substr(
          1,
          currentPage.link.indexOf(">") - 1
        );
      } else {
        continuationState.continuationToken = undefined;
      }
      if (currentPage.manifests) {
        yield currentPage.manifests.map((t) => {
          return {
            ...t,
            repository: currentPage.repository!
          };
        });
      }
    }
  }

  /**
   * Iterates tags.
   *
   * Example usage:
   * ```ts
   * let client = new ContainerRepositoryClient(url, repository, credentials);
   * for await (const repository of client.listTags()) {
   *   console.log("tag: ", tag);
   * }
   * ```
   * @param options -
   */
  public listTags(options: ListTagsOptions = {}): PagedAsyncIterableIterator<TagProperties> {
    const { span, updatedOptions } = createSpan("listTags", options);
    const iter = this.listTagItems(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listTagsPage(settings, updatedOptions)
    };
  }

  private async *listTagItems(options: ListTagsOptions = {}): AsyncIterableIterator<TagProperties> {
    for await (const page of this.listTagsPage({}, options)) {
      yield* page;
    }
  }

  private async *listTagsPage(
    continuationState: PageSettings,
    options: ListTagsOptions = {}
  ): AsyncIterableIterator<TagProperties[]> {
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize,
        orderby: options.orderBy
      };
      const currentPage = await this.client.containerRegistryRepository.getTags(
        this.repository,
        optionsComplete
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.tagAttributeBases) {
        yield currentPage.tagAttributeBases.map((t) => {
          return {
            ...t,
            repository: currentPage.repository
          };
        });
      }
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistryRepository.getTagsNext(
        this.repository,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.tagAttributeBases) {
        yield currentPage.tagAttributeBases.map((t) => {
          return {
            ...t,
            repository: currentPage.repository
          };
        });
      }
    }
  }
}
