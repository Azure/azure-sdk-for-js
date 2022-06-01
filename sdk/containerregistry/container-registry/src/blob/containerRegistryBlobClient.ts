// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  RestError,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "../generated";
import { ChallengeHandler } from "../containerRegistryChallengeHandler";
import { ContainerRegistryRefreshTokenCredential } from "../containerRegistryTokenCredential";
import { logger } from "../logger";
import { calculateDigest } from "../utils/digest";
import {
  DeleteBlobOptions,
  DeleteManifestOptions,
  DownloadBlobOptions,
  DownloadBlobResult,
  DownloadManifestOptions,
  DownloadManifestResult,
  OciManifest,
  UploadBlobResult,
  UploadManifestOptions,
  UploadManifestResult,
} from "./models";
import * as Mappers from "../generated/models/mappers";
import { CommonClientOptions, createSerializer } from "@azure/core-client";
import { readStreamToEnd } from "../utils/helpers";
import { Readable } from "stream";
import { tracingClient } from "../tracing";

const LATEST_API_VERSION = "2021-07-01";

enum KnownManifestMediaType {
  OciManifestMediaType = "application/vnd.oci.image.manifest.v1+json",
}

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function assertHasProperty<T, U extends keyof T>(
  obj: T,
  property: U
): asserts obj is T & Required<Pick<T, U>> {
  if (!Object.prototype.hasOwnProperty.call(obj, property)) {
    throw new RestError(`Expected property ${property} to be defined.`);
  }
}

/**
 * Error thrown when the Docker content digest returned from the
 * server does not match the digest calculated from the content.
 */
export class DigestMismatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DigestMismatchError";
  }
}

/**
 * Client options used to configure Container Registry Blob API requests.
 */
export interface ContainerRegistryBlobClientOptions extends CommonClientOptions {
  /**
   * Gets or sets the audience to use for authentication with Azure Active Directory.
   * The authentication scope will be set from this audience.
   * See {@link KnownContainerRegistryAudience} for known audience values.
   */
  audience: string;
  /**
   * The version of service API to make calls against.
   */
  serviceVersion?: "2021-07-01";
}

const serializer = createSerializer(Mappers, /* isXML */ false);

/**
 * The Azure Container Registry blob client, responsible for uploading and downloading blobs and manifests, the building blocks of artifacts.
 */
export class ContainerRegistryBlobClient {
  /**
   * The Azure Container Registry endpoint.
   */
  public readonly endpoint: string;

  /**
   * The name of the repository that logically groups the artifact parts.
   */
  public readonly repositoryName: string;

  private client: GeneratedClient;

