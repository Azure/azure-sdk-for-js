// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { OperationOptions } from "@azure/core-client";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import {
  ArtifactTagProperties,
  ArtifactManifestProperties,
  ArtifactTagOrder,
  TagPageResponse,
} from "./models";
import { tracingClient } from "./tracing";
import { GeneratedClient } from "./generated";
import { extractNextLink, isDigest } from "./utils/helpers";
import { toArtifactManifestProperties, toServiceTagOrderBy } from "./transformations";

/**
 * Options for the `delete` method of `RegistryArtifact`.
 */
export interface DeleteArtifactOptions extends OperationOptions {}
/**
 * Options for the `deleteTag` method of `RegistryArtifact`.
 */
export interface DeleteTagOptions extends OperationOptions {}
/**
 * Options for the `getManifestProperties` method of `RegistryArtifact`.
 */
export interface GetManifestPropertiesOptions extends OperationOptions {}
/**
 * Options for the `getTagProperties` method of `RegistryArtifact`.
 */
export interface GetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `updateTagProperties` method of `RegistryArtifact`.
 */
export interface UpdateTagPropertiesOptions extends OperationOptions {
  /** Whether or not this tag can be deleted */
  canDelete?: boolean;
  /** Whether or not this tag can be written to */
  canWrite?: boolean;
  /** Whether or not to include this tag when listing tags */
  canList?: boolean;
  /** Whether or not this tag can be read */
  canRead?: boolean;
}

/**
 * Options for the `updateManifestProperties` method of `RegistryArtifact`.
 */
export interface UpdateManifestPropertiesOptions extends OperationOptions {
  /** Whether or not this manifest can be deleted */
  canDelete?: boolean;
  /** Whether or not this manifest can be written to */
  canWrite?: boolean;
  /** Whether or not to include this manifest when listing manifest properties */
  canList?: boolean;
  /** Whether or not this manifest can be read */
  canRead?: boolean;
}

/**
 * Options for the `listTagProperties` method of `RegistryArtifact`.
 */
export interface ListTagPropertiesOptions extends OperationOptions {
  /** order in which the tags are returned */
  order?: ArtifactTagOrder;
}

/**
 * `Artifact` is the general term for items stored in a container registry,
 * and can include Docker images or other Open Container Initiative (OCI) artifact types.
 *
 * The {@link RegistryArtifact} interface is a helper that groups information and operations about an image
 * or artifact in a container registry.
 *
 */
