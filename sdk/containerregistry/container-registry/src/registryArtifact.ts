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
  ContentProperties,
  TagOrderBy
} from "./model";
import { URL } from "./url";
import { createSpan } from "./tracing";
import { GeneratedClient } from "./generated";
import { extractNextLink, isDigest } from "./utils";

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
 * Options for the `setTagProperties` method of `RegistryArtifact`.
 */
export type SetTagPropertiesOptions = ContentProperties & OperationOptions;

/**
 * Options for the `setManifestProperties` method of `RegistryArtifact`.
 */
export type SetManifestPropertiesOptions = ContentProperties & OperationOptions;

/**
 * Options for the `listTags` method of `RegistryArtifact`.
 */
export interface ListTagsOptions extends OperationOptions {
  /** orderby query parameter */
  orderBy?: TagOrderBy;
}

/**
 * The client class used to interact with the Container Registry service.
 */
export class RegistryArtifact {
  private client: GeneratedClient;
  /**
   * The Azure Container Registry endpoint.
   */
  public registryUrl: string;
  /**
   * Repository name.
   */
  public repositoryName: string;
  /**
   * Registry name.
   */
  public tagOrDigest: string;

  public fullyQualifiedName: string;

  /**
   * Creates an instance of a RegistryArtifact.
   *
   * @internal
   * @param registryUrl - the URL to the Container Registry endpoint
   * @param repositoryName - the name of the repository
   * @param tagOrDigest - the tag or digest of this artifact
   * @param client - the generated client that interacts with service
   */
  constructor(
    registryUrl: string,
    repositoryName: string,
    tagOrDigest: string,
    client: GeneratedClient
  ) {
    this.registryUrl = registryUrl;
    this.repositoryName = repositoryName;
    this.tagOrDigest = tagOrDigest;
    const parsedUrl = new URL(registryUrl);
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
      return {
        repositoryName: result.repositoryName,
        digest: result.digest,
        size: result.size,
        createdOn: result.createdOn,
        lastUpdatedOn: result.lastUpdatedOn,
        architecture: result.architecture,
        operatingSystem: result.operatingSystem,
        manifests: result.references, // replace 'reference' with 'manifests'
        tags: result.tags,
        writeableProperties: result.writeableProperties
      };
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
  public async setManifestProperties(
    options: SetManifestPropertiesOptions = {}
  ): Promise<ArtifactManifestProperties> {
    const { span, updatedOptions } = createSpan("RegistryArtifact-setManifestProperties", {
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
      const properties = await this.client.containerRegistry.updateManifestProperties(
        this.repositoryName,
        digest,
        updatedOptions
      );
      return {
        ...properties,
        writeableProperties: properties.writeableProperties
          ? {
              canDelete: properties.writeableProperties.canDelete,
              canList: properties.writeableProperties.canList,
              canRead: properties.writeableProperties.canRead,
              canWrite: properties.writeableProperties.canWrite
            }
          : undefined
      };
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
      const result = await this.client.containerRegistry.getTagProperties(
        this.repositoryName,
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
   * Updates tag properties.
   * @param tag - name of the tag
   * @param options -
   */
  public async setTagProperties(
    tag: string,
    options: SetTagPropertiesOptions = {}
  ): Promise<ArtifactTagProperties> {
    const { span, updatedOptions } = createSpan("RegistryArtifact-setTagProperties", {
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
  ): PagedAsyncIterableIterator<ArtifactTagProperties> {
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
  ): AsyncIterableIterator<ArtifactTagProperties[]> {
    const orderby =
      options.orderBy === "timeAsc"
        ? "timeasc"
        : options.orderBy === "timeDesc"
        ? "timedesc"
        : undefined;
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
        yield currentPage.tagAttributeBases.map((t) => {
          return {
            ...t,
            repository: currentPage.repository
          };
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
