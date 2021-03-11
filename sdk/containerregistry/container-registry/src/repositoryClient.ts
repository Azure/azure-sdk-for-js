// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential,
  RestResponse
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  ContainerRegistryGetRepositoryAttributesResponse,
  ContainerRegistryRepositoryGetManifestAttributesResponse,
  ContainerRegistryRepositoryGetTagAttributesResponse,
  GeneratedClient
} from "./generated";
import { createSpan } from "./tracing";
import {
  ContainerRegistryClientOptions,
  ContentProperties,
  DeletedRepositoryResult
} from "./model";
import {
  ContainerRegistryUserCredential,
  createContainerRegistryUserCredentialPolicy
} from "./containerRegistryUserCredentialPolicy";

/**
 * Options for the `getProperties` method of `RepositoryClient`.
 */
export interface GetPropertiesOptions extends OperationOptions {}

/**
 * Options for the `delete` method of `RepositoryClient`.
 */
export interface DeleteOptions extends OperationOptions {}

/**
 * Options for the `deleteRegistryArtifact` method of `RepositoryClient`.
 */
export interface DeleteRegistryArtifactOptions extends OperationOptions {}

/**
 * Options for the `deleteTag` method of `RepositoryClient`.
 */
export interface DeleteTagOptions extends OperationOptions {}

/**
 * Options for the `getRegistryArtifactProperties` method of `RepositoryClient`.
 */
export interface GetRegistryArtifactPropertiesOptions extends OperationOptions {}

/**
 * Options for the `getTagProperties` method of `RepositoryClient`.
 */
export interface GetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `setManifestProperties` method of `RepositoryClient`.
 */
export interface SetManifestPropertiesOptions extends OperationOptions {}

/**
 * Options for the `SetTagProperties` method of `RepositoryClient`.
 */
export interface SetTagPropertiesOptions extends OperationOptions {}

/**
 * The client class used to interact with the Container Registry service.
 */
export class RepositoryClient {
  private client: GeneratedClient;
  public name: string;

  /**
   * Creates an instance of a RepositoryClient.
   *
   * Example usage:
   * ```ts
   * import { RepositoryClient } from "@azure/container-registry";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new RepositoryClient(
   *    "<container registry API endpoint>",
   *    "<repository name>"
   *    new DefaultAzureCredential()
   * );
   * ```
   * @param endpointUrl - the URL to the Container Registry endpoint
   * @param repositoryName - the URL to the Container Registry endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpointUrl: string,
    repositoryName: string,
    credential: TokenCredential | ContainerRegistryUserCredential,
    options: ContainerRegistryClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-container-registry/${SDK_VERSION}`;
    this.name = repositoryName;
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
        allowedHeaderNames: ["x-ms-correlation-request-id"]
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
    const { span, updatedOptions } = createSpan("RepositoryClient-delete", options);

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        this.name,
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
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-deleteRegistryArtifact", options);

    try {
      const result = await this.client.containerRegistryRepository.deleteManifest(
        this.name,
        digest,
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
   * Deletes a tag.
   * @param tag - the name of the tag to be deleted.
   * @param options -
   */
  public async deleteTag(tag: string, options: DeleteTagOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-deleteTag", options);

    try {
      const result = await this.client.containerRegistryRepository.deleteTag(
        this.name,
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
   * Retrieves properties of this repository.
   * @param options -
   */
  public async getProperties(
    options: GetPropertiesOptions = {}
  ): Promise<ContainerRegistryGetRepositoryAttributesResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-getProperties", options);

    try {
      const result = await this.client.containerRegistry.getRepositoryAttributes(
        this.name,
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
  ): Promise<ContainerRegistryRepositoryGetManifestAttributesResponse> {
    const { span, updatedOptions } = createSpan(
      "RepositoryClient-getRegistryArtifactProperties",
      options
    );

    try {
      const result = await this.client.containerRegistryRepository.getManifestAttributes(
        this.name,
        tagOrDigest,
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
   * Retrieves properties of a tag.
   * @param digest - the tag to be deleted.
   * @param options -
   */
  public async getTagProperties(
    tag: string,
    options: GetTagPropertiesOptions = {}
  ): Promise<ContainerRegistryRepositoryGetTagAttributesResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-getTagProperties", options);
    try {
      const result = await this.client.containerRegistryRepository.getTagAttributes(
        this.name,
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
   * Sets properties of a manifest.
   * @param digest - the digest of the manifest.
   * @param options -
   */
  public async setManifestProperties(
    digest: string,
    value: ContentProperties,
    options: SetManifestPropertiesOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-setManifestProperties", {
      ...options,
      value: value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.name,
        digest,
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
   * Sets properties of a tag.
   * @param tag - name of the tag
   * @param options -
   */
  public async setTagProperties(
    tag: string,
    value: ContentProperties = {},
    options: SetTagPropertiesOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("RepositoryClient-setTagProperties", {
      ...options,
      value: value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.name,
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
}
