// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { URL } from "./url";

import { GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import {
  ContentProperties,
  DeleteRepositoryResult,
  ManifestOrderBy,
  ArtifactManifestProperties,
  RepositoryProperties
} from "./model";
import { RegistryArtifact, RegistryArtifactImpl } from "./registryArtifact";
import { toArtifactManifestProperties, toServiceManifestOrderBy } from "./transformations";
import { extractNextLink } from "./utils";

/**
 * Options for delete repository operation.
 */
export interface DeleteRepositoryOptions extends OperationOptions {}
/**
 * Options for the `listRegistryArtifacts` method of `ContainerRepository`.
 */
export interface ListManifestsOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: ManifestOrderBy;
}
/**
 * Options for the `getProperties` method of `ContainerRepository`.
 */
export interface GetRepositoryPropertiesOptions extends OperationOptions {}
/**
 * Options for the `setProperties` method of `ContainerRepository`.
 */
export type SetRepositoryPropertiesOptions = ContentProperties & OperationOptions;

/**
 * The helper used to interact with the Container Registry service.
 */
export interface ContainerRepository {
  /**
   * The Azure Container Registry endpoint.
   */
  readonly registryUrl: string;
  /**
   * Repository name.
   */
  readonly name: string;
  /**
   * Registry name.
   */
  readonly fullyQualifiedName: string;
  /**
   * Deletes this repository.
   *
   * @param options - optional configuration for the operation
   */
  delete(options?: DeleteRepositoryOptions): Promise<DeleteRepositoryResult>;
  /**
   * Returns an instance of RegistryArtifact.
   * @param tagOrDigest - the tag or digest of the artifact
   */
  getArtifact(tagOrDigest: string): RegistryArtifact;
  /**
   * Retrieves properties of this repository.
   * @param options -
   */
  getProperties(options?: GetRepositoryPropertiesOptions): Promise<RepositoryProperties>;
  /**
   * Updates repository attributes.
   * @param options -
   */
  setProperties(options: SetRepositoryPropertiesOptions): Promise<RepositoryProperties>;
  /**
   * Iterates manifests.
   *
   * Example usage:
   * ```ts
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName)
   * for await (const manifest of client.listManifests()) {
   *   console.log("manifest: ", manifest);
   * }
   * ```
   * @param options -
   */
  listManifests(
    options?: ListManifestsOptions
  ): PagedAsyncIterableIterator<ArtifactManifestProperties>;
}

/**
 * The client class used to interact with the Container Registry service.
 * @internal
 */
export class ContainerRepositoryImpl {
  private readonly client: GeneratedClient;
  /**
   * The Azure Container Registry endpoint.
   */
  public readonly registryUrl: string;
  /**
   * Repository name.
   */
  public readonly name: string;
  /**
   * Registry name.
   */
  public readonly fullyQualifiedName: string;

  /**
   * Creates an instance of a ContainerRepository.
   * @param registryUrl - the URL to the Container Registry endpoint
   * @param name - the name of the repository
   * @param client - the generated client that interacts with service
   */
  constructor(registryUrl: string, name: string, client: GeneratedClient) {
    this.registryUrl = registryUrl;
    this.name = name;
    const parsedUrl = new URL(registryUrl);
    this.fullyQualifiedName = `${parsedUrl.hostname}/${name}`;

    this.client = client;
  }

  /**
   * Deletes this repository.
   *
   * @param options - optional configuration for the operation
   */
  public async delete(options: DeleteRepositoryOptions = {}): Promise<DeleteRepositoryResult> {
    const { span, updatedOptions } = createSpan("ContainerRepository-delete", options);

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        this.name,
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
   * Returns an instance of RegistryArtifact.
   * @param tagOrDigest - the tag or digest of the artifact
   */
  public getArtifact(tagOrDigest: string): RegistryArtifact {
    return new RegistryArtifactImpl(this.registryUrl, this.name, tagOrDigest, this.client);
  }

  /**
   * Retrieves properties of this repository.
   * @param options -
   */
  public async getProperties(
    options: GetRepositoryPropertiesOptions = {}
  ): Promise<RepositoryProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepository-getProperties", options);

    try {
      const result = await this.client.containerRegistry.getProperties(this.name, updatedOptions);
      return result;
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
    options: SetRepositoryPropertiesOptions
  ): Promise<RepositoryProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepository-setProperties", {
      ...options,
      value: {
        canDelete: options.canDelete,
        canWrite: options.canWrite,
        canList: options.canList,
        canRead: options.canRead
      }
    });

    try {
      const properties = await this.client.containerRegistry.setProperties(
        this.name,
        updatedOptions
      );
      return {
        ...properties,
        writeableProperties: {
          canDelete: properties.writeableProperties.canDelete,
          canList: properties.writeableProperties.canList,
          canRead: properties.writeableProperties.canRead,
          canWrite: properties.writeableProperties.canWrite
        }
      };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates manifests.
   *
   * Example usage:
   * ```ts
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName)
   * for await (const manifest of client.listManifests()) {
   *   console.log("manifest: ", manifest);
   * }
   * ```
   * @param options -
   */
  public listManifests(
    options: ListManifestsOptions = {}
  ): PagedAsyncIterableIterator<ArtifactManifestProperties> {
    const iter = this.listManifestsItems(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listManifestsPage(settings, options)
    };
  }

  private async *listManifestsItems(
    options: ListManifestsOptions = {}
  ): AsyncIterableIterator<ArtifactManifestProperties> {
    for await (const page of this.listManifestsPage({}, options)) {
      yield* page;
    }
  }

  private async *listManifestsPage(
    continuationState: PageSettings,
    options: ListManifestsOptions = {}
  ): AsyncIterableIterator<ArtifactManifestProperties[]> {
    const orderby = toServiceManifestOrderBy(options.orderBy);
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize,
        orderby
      };
      const currentPage = await this.client.containerRegistry.getManifests(
        this.name,
        optionsComplete
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.manifests) {
        yield currentPage.manifests.map((t) => toArtifactManifestProperties(t, this.name));
      }
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistry.getManifestsNext(
        this.name,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.manifests) {
        yield currentPage.manifests.map((t) => toArtifactManifestProperties(t, this.name));
      }
    }
  }
}
