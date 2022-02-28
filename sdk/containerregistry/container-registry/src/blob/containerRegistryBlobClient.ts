// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import {
  GeneratedClient,
  OCIManifest as GeneratedOCIManifest,
  Annotations as GeneratedAnnotations,
} from "../generated";
import { ContainerRegistryClientOptions } from "..";
import { ChallengeHandler } from "../containerRegistryChallengeHandler";
import { ContainerRegistryRefreshTokenCredential } from "../containerRegistryTokenCredential";
import { logger } from "../logger";
import { calculateDigest } from "../utils/digest";
import {
  UploadManifestOptions,
  OCIManifest,
  UploadBlobResult,
  DownloadManifestResult,
  DeleteBlobOptions,
  DownloadManifestOptions,
  DeleteManifestOptions,
  DownloadBlobOptions,
  DownloadBlobResult,
  OCIAnnotations,
  UploadManifestResult,
} from "./models";
import { FullOperationResponse } from "@azure/core-client";

const LATEST_API_VERSION = "2021-07-01";

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function convertGeneratedAnnotations(
  generatedAnnotations?: GeneratedAnnotations
): OCIAnnotations | undefined {
  if (!generatedAnnotations) {
    return undefined;
  }

  const {
    created,
    authors,
    url,
    documentation,
    source,
    version,
    revision,
    vendor,
    licenses,
    name,
    title,
    description,
    ...additionalProperties
  } = generatedAnnotations;

  return {
    createdAt: created,
    authors,
    url,
    documentation,
    source,
    version,
    revision,
    vendor,
    licenses,
    name,
    title,
    description,
    additionalProperties,
  };
}

/**
 * Blob client
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
   * Creates an instance of a ContainerRegistryClient.
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
   * @param repositoryName - The name of the repository that logically groups the artifact parts.
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

  public async deleteBlob(digest: string, options?: DeleteBlobOptions): Promise<void> {
    await this.client.containerRegistryBlob.deleteBlob(this.repositoryName, digest, options);
  }

  public async uploadManifest(
    manifest: OCIManifest,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult>;

  public async uploadManifest(
    manifestStream: NodeJS.ReadableStream,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult>;

  public async uploadManifest(
    manifestOrManifestStream: NodeJS.ReadableStream | OCIManifest,
    options?: UploadManifestOptions
  ): Promise<UploadManifestResult> {
    let manifestBody: Buffer | NodeJS.ReadableStream;

    if (isReadableStream(manifestOrManifestStream)) {
      manifestBody = manifestOrManifestStream;
    } else {
      const { schemaVersion, config, layers } = manifestOrManifestStream;

      const annotations = manifestOrManifestStream.annotations && {
        ...manifestOrManifestStream.annotations,

        // Rename/re-alias properties
        createdAt: undefined,
        additionalProperties: undefined,
        created: manifestOrManifestStream.annotations.createdAt,
        ...manifestOrManifestStream.annotations.additionalProperties,
      };

      manifestBody = Buffer.from(
        JSON.stringify({
          schemaVersion,
          config,
          layers,
          annotations,
        })
      );
    }

    const tagOrDigest = options?.tag ?? (await calculateDigest(manifestBody));
    const { dockerContentDigest } = await this.client.containerRegistry.createManifest(
      this.repositoryName,
      tagOrDigest,
      manifestBody,
      options
    );

    return { digest: dockerContentDigest };
  }

  public async downloadManifest(
    tagOrDigest: string,
    options?: DownloadManifestOptions
  ): Promise<DownloadManifestResult> {
    const rawResponse = await new Promise<FullOperationResponse>((resolve) =>
      this.client.containerRegistry.getManifest(this.repositoryName, tagOrDigest, {
        onResponse: (response, flatResponse, error) => {
          options?.onResponse?.(response, flatResponse, error);
          resolve(response);
        },
        ...options,
      })
    );

    const digest = rawResponse.headers.get("Docker-Content-Digest");
    if (!digest) {
      throw new Error("Expected Docker-Content-Digest header in response");
    }

    const expectedDigest = await calculateDigest(rawResponse.readableStreamBody!);

    if (digest !== expectedDigest) {
      throw new Error("Docker-Content-Digest header does not match calculated digest");
    }

    const {
      schemaVersion,
      config,
      layers,
      annotations: generatedAnnotations,
    } = JSON.parse(rawResponse.bodyAsText!) as GeneratedOCIManifest;

    if (schemaVersion === undefined) {
      throw new Error("schemaVersion must be defined");
    }

    const manifest: OCIManifest = {
      schemaVersion,
      config: {
        ...config,
        annotations: convertGeneratedAnnotations(config?.annotations),
      },
      layers: layers?.map((layer) => ({
        ...layer,
        annotations: convertGeneratedAnnotations(layer.annotations),
      })),
    };

    if (generatedAnnotations) {
      manifest.annotations = convertGeneratedAnnotations(generatedAnnotations);
    }

    return {
      digest,
      manifest,
      manifestStream: rawResponse.readableStreamBody!,
    };
  }

  public async deleteManifest(digest: string, options?: DeleteManifestOptions): Promise<void> {
    await this.client.containerRegistry.deleteManifest(this.repositoryName, digest, options);
  }

  public async uploadBlob(blob: NodeJS.ReadableStream): Promise<UploadBlobResult> {
    const startUploadResult = await this.client.containerRegistryBlob.startUpload(
      this.repositoryName
    );

    if (!startUploadResult.location) {
      throw new Error("startUpload did not return a location");
    }

    const digestCallback = calculateDigest(blob);

    const uploadChunkResult = await this.client.containerRegistryBlob.uploadChunk(
      startUploadResult.location,
      blob
    );

    if (!uploadChunkResult.location) {
      throw new Error("uploadChunk did not return a location");
    }

    const digest = await digestCallback;

    const { dockerContentDigest: digestFromResponse } =
      await this.client.containerRegistryBlob.completeUpload(digest, uploadChunkResult.location);

    if (!digestFromResponse) {
      throw new Error("completeUpload did not provide a digest");
    }

    if (digest !== digestFromResponse) {
      throw new Error("Digest of blob to upload does not match the digest from the server.");
    }

    return { digest };
  }

  public async downloadBlob(
    digest: string,
    options?: DownloadBlobOptions
  ): Promise<DownloadBlobResult> {
    const response = await this.client.containerRegistryBlob.getBlob(
      this.repositoryName,
      digest,
      options
    );

    if (!response.dockerContentDigest || !response.readableStreamBody) {
      throw new Error("Expected response with digest and content");
    }

    return {
      digest: response.dockerContentDigest,
      content: response.readableStreamBody,
    };
  }
}
