// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isTokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
} from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/identity";
import { ContainerRegistryClientOptions } from "..";
import { ChallengeHandler } from "../containerRegistryChallengeHandler";
import { ContainerRegistryRefreshTokenCredential } from "../containerRegistryTokenCredential";
import {
  ContainerRegistryBlobDeleteBlobOptionalParams,
  ContainerRegistryBlobGetBlobOptionalParams,
  ContainerRegistryDeleteManifestOptionalParams,
  GeneratedClient,
  Manifest,
  OCIManifest,
} from "../generated";
import { logger } from "../logger";
import { calculateDigest } from "../utils/digest";
import { UploadManifestOptions } from "./models";

const LATEST_API_VERSION = "2021-07-01";

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
    options?: ContainerRegistryClientOptions
  );

  /**
   * Creates an instance of a ContainerRegistryClient to interact with
   * an Azure Container Registry that has anonymous pull access enabled.
   * Only operations that support anonymous access are enabled. Other service
   * methods will throw errors.
   *
   * Example usage:
   * ```ts
   * import { ContainerRegistryClient } from "@azure/container-registry";
   *
   * const client = new ContainerRegistryClient(
   *    "<container registry API endpoint>",
   * );
   * ```
   * @param endpoint - the URL endpoint of the container registry
   * @param repositoryName - The name of the repository that logically groups the artifact parts.
   * @param options - optional configuration used to send requests to the service
   */
  constructor(endpoint: string, repositoryName: string, options?: ContainerRegistryClientOptions);

  constructor(
    endpoint: string,
    repositoryName: string,
    credentialOrOptions?: TokenCredential | ContainerRegistryClientOptions,
    clientOptions: ContainerRegistryClientOptions = {}
  ) {
    if (!endpoint) {
      throw new Error("invalid endpoint");
    }

    this.endpoint = endpoint;
    this.repositoryName = repositoryName;

    let credential: TokenCredential | undefined;
    let options: ContainerRegistryClientOptions | undefined;
    if (isTokenCredential(credentialOrOptions)) {
      credential = credentialOrOptions;
      options = clientOptions;
    } else {
      options = credentialOrOptions ?? {};
    }

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

  async deleteBlob(
    digest: string,
    options?: ContainerRegistryBlobDeleteBlobOptionalParams
  ): Promise<void> {
    await this.client.containerRegistryBlob.deleteBlob(this.repositoryName, digest, options);
  }

  async uploadManifest(manifest: OCIManifest, options?: UploadManifestOptions): Promise<void>;

  async uploadManifest(manifestBuffer: Buffer, options?: UploadManifestOptions): Promise<void>;

  async uploadManifest(
    manifestOrManifestBuffer: Buffer | OCIManifest,
    options?: UploadManifestOptions
  ): Promise<void> {
    const manifestBuffer = Buffer.isBuffer(manifestOrManifestBuffer)
      ? manifestOrManifestBuffer
      : Buffer.from(JSON.stringify(manifestOrManifestBuffer), "utf8");

    const tagOrDigest = options?.tag ?? calculateDigest(manifestBuffer);
    await this.client.containerRegistry.createManifest(
      this.repositoryName,
      tagOrDigest,
      manifestBuffer,
      options
    );
  }

  async downloadManifest(tagOrDigest: string): Promise<Manifest> {
    const response = await this.client.containerRegistry.getManifest(
      this.repositoryName,
      tagOrDigest
    );

    // TODO: validate digest (comes from Docker-Content-Digest header, how do we get the header?)

    return response;
  }

  async deleteManifest(
    digest: string,
    options?: ContainerRegistryDeleteManifestOptionalParams
  ): Promise<void> {
    await this.client.containerRegistry.deleteManifest(this.repositoryName, digest, options);
  }

  async uploadBlob(blob: Buffer): Promise<void> {
    const startUploadResult = await this.client.containerRegistryBlob.startUpload(
      this.repositoryName
    );

    if (!startUploadResult.location) {
      throw undefined; // TODO error
    }

    const digest = calculateDigest(blob);
    const uploadChunkResult = await this.client.containerRegistryBlob.uploadChunk(
      startUploadResult.location,
      blob
    );

    if (!uploadChunkResult.location) {
      throw undefined; // TODO error
    }

    const completeResult = await this.client.containerRegistryBlob.completeUpload(
      digest,
      uploadChunkResult.location
    );

    // TODO return?
  }

  async downloadBlob(digest: string, options?: ContainerRegistryBlobGetBlobOptionalParams) {
    return await this.client.containerRegistryBlob.getBlob(this.repositoryName, digest, options);
  }
}
