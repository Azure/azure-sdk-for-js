// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { DeletedRepository, GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import { ContainerRegistryClientOptions, ContentPermissions } from "./model";
import {
  ContainerRegistryUserCredential,
  createContainerRegistryUserCredentialPolicy
} from "./containerRegistryUserCredentialPolicy";

/**
 * Re-export generated types that are used as public interfaces.
 */
export { DeletedRepository };

/**
 * Options for the `delete` method of `RepositoryClient`.
 */
export interface DeleteOptions extends OperationOptions {}

/**
 * Options for the `deleteImage` method of `RepositoryClient`.
 */
export interface DeleteImageOptions extends OperationOptions {}

/**
 * Options for the `deleteTag` method of `RepositoryClient`.
 */
export interface DeleteTagOptions extends OperationOptions {}

/**
 * Options for the `getImageProperties` method of `RepositoryClient`.
 */
export interface GetImagePropertiesOptions extends OperationOptions {}

/**
 * Options for the `getTagProperties` method of `RepositoryClient`.
 */
export interface GetTagPropertiesOptions extends OperationOptions {}

/**
 * Options for the `SetTagPermissions` method of `RepositoryClient`.
 */
export interface SetManifestPermissionsOptions extends OperationOptions {}

/**
 * Options for the `SetTagPermissions` method of `RepositoryClient`.
 */
export interface SetTagPermissionsOptions extends OperationOptions {}

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
  public async delete(options: DeleteOptions = {}): Promise<DeletedRepository> {
    const { span, updatedOptions } = createSpan("RepositoryClient-delete", options);

    try {
      const result = await this.client.containerRegistry.deleteRepository(
        this.name,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes an image in this repository.
   * @param digest the digest of the image to be deleted.
   * @param options
   */
  public async deleteImage(digest: string, options: DeleteImageOptions = {}) {
    const { span, updatedOptions } = createSpan("RepositoryClient-deleteImage", options);

    try {
      const result = await this.client.containerRegistryRepository.deleteManifest(
        this.name,
        digest,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a tag.
   * @param digest the tag to be deleted.
   * @param options
   */
  public async deleteTag(tag: string, options: DeleteTagOptions = {}) {
    const { span, updatedOptions } = createSpan("RepositoryClient-deleteTag", options);

    try {
      const result = await this.client.containerRegistryRepository.deleteTag(
        this.name,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of an image.
   * @param digest the tag to be deleted.
   * @param options
   */
  public async getImageProperties(tagOrDigest: string, options: GetImagePropertiesOptions = {}) {
    const { span, updatedOptions } = createSpan("RepositoryClient-getImageProperties", options);

    try {
      const result = await this.client.containerRegistryRepository.getManifestAttributes(
        this.name,
        tagOrDigest,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves properties of a tag.
   * @param digest the tag to be deleted.
   * @param options
   */
  public async getTagProperties(tag: string, options: GetTagPropertiesOptions = {}) {
    const { span, updatedOptions } = createSpan("RepositoryClient-getTagProperties", options);

    try {
      const result = await this.client.containerRegistryRepository.getTagAttributes(
        this.name,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets permissions of a manifest.
   * @param digest the tag to be deleted.
   * @param options
   */
  public async setManefestPermissions(
    tag: string,
    permissions: ContentPermissions,
    options: SetManifestPermissionsOptions = {}
  ) {
    const value = {
      deleteEnabled: permissions.canDelete,
      writeEnabled: permissions.canWrite,
      listEnabled: permissions.canList,
      readEnabled: permissions.canRead
    };
    const { span, updatedOptions } = createSpan("RepositoryClient-setManefestPermissions", {
      ...options,
      value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.name,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }
  /**
   * Sets permissions of a tag.
   * @param digest the tag to be deleted.
   * @param options
   */
  public async setTagPermissions(
    tag: string,
    permissions: ContentPermissions = {},
    options: SetTagPermissionsOptions = {}
  ) {
    const value = {
      deleteEnabled: permissions.canDelete,
      writeEnabled: permissions.canWrite,
      listEnabled: permissions.canList,
      readEnabled: permissions.canRead
    };
    const { span, updatedOptions } = createSpan("RepositoryClient-setTagPermissions", {
      ...options,
      value
    });

    try {
      const result = await this.client.containerRegistryRepository.updateTagAttributes(
        this.name,
        tag,
        updatedOptions
      );
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }
}
