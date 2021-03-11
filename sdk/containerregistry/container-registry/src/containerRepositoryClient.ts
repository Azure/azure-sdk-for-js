// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import {
  ContainerRegistryClientOptions,
  ContentProperties,
  DeletedRepositoryResult,
  TagProperties
} from "./model";
import {
  ContainerRegistryUserCredential,
  createContainerRegistryUserCredentialPolicy
} from "./containerRegistryUserCredentialPolicy";

/**
 * Options for the `getProperties` method of `ContainerRepositoryClient`.
 */
export interface GetPropertiesOptions extends OperationOptions {}

/**
 * Options for the `delete` method of `ContainerRepositoryClient`.
 */
export interface DeleteOptions extends OperationOptions {}

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
 * Options for the `SetTagProperties` method of `ContainerRepositoryClient`.
 */
export interface SetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `SetTagProperties` method of `ContainerRepositoryClient`.
 */
export interface ListTagsOptions extends OperationOptions {
  /** orderby query parameter */
  orderby?: string;
  /** filter by digest */
  digest?: string;
}

/**
 * The client class used to interact with the Container Registry service.
 */
export class ContainerRepositoryClient {
  private client: GeneratedClient;
  public repository: string;
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
    credential: TokenCredential | ContainerRegistryUserCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-container-registry/${SDK_VERSION}`;
    this.repository = repository;
    this.registry = ""; //TODO: (jeremymeng) implement
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
        allowedHeaderNames: ["x-ms-correlation-request-id"],
        allowedQueryParameters: ["last", "n"]
      }
    };
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient(endpointUrl, pipeline);
  }

  /**
   * Deletes this repository.
   *
   * @param options - optional configuration for the operation
   */
  public async delete(options: DeleteOptions = {}): Promise<DeletedRepositoryResult> {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-delete", options);

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        this.repository,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
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
  public async deleteRegistryArtifact(digest: string, options: DeleteRegistryArtifactOptions = {}) {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-deleteRegistryArtifact",
      options
    );

    try {
      const result = await this.client.containerRegistryRepository.deleteManifest(
        this.repository,
        digest,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
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
  public async deleteTag(tag: string, options: DeleteTagOptions = {}) {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-deleteTag", options);

    try {
      const result = await this.client.containerRegistryRepository.deleteTag(
        this.repository,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of this repository.
   * @param options -
   */
  public async getProperties(options: GetPropertiesOptions = {}) {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-getProperties", options);

    try {
      const result = await this.client.containerRegistry.getRepositoryAttributes(
        this.repository,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
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
  ) {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-getRegistryArtifactProperties",
      options
    );

    try {
      const result = await this.client.containerRegistryRepository.getManifestAttributes(
        this.repository,
        tagOrDigest,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
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
  public async getTagProperties(tag: string, options: GetTagPropertiesOptions = {}) {
    const { span, updatedOptions } = createSpan(
      "ContainerRepositoryClient-getTagProperties",
      options
    );
    try {
      const result = await this.client.containerRegistryRepository.getTagAttributes(
        this.repository,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets properties of a manifest.
   * @param digest - the digest of the manifest.
   * @param options -
   */
  public async setManifestProperties(
    digest: string,
    value: ContentProperties,
    options: SetManifestPropertiesOptions = {}
  ) {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-setManifestProperties", {
      ...options,
      value: value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.repository,
        digest,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }
  /**
   * Sets properties of a tag.
   * @param tag - name of the tag
   * @param options -
   */
  public async setTagProperties(
    tag: string,
    value: ContentProperties = {},
    options: SetTagPropertiesOptions = {}
  ) {
    const { span, updatedOptions } = createSpan("ContainerRepositoryClient-setTagProperties", {
      ...options,
      value: value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.repository,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
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

  private async *listTagsPage(continuationState: PageSettings, options: ListTagsOptions = {}) {
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        n: continuationState.maxPageSize,
        ...options
      };
      const currentPage = await this.client.containerRegistryRepository.getTags(
        this.repository,
        optionsComplete
      );
      if (currentPage.tags?.length) {
        continuationState.continuationToken = currentPage.tags[currentPage.tags.length - 1].name;
      }
      if (currentPage.tags) {
        yield currentPage.tags.map((t) => {
          return {
            ...t,
            registry: this.registry,
            repository: this.repository
          };
        });
      }
      while (continuationState.continuationToken) {
        const currentPage = await this.client.containerRegistryRepository.getTags(this.repository, {
          n: continuationState.maxPageSize,
          last: continuationState.continuationToken,
          ...optionsComplete
        });
        if (currentPage.tags?.length) {
          continuationState.continuationToken = currentPage.tags[currentPage.tags.length - 1].name;
        } else {
          continuationState.continuationToken = undefined;
        }
        if (currentPage.tags) {
          yield currentPage.tags.map((t) => {
            return {
              ...t,
              registry: this.registry,
              repository: this.repository
            };
          });
        }
      }
    }
  }
}
