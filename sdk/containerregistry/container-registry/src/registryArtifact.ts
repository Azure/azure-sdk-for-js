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
import { URL } from "./url";
import { createSpan } from "./tracing";
import { GeneratedClient } from "./generated";
import { extractNextLink, isDigest } from "./utils";
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
 * Options for the `listTags` method of `RegistryArtifact`.
 */
export interface ListTagsOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: TagOrderBy;
}

/**
 * The helper used to interact with the Container Registry service.
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
   * Registry name.
   */
  readonly tagOrDigest: string;

  /**
   * fully qualified name of the artifact.
   */
  readonly fullyQualifiedName: string;
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
    options?: UpdateManifestPropertiesOptions
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
   * Iterates tags.
   *
   * Example usage:
   * ```ts
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName);
   * const artifact = repository.getArtifact(digest)
   * for await (const tag of artifact.listTags()) {
   *   console.log("tag: ", tag);
   * }
   * ```
   * @param options -
   */
  listTags(options?: ListTagsOptions): PagedAsyncIterableIterator<ArtifactTagProperties>;
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
   * Registry name.
   */
  public readonly tagOrDigest: string;

  public readonly fullyQualifiedName: string;

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
    tagOrDigest: string,
    client: GeneratedClient
  ) {
    this.registryEndpoint = registryEndpoint;
    this.repositoryName = repositoryName;
    this.tagOrDigest = tagOrDigest;
    const parsedUrl = new URL(registryEndpoint);
    this.fullyQualifiedName = `${parsedUrl.hostname}/${repositoryName}${
      isDigest(tagOrDigest) ? "@" : ":"
    }${tagOrDigest}`;

    this.client = client;
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
        this.tagOrDigest,
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

    let digest: string = this.tagOrDigest;
    if (!isDigest(this.tagOrDigest)) {
      digest = (await this.getTagProperties(this.tagOrDigest)).digest;
    }

    try {
      const result = await this.client.containerRegistry.getManifestProperties(
        this.repositoryName,
        digest,
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
    options: UpdateManifestPropertiesOptions = {}
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

    let digest: string = this.tagOrDigest;
    if (!isDigest(this.tagOrDigest)) {
      digest = (await this.getTagProperties(this.tagOrDigest)).digest;
    }
    try {
      const result = await this.client.containerRegistry.updateManifestProperties(
        this.repositoryName,
        digest,
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
   * Iterates tags.
   *
   * Example usage:
   * ```ts
   * const client = new ContainerRegistryClient(url, credentials);
   * const repository = client.getRepository(repositoryName);
   * const artifact = repository.getArtifact(digest)
   * for await (const tag of artifact.listTags()) {
   *   console.log("tag: ", tag);
   * }
   * ```
   * @param options -
   */
  public listTags(
    options: ListTagsOptions = {}
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
    options: ListTagsOptions = {}
  ): AsyncIterableIterator<ArtifactTagProperties> {
    for await (const page of this.listTagsPage({}, options)) {
      yield* page;
    }
  }

  private async *listTagsPage(
    continuationState: PageSettings,
    options: ListTagsOptions = {}
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
