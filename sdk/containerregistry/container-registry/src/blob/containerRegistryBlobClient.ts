// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { Descriptor, GeneratedClient } from "../generated";
import { ContainerRegistryClientOptions } from "..";
import { ChallengeHandler } from "../containerRegistryChallengeHandler";
import { ContainerRegistryRefreshTokenCredential } from "../containerRegistryTokenCredential";
import { logger } from "../logger";
import { calculateDigest } from "../utils/digest";
import {
  UploadManifestOptions,
  OciManifest,
  UploadBlobResult,
  DownloadManifestResult,
  DeleteBlobOptions,
  DownloadManifestOptions,
  DeleteManifestOptions,
  DownloadBlobOptions,
  DownloadBlobResult,
  UploadManifestResult,
  OciAnnotations,
  OciBlobDescriptor,
} from "./models";
import { OCIManifest as GeneratedOciManifest } from "../generated/models";
import { FullOperationResponse } from "@azure/core-client";
import { readStreamToEnd } from "../utils/helpers";
import { Readable } from "stream";

const LATEST_API_VERSION = "2021-07-01";

enum KnownManifestMediaType {
  OciManifest = "application/vnd.oci.image.manifest.v1+json",
}

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

const annotationMappings = {
  createdAt: "org.opencontainers.image.created",
  authors: "org.opencontainers.image.authors",
  url: "org.opencontainers.image.url",
  documentation: "org.opencontainers.image.documentation",
  source: "org.opencontainers.image.source",
  version: "org.opencontainers.image.version",
  revision: "org.opencontainers.image.revision",
  vendor: "org.opencontainers.image.vendor",
  licenses: "org.opencontainers.image.licenses",
  name: "org.opencontainers.image.ref.name",
  title: "org.opencontainers.image.title",
  description: "org.opencontainers.image.description",
} as { [k: string]: string };

const reverseAnnotationMappings = Object.entries(annotationMappings).reduce(
  (acc, [k, v]) => ({ [v]: k, ...acc }),
  {}
) as {
  [k: string]: string;
};

function serializeAnnotations(annotations?: OciAnnotations): any {
  return (
    annotations &&
    Object.entries(annotations).reduce(
      (acc, [property, value]) => ({
        [annotationMappings[property] ?? property]: value,
        ...acc,
      }),
      {}
    )
  );
}

function deserializeAnnotations(annotations: any): OciAnnotations | undefined {
  return (
    annotations &&
    Object.entries(annotations).reduce(
      (acc, [property, value]) => ({
        [reverseAnnotationMappings[property] ?? property]: value,
        ...acc,
      }),
      {}
    )
  );
}

function serializeDescriptor(descriptor: OciBlobDescriptor): Descriptor {
  if (descriptor.annotations) {
    return {
      ...descriptor,
      annotations: serializeAnnotations(descriptor.annotations),
    };
  } else {
    return descriptor;
  }
}

function deserializeDescriptor(descriptor: Descriptor): OciBlobDescriptor {
  if (descriptor.annotations) {
    return {
      ...descriptor,
      annotations: deserializeAnnotations(descriptor.annotations),
    };
  } else {
    return descriptor;
  }
}

function serializeManifest(manifest: OciManifest): GeneratedOciManifest {
  if (manifest.annotations) {
    return {
      ...manifest,
      config: manifest.config && serializeDescriptor(manifest.config),
      layers: manifest.layers?.map(serializeDescriptor),
      annotations: serializeAnnotations(manifest.annotations),
    };
  } else {
    return {
      ...manifest,
      config: manifest.config && serializeDescriptor(manifest.config),
      layers: manifest.layers?.map(serializeDescriptor),
    };
  }
}

function deserializeManifest(manifest: GeneratedOciManifest): OciManifest {
  if (!manifest.schemaVersion) {
    throw new Error("schemaVersion must be defined");
  }

  if (manifest.annotations) {
    return {
      ...manifest,
      config: manifest.config && deserializeDescriptor(manifest.config),
      layers: manifest.layers?.map(deserializeDescriptor),
      annotations: deserializeAnnotations(manifest.annotations),
      schemaVersion: manifest.schemaVersion as number,
    };
  } else {
    return {
      ...manifest,
      config: manifest.config && deserializeDescriptor(manifest.config),
      layers: manifest.layers?.map(deserializeDescriptor),
      schemaVersion: manifest.schemaVersion as number,
    };
  }
}

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
   * import { ContainerRegistryClient } from "@azure/container-registry";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ContainerRegistryClient(
   *    "<container registry API endpoint>",
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
        additionalAllowedQueryParameters: ["last", "n", "orderby", "digest"],
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
    await this.client.containerRegistryBlob.deleteBlob(this.repositoryName, digest, options);
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
    let manifestBody: Buffer | NodeJS.ReadableStream;

    if (isReadableStream(manifestOrManifestStream)) {
      manifestBody = await readStreamToEnd(manifestOrManifestStream);
    } else if (typeof manifestOrManifestStream === "function") {
      manifestBody = await readStreamToEnd(manifestOrManifestStream());
    } else {
      manifestBody = Buffer.from(JSON.stringify(serializeManifest(manifestOrManifestStream)));
    }

    const tagOrDigest = options?.tag ?? (await calculateDigest(manifestBody));

    const { dockerContentDigest } = await this.client.containerRegistry.createManifest(
      this.repositoryName,
      tagOrDigest,
      manifestBody,
      { contentType: KnownManifestMediaType.OciManifest, ...options }
    );

    if (!dockerContentDigest) {
      throw new Error("Digest not provided");
    }

    return { digest: dockerContentDigest };
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
    const rawResponse = await new Promise<FullOperationResponse>((resolve) =>
      this.client.containerRegistry.getManifest(this.repositoryName, tagOrDigest, {
        accept: KnownManifestMediaType.OciManifest,
        ...options,
        onResponse: (rawResponseProvided, flatResponse, error) => {
          options?.onResponse?.(rawResponseProvided, flatResponse, error);
          resolve(rawResponseProvided);
        },
      })
    );

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

    const manifest = deserializeManifest(JSON.parse(body));

    return {
      digest,
      manifest,
      manifestStream: Readable.from(bodyData),
    };
  }

  /**
   * Delete a manifest. Doing so effectively deletes an artifact from the registry.
   *
   * @param digest - the digest of the manifest to delete
   * @param options - optional configuration used to send requests to the service
   */
  public async deleteManifest(digest: string, options?: DeleteManifestOptions): Promise<void> {
    await this.client.containerRegistry.deleteManifest(this.repositoryName, digest, options);
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
    const { readableStreamBody: content } = await this.client.containerRegistryBlob.getBlob(
      this.repositoryName,
      digest,
      options
    );

    if (!content) {
      throw new Error("Expected response with content");
    }

    return {
      digest,
      content,
    };
  }
}