export interface RegistryArtifact {
  /**
   * The Azure Container Registry endpoint.
   */
  readonly registryEndpoint: string;
  /**
   * Repository name.
   */
  readonly repositoryName: string;
  /**
   * fully qualified reference of the artifact.
   */
  readonly fullyQualifiedReference: string;
  /**
   * Deletes this registry artifact by deleting its manifest.
   * @param options -
   */
  delete(options?: DeleteArtifactOptions): Promise<void>;
  /**
   * Deletes a tag. This removes the tag from the artifact and its manifest.
   * @param tag - the name of the tag to delete.
   * @param options -
   */
  deleteTag(tag: string, options?: DeleteTagOptions): Promise<void>;
  /**
   * Retrieves the properties of the manifest that uniquely identifies this artifact.
   * @param options -
   */
  getManifestProperties(
    options?: GetManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties>;
  /**
   * Updates the properties of the artifact's manifest.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const artifact = client.getArtifact(repositoryName, artifactTagOrDigest)
   * const updated = await artifact.updateManifestProperties({
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param options -
   */
  updateManifestProperties(
    options: UpdateManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties>;
  /**
   * Retrieves the properties of the specified tag.
   * @param tag - the tag to retrieve properties.
   * @param options -
   */
  getTagProperties(tag: string, options?: GetTagPropertiesOptions): Promise<ArtifactTagProperties>;
  /**
   * Updates the properties of a given tag.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const artifact = client.getArtifact(repositoryName, artifactTagOrDigest)
   * const updated = await artifact.updateTagProperties(tag, {
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param tag - name of the tag to update properties on
   * @param options -
   */
  updateTagProperties(
    tag: string,
    options: UpdateTagPropertiesOptions
  ): Promise<ArtifactTagProperties>;
  /**
   * Returns an async iterable iterator to list the tags that uniquely identify this artifact and the properties of each.
   *
   * Example using `for-await-of` syntax:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName);
   * const artifact = repository.getArtifact(digest)
   * for await (const tag of artifact.listTagProperties()) {
   *   console.log("tag: ", tag);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```javascript
   * const iter = artifact.listTagProperties();
   * let item = await iter.next();
   * while (!item.done) {
   *   console.log("tag properties: ", item.value);
   *   item = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```javascript
   * const pages = artifact.listTagProperties().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const tagProperties of page.value) {
   *      console.log(`  repository name: ${tagProperties}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param options -
   */
  listTagProperties(
    options?: ListTagPropertiesOptions
  ): PagedAsyncIterableIterator<ArtifactTagProperties>;
}

/**
 * The client class used to interact with the Container Registry service.
 * @internal
 */
export class RegistryArtifactImpl {
  private client: GeneratedClient;
  /**
   * The Azure Container Registry endpoint.
   */
  public readonly registryEndpoint: string;
  /**
   * Repository name.
   */
  public readonly repositoryName: string;

  /**
   * Name of the form 'registry-login-server/repository-name\@digest' or
   *   'registry-login-server/repository-name:tag'
   */
  public readonly fullyQualifiedReference: string;

  private digest?: string;
  /**
   * Creates an instance of a RegistryArtifact.
   * @param registryEndpoint - the URL to the Container Registry endpoint
   * @param repositoryName - the name of the repository
   * @param tagOrDigest - the tag or digest of this artifact
   * @param client - the generated client that interacts with service
   */
  constructor(
    registryEndpoint: string,
    repositoryName: string,
    private tagOrDigest: string,
    client: GeneratedClient
  ) {
    this.registryEndpoint = registryEndpoint;
    this.repositoryName = repositoryName;

    const parsedUrl = new URL(registryEndpoint);
    if (isDigest(tagOrDigest)) {
      this.digest = tagOrDigest;
      this.fullyQualifiedReference = `${parsedUrl.hostname}/${repositoryName}@${this.digest}`;
    } else {
      this.fullyQualifiedReference = `${parsedUrl.hostname}/${repositoryName}:${tagOrDigest}`;
    }

    this.client = client;
  }

  /**
   * digest of this artifact.
   */
  private async getDigest(): Promise<string> {
    if (this.digest) {
      return this.digest;
    }

    if (!isDigest(this.tagOrDigest)) {
      this.digest = (await this.getTagProperties(this.tagOrDigest)).digest;
    } else {
      this.digest = this.tagOrDigest;
    }

    return this.digest;
  }

  /**
   * Deletes this registry artifact by deleting its manifest.
   * @param options -
   */
  public async delete(options: DeleteArtifactOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "RegistryArtifactImpl.delete",
      options,
      async (updatedOptions) => {
        await this.client.containerRegistry.deleteManifest(
          this.repositoryName,
          await this.getDigest(),
          updatedOptions
        );
      }
    );
  }

  /**
   * Deletes a tag. This removes the tag from the artifact and its manifest.
   * @param tag - the name of the tag to delete.
   * @param options -
   */
  public async deleteTag(tag: string, options: DeleteTagOptions = {}): Promise<void> {
    if (!tag) {
      throw new Error("invalid tag");
    }

    return tracingClient.withSpan(
      "RegistryArtifactImpl.deleteTag",
      options,
      async (updatedOptions) => {
        await this.client.containerRegistry.deleteTag(this.repositoryName, tag, updatedOptions);
      }
    );
  }

  /**
   * Retrieves the properties of the manifest that uniquely identifies this artifact.
   * @param options -
   */
  public async getManifestProperties(
    options: GetManifestPropertiesOptions = {}
  ): Promise<ArtifactManifestProperties> {
    return tracingClient.withSpan(
      "RegistryArtifactImpl.getManifestProperties",
      options,
      async (updatedOptions) => {
        const result = await this.client.containerRegistry.getManifestProperties(
          this.repositoryName,
          await this.getDigest(),
          updatedOptions
        );
        return toArtifactManifestProperties(
          result,
          this.repositoryName,
          result.registryLoginServer!
        );
      }
    );
  }

  /**
   * Updates the properties of the artifact's manifest.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const artifact = client.getArtifact(repositoryName, artifactTagOrDigest)
   * const updated = await artifact.updateManifestProperties({
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param options -
   */
  public async updateManifestProperties(
    options: UpdateManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties> {
    return tracingClient.withSpan(
      "RegistryArtifactImpl.updateManifestProperties",
      {
        ...options,
        value: {
          canDelete: options.canDelete,
          canWrite: options.canWrite,
          canList: options.canList,
          canRead: options.canRead,
        },
      },
      async (updatedOptions) => {
        const result = await this.client.containerRegistry.updateManifestProperties(
          this.repositoryName,
          await this.getDigest(),
          updatedOptions
        );
        return toArtifactManifestProperties(
          result,
          this.repositoryName,
          result.registryLoginServer!
        );
      }
    );
  }

  /**
   * Retrieves the properties of the specified tag.
   * @param tag - the tag to retrieve properties.
   * @param options -
   */
  public async getTagProperties(
    tag: string,
    options: GetTagPropertiesOptions = {}
  ): Promise<ArtifactTagProperties> {
    if (!tag) {
      throw new Error("invalid tag");
    }

    return tracingClient.withSpan(
      "RegistryArtifactImpl.getTagProperties",
      options,
      (updatedOptions) => {
        return this.client.containerRegistry.getTagProperties(
          this.repositoryName,
          tag,
          updatedOptions
        );
      }
    );
  }

  /**
   * Updates the properties of a given tag.
   *
   * Example usage:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credential);
   * const artifact = client.getArtifact(repositoryName, artifactTagOrDigest)
   * const updated = await artifact.updateTagProperties(tag, {
   *   canDelete: false,
   *   canList: false,
   *   canRead: false,
   *   canWrite: false
   * });
   * ```
   * @param tag - name of the tag to update properties on
   * @param options -
   */
  public async updateTagProperties(
    tag: string,
    options: UpdateTagPropertiesOptions
  ): Promise<ArtifactTagProperties> {
    if (!tag) {
      throw new Error("invalid tag");
    }

    return tracingClient.withSpan(
      "RegistryArtifactImpl.updateTagProperties",
      {
        ...options,
        value: {
          canDelete: options.canDelete,
          canWrite: options.canWrite,
          canList: options.canList,
          canRead: options.canRead,
        },
      },
      (updatedOptions) => {
        return this.client.containerRegistry.updateTagAttributes(
          this.repositoryName,
          tag,
          updatedOptions
        );
      }
    );
  }

  /**
   * Returns an async iterable iterator to list the tags that uniquely identify this artifact and the properties of each.
   *
   * Example using `for-await-of` syntax:
   *
   * ```javascript
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName);
   * const artifact = repository.getArtifact(digest)
   * for await (const tag of artifact.listTagProperties()) {
   *   console.log("tag: ", tag);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```javascript
   * const iter = artifact.listTagProperties();
   * let item = await iter.next();
   * while (!item.done) {
   *   console.log("tag properties: ", item.value);
   *   item = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```javascript
   * const pages = artifact.listTagProperties().byPage({ maxPageSize: 2 });
   * let page = await pages.next();
   * let i = 1;
   * while (!page.done) {
   *  if (page.value) {
   *    console.log(`-- page ${i++}`);
   *    for (const tagProperties of page.value) {
   *      console.log(`  repository name: ${tagProperties}`);
   *    }
   *  }
   *  page = await pages.next();
   * }
   * ```
   * @param options -
   */
  public listTagProperties(
    options: ListTagPropertiesOptions = {}
  ): PagedAsyncIterableIterator<ArtifactTagProperties, TagPageResponse> {
    const iter = this.listTagsItems(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listTagsPage(settings, options),
    };
  }

  private async *listTagsItems(
    options: ListTagPropertiesOptions = {}
  ): AsyncIterableIterator<ArtifactTagProperties> {
    for await (const page of this.listTagsPage({}, options)) {
      yield* page;
    }
  }

  private async *listTagsPage(
    continuationState: PageSettings,
    options: ListTagPropertiesOptions = {}
  ): AsyncIterableIterator<TagPageResponse> {
    const orderby = toServiceTagOrderBy(options.order);
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize,
        orderby,
      };
      const currentPage = await this.client.containerRegistry.getTags(
        this.repositoryName,
        optionsComplete
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.tagAttributeBases) {
        const array = currentPage.tagAttributeBases.map((t) => {
          return {
            registryLoginServer: currentPage.registryLoginServer,
            repositoryName: currentPage.repository,
            ...t,
          };
        });
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true,
        });
      }
    }
    while (continuationState.continuationToken) {
      const currentPage = await this.client.containerRegistry.getTagsNext(
        this.repositoryName,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = extractNextLink(currentPage.link);
      if (currentPage.tagAttributeBases) {
        const array = currentPage.tagAttributeBases.map((t) => {
          return {
            registryLoginServer: currentPage.registryLoginServer,
            repositoryName: currentPage.repository,
            ...t,
          };
        });
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true,
        });
      }
    }
  }
}
