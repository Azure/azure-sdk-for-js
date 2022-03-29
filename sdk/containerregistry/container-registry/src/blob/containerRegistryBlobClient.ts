// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "../generated";
import { ContainerRegistryClientOptions } from "..";
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
import { createSerializer, FullOperationResponse } from "@azure/core-client";
import { readStreamToEnd } from "../utils/helpers";
import { Readable } from "stream";
import { createSpan } from "../tracing";
import { SpanStatusCode } from "@azure/core-tracing";

const LATEST_API_VERSION = "2021-07-01";

enum KnownManifestMediaType {
  OciManifestMediaType = "application/vnd.oci.image.manifest.v1+json",
}

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
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
    options: ContainerRegistryClientOptions = {}
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
    // Require audience now until we have a default ACR audience from the service.
    if (!options.audience) {
      throw new Error(
        "ContainerRegistryClientOptions.audience must be set to initialize ContainerRegistryClient."
      );
    }

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
  public async deleteBlob(digest: string, options?: DeleteBlobOptions): Promise<void> {
    const { span, updatedOptions } = createSpan("ContainerRegistryBlobClient-deleteBlob", options);

    try {
      await this.client.containerRegistryBlob.deleteBlob(
        this.repositoryName,
        digest,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
    } finally {
      span.end();
    }
  }

  /**
   * Upload a manifest for an OCI artifact.
   *
   * @param manifest - the manifest to upload
   * @param options - optional configuration used to send requests to the service
   */
  public async uploadManifest(
    manifest: OciManifest,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult>;

  /**
   * Upload a manifest for an OCI artifact.
   *
   * @param manifestStream - the raw manifest as a stream
   * @param options - optional configuration used to send requests to the service
   */
  public async uploadManifest(
    manifestStream: NodeJS.ReadableStream,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult>;

  /**
   * Upload a manifest for an OCI artifact.
   *
   * @param manifestStreamFactory - a function which returns a stream of the raw manifest. This function may be called multiple times; each time the function is called a fresh stream should be returned.
   * @param options - optional configuration used to send requests to the service
   */
  public async uploadManifest(
    manifestStreamFactory: () => NodeJS.ReadableStream,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult>;

  public async uploadManifest(
    manifestOrManifestStream: (() => NodeJS.ReadableStream) | NodeJS.ReadableStream | OciManifest,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryBlobClient-uploadManifest",
      options
    );

    try {
      let manifestBody: Buffer | NodeJS.ReadableStream;

      if (isReadableStream(manifestOrManifestStream)) {
        manifestBody = await readStreamToEnd(manifestOrManifestStream);
      } else if (typeof manifestOrManifestStream === "function") {
        manifestBody = await readStreamToEnd(manifestOrManifestStream());
      } else {
        const serialized = serializer.serialize(Mappers.OCIManifest, manifestOrManifestStream);
        manifestBody = Buffer.from(JSON.stringify(serialized));
      }

      const tagOrDigest = options?.tag ?? (await calculateDigest(manifestBody));

      const { dockerContentDigest } = await this.client.containerRegistry.createManifest(
        this.repositoryName,
        tagOrDigest,
        manifestBody,
        { contentType: KnownManifestMediaType.OciManifestMediaType, ...updatedOptions }
      );

      if (!dockerContentDigest) {
        throw new Error("Digest not provided");
      }

      return { digest: dockerContentDigest };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Downloads the manifest for an OCI artifact
   *
   * @param tagOrDigest - a tag or digest that identifies the artifact
   * @returns - the downloaded manifest
   */
  public async downloadManifest(
    tagOrDigest: string,
    options?: DownloadManifestOptions
  ): Promise<DownloadManifestResult> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryBlobClient-downloadManifest",
      options
    );

    try {
      const rawResponse = await new Promise<FullOperationResponse>(async (resolve) => {
        this.client.containerRegistry.getManifest(this.repositoryName, tagOrDigest, {
          accept: KnownManifestMediaType.OciManifestMediaType,
          ...updatedOptions,
          onResponse: (rawResponseProvided, flatResponse, error) => {
            updatedOptions?.onResponse?.(rawResponseProvided, flatResponse, error);
            resolve(rawResponseProvided);
          },
        });
      });

      const digest = rawResponse.headers.get("Docker-Content-Digest");
      if (!digest) {
        throw new Error("Expected Docker-Content-Digest header in response");
      }

      const body = rawResponse.bodyAsText;
      if (!body) {
        throw new Error("downloadManifest did not return a text body");
      }

      const bodyData = Buffer.from(body);
      const expectedDigest = await calculateDigest(bodyData);

      if (digest !== expectedDigest) {
        throw new Error(`Docker-Content-Digest header does not match calculated digest.
        Expected: ${expectedDigest}
        Actual: ${digest}`);
      }

      const manifest = serializer.deserialize(Mappers.OCIManifest, JSON.parse(body), "OCIManifest");

      return {
        digest,
        manifest,
        manifestStream: Readable.from(bodyData),
      };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a manifest. Doing so effectively deletes an artifact from the registry.
   *
   * @param digest - the digest of the manifest to delete
   * @param options - optional configuration used to send requests to the service
   */
  public async deleteManifest(digest: string, options?: DeleteManifestOptions): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryBlobClient-deleteManifest",
      options
    );

    try {
      await this.client.containerRegistry.deleteManifest(
        this.repositoryName,
        digest,
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
    const { span } = createSpan("ContainerRegistryBlobClient-uploadBlob", undefined);

    try {
      const startUploadResult = await this.client.containerRegistryBlob.startUpload(
        this.repositoryName
      );

      let requestBody: NodeJS.ReadableStream | Buffer;
      let digest: string;

      if (typeof blobStreamOrFactory === "function") {
        requestBody = blobStreamOrFactory();
        digest = await calculateDigest(blobStreamOrFactory());
      } else {
        requestBody = await readStreamToEnd(blobStreamOrFactory);
        digest = await calculateDigest(requestBody);
      }

      if (!startUploadResult.location) {
        throw new Error("startUpload did not return a location");
      }

      const uploadChunkResult = await this.client.containerRegistryBlob.uploadChunk(
        startUploadResult.location.substring(1),
        requestBody
      );

      if (!uploadChunkResult.location) {
        throw new Error("uploadChunk did not return a location");
      }

      const { dockerContentDigest: digestFromResponse } =
        await this.client.containerRegistryBlob.completeUpload(
          digest,
          uploadChunkResult.location.substring(1)
        );

      if (!digestFromResponse) {
        throw new Error("completeUpload did not provide a digest");
      }

      if (digest !== digestFromResponse) {
        throw new Error("Digest of blob to upload does not match the digest from the server.");
      }

      return { digest };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
    options?: DownloadBlobOptions
  ): Promise<DownloadBlobResult> {
    const { span, updatedOptions } = createSpan(
      "ContainerRegistryBlobClient-downloadBlob",
      options
    );

    try {
      const { readableStreamBody: content } = await this.client.containerRegistryBlob.getBlob(
        this.repositoryName,
        digest,
        updatedOptions
      );

      if (!content) {
        throw new Error("Expected response with content");
      }

      return {
        digest,
        content,
      };
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }
}
