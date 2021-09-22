// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { GeneratedClient, RepositoryWriteableProperties } from "./generated";
import { createSpan } from "./tracing";
import {
  ManifestOrderBy,
  ContainerRepositoryProperties,
  ArtifactManifestProperties,
  ManifestPageResponse
} from "./models";
import { RegistryArtifact, RegistryArtifactImpl } from "./registryArtifact";
import { toArtifactManifestProperties, toServiceManifestOrderBy } from "./transformations";
import { extractNextLink } from "./utils/helpers";

/**
 * Options for delete repository operation.
 */
export interface DeleteRepositoryOptions extends OperationOptions {}
/**
 * Options for the `listRegistryArtifacts` method of `ContainerRepository`.
 */
export interface ListManifestPropertiesOptions extends OperationOptions {
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
export interface UpdateRepositoryPropertiesOptions extends OperationOptions {
  /** Whether or not this repository can be deleted */
  canDelete?: boolean;
  /** Whether or not this repository can be written to */
  canWrite?: boolean;
  /** Whether or not include this repository when listing repositories */
  canList?: boolean;
  /** Whether or not this repository can be read */
  canRead?: boolean;
}

/**
 * A `repository` in a container registry is a logical grouping of images or artifacts that share the same name.  For example,
 * different versions of a `hello-world` application could have tags `v1` and `v2`, and be grouped by the repository `hello-world`.
 *
 * The {@link ContainerRepository} interface is a helper that groups information and operations about a repository in this
 * container registry.
 */
export interface ContainerRepository {
  /**
   * The Azure Container Registry endpoint.
   */
  readonly registryEndpoint: string;
  /**
   * Repository name.
   */
  readonly name: string;
  /**
   * Deletes this repository and all artifacts that are part of its logical group.
   *
   * @param options - optional configuration for the operation
   */
  delete(options?: DeleteRepositoryOptions): Promise<void>;
  /**
   * Returns an helper instance of {@link RegistryArtifact} for the given tag or digest.
   * @param tagOrDigest - the tag or digest of the artifact
   */
  getArtifact(tagOrDigest: string): RegistryArtifact;
  /**
   * Retrieves the properties of this repository.
   * @param options -
   */
  getProperties(options?: GetRepositoryPropertiesOptions): Promise<ContainerRepositoryProperties>;
  /**
   * Updates the properties of this repository.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const repository = client.getRepository(repositoryName)
   * const updated = await repository.updateProperties({
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param options -
   */
  updateProperties(
    options: UpdateRepositoryPropertiesOptions
  ): Promise<ContainerRepositoryProperties>;
  /**
   * Returns an async iterable iterator to list manifest properties.
   * This is useful for determining the collection of artifacts associated with
   * this repository, as each artifact is uniquely identified by its manifest.
   *
   * Example using `for-await-of` syntax:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const repository = client.getRepository(repositoryName)
   * for await (const manifest of repository.listManifestProperties()) {
   *   console.log("manifest: ", manifest);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```javascript
   * const iter = repository.listManifestProperties();
   * let item = await iter.next();
   * while (!item.done) {
   *   console.log("manifest properties: ", item.value);
   *   item = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```javascript
   * const pages = repository.listManifestProperties().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const manifestProperties of page.value) {
   *      console.log(`  manifest properties: ${manifestProperties}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param options -
   */
  listManifestProperties(
    options?: ListManifestPropertiesOptions
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
  public readonly registryEndpoint: string;
  /**
   * Repository name.
   */
  public readonly name: string;

  /**
   * Creates an instance of a ContainerRepository.
   * @param registryEndpoint - the URL to the Container Registry endpoint
   * @param name - the name of the repository
   * @param client - the generated client that interacts with service
   */
  constructor(registryEndpoint: string, name: string, client: GeneratedClient) {
    this.registryEndpoint = registryEndpoint;
    this.name = name;

    this.client = client;
  }

  /**
   * Deletes this repository and all artifacts that are part of its logical group.
   *
   * @param options - optional configuration for the operation
   */
  public async delete(options: DeleteRepositoryOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ContainerRepository-delete", options);

    try {
      await this.client.containerRegistry.deleteRepository(this.name, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an helper instance of {@link RegistryArtifact} for the given tag or digest.
   * @param tagOrDigest - the tag or digest of the artifact
   */
  public getArtifact(tagOrDigest: string): RegistryArtifact {
    if (!tagOrDigest) {
      throw new Error("invalid tagOrDigest");
    }
    return new RegistryArtifactImpl(this.registryEndpoint, this.name, tagOrDigest, this.client);
  }

  /**
   * Retrieves the properties of this repository.
   * @param options -
   */
  public async getProperties(
    options: GetRepositoryPropertiesOptions = {}
  ): Promise<ContainerRepositoryProperties> {
    const { span, updatedOptions } = createSpan("ContainerRepository-getProperties", options);

    try {
      return await this.client.containerRegistry.getProperties(this.name, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the properties of this repository.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const repository = client.getRepository(repositoryName)
   * const updated = await repository.updateProperties({
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param options -
   */
  public async updateProperties(
    options: UpdateRepositoryPropertiesOptions
  ): Promise<ContainerRepositoryProperties> {
    const value: RepositoryWriteableProperties = {
      canDelete: options.canDelete,
      canWrite: options.canWrite,
      canList: options.canList,
      canRead: options.canRead
    };
    const { span, updatedOptions } = createSpan("ContainerRepository-updateProperties", {
      ...options,
      value
    });

    try {
      return await this.client.containerRegistry.updateProperties(this.name, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an async iterable iterator to list manifest properties.
   * This is useful for determining the collection of artifacts associated with
   * this repository, as each artifact is uniquely identified by its manifest.
   *
   * Example using `for-await-of` syntax:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const repository = client.getRepository(repositoryName)
   * for await (const manifest of repository.listManifestProperties()) {
   *   console.log("manifest: ", manifest);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```javascript
   * const iter = repository.listManifestProperties();
   * let item = await iter.next();
   * while (!item.done) {
   *   console.log("manifest properties: ", item.value);
   *   item = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```javascript
   * const pages = repository.listManifestProperties().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const manifestProperties of page.value) {
   *      console.log(`  manifest properties: ${manifestProperties}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param options -
   */
  public listManifestProperties(
    options: ListManifestPropertiesOptions = {}
  ): PagedAsyncIterableIterator<ArtifactManifestProperties, ManifestPageResponse> {
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
    options: ListManifestPropertiesOptions = {}
  ): AsyncIterableIterator<ArtifactManifestProperties> {
    for await (const page of this.listManifestsPage({}, options)) {
      yield* page;
    }
  }

  private async *listManifestsPage(
    continuationState: PageSettings,
    options: ListManifestPropertiesOptions = {}
  ): AsyncIterableIterator<ManifestPageResponse> {
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
        const array = currentPage.manifests.map((t) =>
          toArtifactManifestProperties(t, this.name, currentPage.registryLoginServer!)
        );
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
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
        const array = currentPage.manifests.map((t) =>
          toArtifactManifestProperties(t, this.name, currentPage.registryLoginServer!)
        );
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
    }
  }
}