  /**
   * Creates an instance of a ContainerRegistryBlobClient for managing container images and artifacts.
   *
   * Example usage:
   * ```ts
   * import { ContainerRegistryBlobClient } from "@azure/container-registry";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ContainerRegistryBlobClient(
   *    "<container registry API endpoint>",
   *    "<repository name>",
   *    new DefaultAzureCredential()
   * );
   * ```
   * @param endpoint - the URL endpoint of the container registry
   * @param repositoryName - the name of the repository that logically groups the artifact parts
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpoint: string,
    repositoryName: string,
    credential: TokenCredential,
    options: ContainerRegistryBlobClientOptions
  ) {
    if (!endpoint) {
      throw new Error("invalid endpoint");
    }

    this.endpoint = endpoint;
    this.repositoryName = repositoryName;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        // This array contains header names we want to log that are not already
        // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
        additionalAllowedQueryParameters: [
          "last",
          "n",
          "orderby",
          "digest",
          "_nouploadcache",
          "_state",
        ],
      },
    };

    const defaultScope = `${options.audience}/.default`;
    const serviceVersion = options.serviceVersion ?? LATEST_API_VERSION;
    const authClient = new GeneratedClient(endpoint, serviceVersion, internalPipelineOptions);
    this.client = new GeneratedClient(endpoint, serviceVersion, internalPipelineOptions);
    this.client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: [defaultScope],
        challengeCallbacks: new ChallengeHandler(
          new ContainerRegistryRefreshTokenCredential(authClient, defaultScope, credential)
        ),
      })
    );
  }

  /**
   * Delete a blob.
   * @param digest - the digest of the blob to delete
   * @param options - optional configuration used to send requests to the service
   */
  public async deleteBlob(digest: string, options: DeleteBlobOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.deleteBlob",
      options,
      async (updatedOptions) => {
        await this.client.containerRegistryBlob.deleteBlob(
          this.repositoryName,
          digest,
          updatedOptions
        );
      }
    );
  }

  /**
   * Upload a manifest for an OCI artifact.
   *
   * @param manifest - the manifest to upload. If a resettable stream (a factory function that returns a stream) is provided, it may be called multiple times. Each time the function is called, a fresh stream should be returned.
   */
  public async uploadManifest(
    manifest: (() => NodeJS.ReadableStream) | NodeJS.ReadableStream | OciManifest,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.uploadManifest",
      options ?? {},
      async (updatedOptions) => {
        let manifestBody: Buffer | NodeJS.ReadableStream;

        if (isReadableStream(manifest)) {
          manifestBody = await readStreamToEnd(manifest);
        } else if (typeof manifest === "function") {
          manifestBody = await readStreamToEnd(manifest());
        } else {
          const serialized = serializer.serialize(Mappers.OCIManifest, manifest);
          manifestBody = Buffer.from(JSON.stringify(serialized));
        }

        const tagOrDigest = options?.tag ?? (await calculateDigest(manifestBody));

        const createManifestResult = await this.client.containerRegistry.createManifest(
          this.repositoryName,
          tagOrDigest,
          manifestBody,
          { contentType: KnownManifestMediaType.OciManifestMediaType, ...updatedOptions }
        );

        assertHasProperty(createManifestResult, "dockerContentDigest");

        return { digest: createManifestResult.dockerContentDigest };
      }
    );
  }

  /**
   * Downloads the manifest for an OCI artifact
   *
   * @param tagOrDigest - a tag or digest that identifies the artifact
   * @returns - the downloaded manifest
   */
  public async downloadManifest(
    tagOrDigest: string,
    options: DownloadManifestOptions = {}
  ): Promise<DownloadManifestResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.downloadManifest",
      options,
      async (updatedOptions) => {
        const { dockerContentDigest, readableStreamBody } =
          await this.client.containerRegistry.getManifest(this.repositoryName, tagOrDigest, {
            accept: KnownManifestMediaType.OciManifestMediaType,
            ...updatedOptions,
          });

        const bodyData = readableStreamBody
          ? await readStreamToEnd(readableStreamBody)
          : Buffer.alloc(0);

        const expectedDigest = await calculateDigest(bodyData);

        if (dockerContentDigest !== expectedDigest) {
          throw new DigestMismatchError(
            "Digest of blob to upload does not match the digest from the server."
          );
        }

        const manifest = serializer.deserialize(
          Mappers.OCIManifest,
          JSON.parse(bodyData.toString()),
          "OCIManifest"
        );

        return {
          digest: dockerContentDigest,
          manifest,
          manifestStream: Readable.from(bodyData),
        };
      }
    );
  }

  /**
   * Delete a manifest. Doing so effectively deletes an artifact from the registry.
   *
   * @param digest - the digest of the manifest to delete
   * @param options - optional configuration used to send requests to the service
   */
  public async deleteManifest(digest: string, options: DeleteManifestOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.deleteManifest",
      options,
      async (updatedOptions) => {
        await this.client.containerRegistry.deleteManifest(
          this.repositoryName,
          digest,
          updatedOptions
        );
      }
    );
  }

  /**
   * Upload an artifact blob.
   *
   * @param blobStreamFactory - a factory which produces a stream containing the blob data. This function may be called multiple times; each time the function is called a fresh stream should be returned.

   */
  public async uploadBlob(
    blobStreamFactory: () => NodeJS.ReadableStream
  ): Promise<UploadBlobResult>;

  /**
   * Upload an artifact blob.
   *
   * @param blobStream - the stream containing the blob data.
   */
  public async uploadBlob(blobStream: NodeJS.ReadableStream): Promise<UploadBlobResult>;

  public async uploadBlob(
    blobStreamOrFactory: (() => NodeJS.ReadableStream) | NodeJS.ReadableStream
  ): Promise<UploadBlobResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.uploadBlob",
      {},
      async (updatedOptions) => {
        const startUploadResult = await this.client.containerRegistryBlob.startUpload(
          this.repositoryName,
          updatedOptions
        );

        assertHasProperty(startUploadResult, "location");

        let requestBody: NodeJS.ReadableStream | Buffer;
        let digest: string;

        if (typeof blobStreamOrFactory === "function") {
          requestBody = blobStreamOrFactory();
          digest = await calculateDigest(blobStreamOrFactory());
        } else {
          requestBody = await readStreamToEnd(blobStreamOrFactory);
          digest = await calculateDigest(requestBody);
        }

        const uploadChunkResult = await this.client.containerRegistryBlob.uploadChunk(
          startUploadResult.location.substring(1),
          requestBody,
          updatedOptions
        );

        assertHasProperty(uploadChunkResult, "location");

        const { dockerContentDigest: digestFromResponse } =
          await this.client.containerRegistryBlob.completeUpload(
            digest,
            uploadChunkResult.location.substring(1),
            updatedOptions
          );

        if (digest !== digestFromResponse) {
          throw new DigestMismatchError(
            "Digest of blob to upload does not match the digest from the server."
          );
        }

        return { digest };
      }
    );
  }

  /**
   * Download a blob that is part of an artifact.
   *
   * @param digest - the digest of the blob to download
   * @param options - optional configuration used to send requests to the service
   * @returns - the downloaded blob
   */
  public async downloadBlob(
    digest: string,
    options: DownloadBlobOptions = {}
  ): Promise<DownloadBlobResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.downloadBlob",
      options,
      async (updatedOptions) => {
        const { readableStreamBody } = await this.client.containerRegistryBlob.getBlob(
          this.repositoryName,
          digest,
          updatedOptions
        );

        return {
          digest,
          content: readableStreamBody ?? Readable.from([]),
        };
      }
    );
  }
}
