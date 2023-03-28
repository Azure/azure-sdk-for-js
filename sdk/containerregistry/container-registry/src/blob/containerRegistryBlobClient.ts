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
  DownloadOciImageManifestResult,
  KnownManifestMediaType,
  OciImageManifest,
  UploadBlobOptions,
  UploadBlobResult,
  UploadManifestOptions,
  UploadManifestResult,
} from "./models";
import * as Mappers from "../generated/models/mappers";
import { CommonClientOptions, createSerializer } from "@azure/core-client";
import { isDigest, readChunksFromStream, readStreamToEnd } from "../utils/helpers";
import { Readable } from "stream";
import { tracingClient } from "../tracing";
import crypto from "crypto";

const LATEST_API_VERSION = "2021-07-01";

const CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB

const DEFAULT_ACCEPT_MANIFEST_MEDIA_TYPES = [
  KnownManifestMediaType.OciManifest,
  KnownManifestMediaType.DockerManifest,
  "application/vnd.oci.image.index.v1+json",
  "application/vnd.docker.distribution.manifest.list.v2+json",
  "application/vnd.docker.container.image.v1+json",
];

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function assertHasProperty<T, U extends keyof T>(
  obj: T,
  property: U
): asserts obj is T & Required<Pick<T, U>> {
  if (!Object.prototype.hasOwnProperty.call(obj, property)) {
    throw new RestError(`Expected property ${String(property)} to be defined.`);
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
 * Used to determine whether a manifest downloaded via {@link ContainerRegistryBlobClient.downloadManifest} is an OCI image manifest.
 * If it is an OCI image manifest, the `manifest` property will contain the manifest data as parsed JSON.
 * @param downloadResult - the download result to check.
 * @returns - whether the downloaded manifest is an OCI image manifest.
 */
export function isDownloadOciImageManifestResult(
  downloadResult: DownloadManifestResult
): downloadResult is DownloadOciImageManifestResult {
  return (
    downloadResult.mediaType === KnownManifestMediaType.OciManifest &&
    Object.prototype.hasOwnProperty.call(downloadResult, "manifest")
  );
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
  audience?: string;
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
    options: ContainerRegistryBlobClientOptions = {}
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

    const defaultScope = `${options.audience ?? "https://containerregistry.azure.net"}/.default`;
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
   * @param manifest - the manifest to upload.
   */
  public async uploadManifest(
    manifest: Buffer | NodeJS.ReadableStream | OciImageManifest,
    options: UploadManifestOptions = {}
  ): Promise<UploadManifestResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.uploadManifest",
      options,
      async (updatedOptions) => {
        let manifestBody: Buffer | (() => NodeJS.ReadableStream);
        let tagOrDigest: string | undefined = options?.tag;

        if (Buffer.isBuffer(manifest)) {
          manifestBody = manifest;
          tagOrDigest ??= await calculateDigest(manifest);
        } else if (isReadableStream(manifest)) {
          manifestBody = await readStreamToEnd(manifest);
          tagOrDigest ??= await calculateDigest(manifestBody);
        } else {
          const serialized = serializer.serialize(Mappers.OCIManifest, manifest);
          manifestBody = Buffer.from(JSON.stringify(serialized));
          tagOrDigest ??= await calculateDigest(manifestBody);
        }

        const createManifestResult = await this.client.containerRegistry.createManifest(
          this.repositoryName,
          tagOrDigest,
          manifestBody,
          {
            contentType: options?.mediaType ?? KnownManifestMediaType.OciManifest,
            ...updatedOptions,
          }
        );

        assertHasProperty(createManifestResult, "dockerContentDigest");

        return { digest: createManifestResult.dockerContentDigest };
      }
    );
  }

  /**
   * Downloads the manifest for an OCI artifact.
   *
   * If the manifest downloaded was of type {@link KnownManifestMediaType.OciManifest}, the downloaded manifest will be of type {@link DownloadOciImageManifestResult}.
   * You can use {@link isDownloadOciImageManifestResult} to determine whether this is the case. If so, the strongly typed deserialized manifest will be available through the `manifest` property.
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
        const acceptMediaType = options.mediaType ?? DEFAULT_ACCEPT_MANIFEST_MEDIA_TYPES;

        const response = await this.client.containerRegistry.getManifest(
          this.repositoryName,
          tagOrDigest,
          {
            accept: Array.isArray(acceptMediaType) ? acceptMediaType.join(", ") : acceptMediaType,
            ...updatedOptions,
          }
        );

        assertHasProperty(response, "mediaType");

        const content = response.readableStreamBody
          ? await readStreamToEnd(response.readableStreamBody)
          : Buffer.alloc(0);

        const expectedDigest = await calculateDigest(content);

        if (isDigest(tagOrDigest) && expectedDigest !== tagOrDigest) {
          throw new DigestMismatchError(
            "Digest of downloaded manifest does not match the input digest"
          );
        }

        if (response.dockerContentDigest !== expectedDigest) {
          throw new DigestMismatchError(
            "Computed digest of downloaded manifest does not match the value of the Docker-Content-Digest header"
          );
        }

        if (response.mediaType === KnownManifestMediaType.OciManifest) {
          const manifest = serializer.deserialize(
            Mappers.OCIManifest,
            JSON.parse(content.toString()),
            "OCIManifest"
          );

          return {
            digest: response.dockerContentDigest,
            mediaType: response.mediaType,
            manifest,
            content,
          };
        }

        return {
          digest: response.dockerContentDigest,
          mediaType: response.mediaType,
          content,
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
   * @param blobStream - the stream containing the blob data.
   */
  public async uploadBlob(
    blob: NodeJS.ReadableStream | Buffer,
    options: UploadBlobOptions = {}
  ): Promise<UploadBlobResult> {
    return tracingClient.withSpan(
      "ContainerRegistryBlobClient.uploadBlob",
      options,
      async (updatedOptions) => {
        const blobStream = Buffer.isBuffer(blob) ? Readable.from(blob) : blob;

        const startUploadResult = await this.client.containerRegistryBlob.startUpload(
          this.repositoryName,
          updatedOptions
        );

        assertHasProperty(startUploadResult, "location");
        let location = startUploadResult.location.substring(1);

        const chunks = readChunksFromStream(blobStream, CHUNK_SIZE);
        const hash = crypto.createHash("sha256");

        let bytesUploaded = 0;

        for await (const chunk of chunks) {
          hash.write(chunk);
          const result = await this.client.containerRegistryBlob.uploadChunk(
            location,
            chunk,
            updatedOptions
          );

          bytesUploaded += chunk.byteLength;

          assertHasProperty(result, "location");
          location = result.location.substring(1);
        }

        hash.end();
        const digest = `sha256:${hash.digest("hex")}`;

        const { dockerContentDigest: digestFromResponse } =
          await this.client.containerRegistryBlob.completeUpload(digest, location, updatedOptions);

        if (digest !== digestFromResponse) {
          throw new DigestMismatchError(
            "Digest of blob to upload does not match the digest from the server."
          );
        }

        return { digest, sizeInBytes: bytesUploaded };
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
