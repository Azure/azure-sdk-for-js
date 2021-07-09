// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import {
  ArtifactTagProperties,
  ArtifactManifestProperties,
  TagOrderBy,
  TagPageResponse
} from "./models";
import { URL } from "./utils/url";
import { createSpan } from "./tracing";
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
  /** Delete enabled */
  canDelete?: boolean;
  /** Write enabled */
  canWrite?: boolean;
  /** List enabled */
  canList?: boolean;
  /** Read enabled */
  canRead?: boolean;
}

/**
 * Options for the `updateManifestProperties` method of `RegistryArtifact`.
 */
export interface UpdateManifestPropertiesOptions extends OperationOptions {
  /** Delete enabled */
  canDelete?: boolean;
  /** Write enabled */
  canWrite?: boolean;
  /** List enabled */
  canList?: boolean;
  /** Read enabled */
  canRead?: boolean;
}

/**
 * Options for the `listTagProperties` method of `RegistryArtifact`.
 */
export interface ListTagPropertiesOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: TagOrderBy;
}

/**
 * The helper used to interact with the Container Registry artifact.
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
   * Deletes this artifact.
   * @param options -
   */
  delete(options?: DeleteArtifactOptions): Promise<void>;
  /**
   * Deletes a tag.
   * @param tag - the name of the tag to be deleted.
   * @param options -
   */
  deleteTag(tag: string, options?: DeleteTagOptions): Promise<void>;
  /**
   * Retrieves properties of this registry artifact.
   * @param options -
   */
  getManifestProperties(
    options?: GetManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties>;
  /**
   * Updates manifest artifact attributes.
   * @param options -
   */
  updateManifestProperties(
    options: UpdateManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties>;
  /**
   * Retrieves properties of a tag.
   * @param tag - the tag to retrieve properties.
   * @param options -
   */
  getTagProperties(tag: string, options?: GetTagPropertiesOptions): Promise<ArtifactTagProperties>;
  /**
   * Updates tag properties.
   * @param tag - name of the tag
   * @param options -
   */
  updateTagProperties(
    tag: string,
    options: UpdateTagPropertiesOptions
  ): Promise<ArtifactTagProperties>;
  /**
   * Returns an async iterable iterator to list tag properties.
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
   * Deletes this artifact.
   * @param options -
   */
  public async delete(options: DeleteArtifactOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("RegistryArtifact-delete", options);

    try {
      await this.client.containerRegistry.deleteManifest(
        this.repositoryName,
        await this.getDigest(),
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
    if (!tag) {
      throw new Error("invalid tag");
    }

    const { span, updatedOptions } = createSpan("RegistryArtifact-deleteTag", options);

    try {
      await this.client.containerRegistry.deleteTag(this.repositoryName, tag, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of this registry artifact.
   * @param options -
   */
  public async getManifestProperties(
    options: GetManifestPropertiesOptions = {}
  ): Promise<ArtifactManifestProperties> {
    const { span, updatedOptions } = createSpan("RegistryArtifact-getManifestProperties", options);

    try {
      const result = await this.client.containerRegistry.getManifestProperties(
        this.repositoryName,
        await this.getDigest(),
        updatedOptions
      );
      return toArtifactManifestProperties(result, this.repositoryName, result.registryLoginServer!);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates manifest artifact attributes.
   * @param options -
   */
  public async updateManifestProperties(
    options: UpdateManifestPropertiesOptions
  ): Promise<ArtifactManifestProperties> {
    const { span, updatedOptions } = createSpan("RegistryArtifact-updateManifestProperties", {
      ...options,
      value: {
        canDelete: options.canDelete,
        canWrite: options.canWrite,
        canList: options.canList,
        canRead: options.canRead
      }
    });

    try {
      const result = await this.client.containerRegistry.updateManifestProperties(
        this.repositoryName,
        await this.getDigest(),
        updatedOptions
      );
      return toArtifactManifestProperties(result, this.repositoryName, result.registryLoginServer!);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of a tag.
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

    const { span, updatedOptions } = createSpan("RegistryArtifact-getTagProperties", options);
    try {
      return await this.client.containerRegistry.getTagProperties(
        this.repositoryName,
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
   * Updates tag properties.
   * @param tag - name of the tag
   * @param options -
   */
  public async updateTagProperties(
    tag: string,
    options: UpdateTagPropertiesOptions
  ): Promise<ArtifactTagProperties> {
    if (!tag) {
      throw new Error("invalid tag");
    }

    const { span, updatedOptions } = createSpan("RegistryArtifact-updateTagProperties", {
      ...options,
      value: {
        canDelete: options.canDelete,
        canWrite: options.canWrite,
        canList: options.canList,
        canRead: options.canRead
      }
    });

    try {
      return await this.client.containerRegistry.updateTagAttributes(
        this.repositoryName,
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
   * Returns an async iterable iterator to list tag properties.
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
      byPage: (settings: PageSettings = {}) => this.listTagsPage(settings, options)
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
    const orderby = toServiceTagOrderBy(options.orderBy);
    if (!continuationState.continuationToken) {
      const optionsComplete = {
        ...options,
        n: continuationState.maxPageSize,
        orderby
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
            ...t
          };
        });
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
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
            ...t
          };
        });
        yield Object.defineProperty(array, "continuationToken", {
          value: continuationState.continuationToken,
          enumerable: true
        });
      }
    }
  }
}
