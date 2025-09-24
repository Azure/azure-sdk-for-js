// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  type AnonymousCredential,
  AppendBlobClient,
  BlobClient,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  PageBlobClient,
  newPipeline,
  type Pipeline,
  type StoragePipelineOptions,
} from "@azure/storage-blob";
import {
  getAccountBlobUrl,
  getDfsAccountBlobUrl,
  getDfsSoftDeleteAccountBlobUrl,
  getFullAccountBlobUrl,
  getGrsAccountBlobUrl,
  getGrsAccountSecondaryBlobUrl,
  getOrDestAccountBlobUrl,
  getSoftDeleteAccountBlobUrl,
} from "../../utils/injectables.js";

import { ensureClientRecording } from "./recorder.js";
import type { TokenCredential } from "@azure/core-auth";

export type TestAccountKind =
  | "default"
  | "full"
  | "softDelete"
  | "premiumFile"
  | "grs"
  | "grsSecondary"
  | "dfs"
  | "dfsSoftDelete"
  | "objectReplication";

const createClientModes = ["TokenCredential", "Pipeline", "Custom"] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export function pickBlobUrl(kind: TestAccountKind): string {
  switch (kind) {
    case "dfs":
      return getDfsAccountBlobUrl();
    case "dfsSoftDelete":
      return getDfsSoftDeleteAccountBlobUrl();
    case "full":
      return getFullAccountBlobUrl();
    case "softDelete":
      return getSoftDeleteAccountBlobUrl();
    case "premiumFile":
      throw new Error("premiumFile account kind is not supported in Blob service client");
    case "grs":
      return getGrsAccountBlobUrl();
    case "grsSecondary":
      return getGrsAccountSecondaryBlobUrl();
    case "objectReplication":
      return getOrDestAccountBlobUrl();
    default:
      return getAccountBlobUrl();
  }
}

export interface CreateBlobClientOptions {
  blobName: string;
  containerName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createBlobClient(
  mode: "TokenCredential",
  inputs: Omit<CreateBlobClientOptions, "credential" | "pipeline">,
): Promise<BlobClient>;
export async function createBlobClient(
  mode: "Custom",
  inputs: Omit<CreateBlobClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<BlobClient>;
export async function createBlobClient(
  mode: "Pipeline",
  inputs: Omit<CreateBlobClientOptions, "credential">,
): Promise<BlobClient>;
export async function createBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<BlobClient> {
  const {
    blobName,
    containerName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickBlobUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${containerName}/${blobName}`;
  let client: BlobClient;
  switch (mode) {
    case "TokenCredential":
      client = new BlobClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new BlobClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new BlobClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);

  return client;
}

export interface CreateContainerClientOptions {
  containerName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createContainerClient(
  mode: "TokenCredential",
  inputs: Omit<CreateContainerClientOptions, "credential" | "pipeline">,
): Promise<ContainerClient>;
export async function createContainerClient(
  mode: "Custom",
  inputs: Omit<CreateContainerClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<ContainerClient>;
export async function createContainerClient(
  mode: "Pipeline",
  inputs: Omit<CreateContainerClientOptions, "credential">,
): Promise<ContainerClient>;
export async function createContainerClient(
  mode: CreateClientMode,
  inputs: CreateContainerClientOptions,
): Promise<ContainerClient> {
  const { containerName, options, recorder, credential, pipeline, account = "default" } = inputs;

  const baseUrl = pickBlobUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${containerName}`;
  let client: ContainerClient;
  switch (mode) {
    case "TokenCredential":
      client = new ContainerClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new ContainerClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new ContainerClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);
  return client;
}

export async function createAppendBlobClient(
  mode: "TokenCredential",
  inputs: Omit<CreateBlobClientOptions, "credential" | "pipeline">,
): Promise<AppendBlobClient>;
export async function createAppendBlobClient(
  mode: "Custom",
  inputs: Omit<CreateBlobClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential;
  },
): Promise<AppendBlobClient>;
export async function createAppendBlobClient(
  mode: "Pipeline",
  inputs: Omit<CreateBlobClientOptions, "credential">,
): Promise<AppendBlobClient>;
export async function createAppendBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<AppendBlobClient> {
  const {
    blobName,
    containerName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickBlobUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${containerName}/${blobName}`;
  let client: AppendBlobClient;
  switch (mode) {
    case "TokenCredential":
      client = new AppendBlobClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new AppendBlobClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      if (!credential) {
        throw new Error("Custom mode requires a credential");
      }
      client = new AppendBlobClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);
  return client;
}

export interface CreateBlobServiceClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createBlobServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateBlobServiceClientOptions, "credential" | "pipeline">,
): Promise<BlobServiceClient>;
export async function createBlobServiceClient(
  mode: "Custom",
  inputs: Omit<CreateBlobServiceClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<BlobServiceClient>;
export async function createBlobServiceClient(
  mode: "Pipeline",
  inputs?: Omit<CreateBlobServiceClientOptions, "credential">,
): Promise<BlobServiceClient>;
export async function createBlobServiceClient(
  mode: CreateClientMode,
  inputs: CreateBlobServiceClientOptions = {},
): Promise<BlobServiceClient> {
  const { recorder, options, credential, pipeline, account = "default" } = inputs;
  const baseUrl = pickBlobUrl(account);
  let client: BlobServiceClient;
  switch (mode) {
    case "TokenCredential":
      client = new BlobServiceClient(baseUrl, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new BlobServiceClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new BlobServiceClient(baseUrl, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}

export async function createBlockBlobClient(
  mode: "TokenCredential",
  inputs: Omit<CreateBlobClientOptions, "credential" | "pipeline">,
): Promise<BlockBlobClient>;
export async function createBlockBlobClient(
  mode: "Custom",
  inputs: Omit<CreateBlobClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<BlockBlobClient>;
export async function createBlockBlobClient(
  mode: "Pipeline",
  inputs: Omit<CreateBlobClientOptions, "credential">,
): Promise<BlockBlobClient>;
export async function createBlockBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<BlockBlobClient> {
  const {
    blobName,
    containerName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickBlobUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${containerName}/${blobName}`;
  let client: BlockBlobClient;
  switch (mode) {
    case "TokenCredential":
      client = new BlockBlobClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new BlockBlobClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new BlockBlobClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);

  return client;
}

export async function createPageBlobClient(
  mode: "TokenCredential",
  inputs: Omit<CreateBlobClientOptions, "credential" | "pipeline">,
): Promise<PageBlobClient>;
export async function createPageBlobClient(
  mode: "Custom",
  inputs: Omit<CreateBlobClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<PageBlobClient>;
export async function createPageBlobClient(
  mode: "Pipeline",
  inputs: Omit<CreateBlobClientOptions, "credential">,
): Promise<PageBlobClient>;
export async function createPageBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<PageBlobClient> {
  const {
    blobName,
    containerName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickBlobUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${containerName}/${blobName}`;
  let client: PageBlobClient;
  switch (mode) {
    case "TokenCredential":
      client = new PageBlobClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new PageBlobClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      if (!credential) {
        throw new Error("Custom mode requires a credential");
      }
      client = new PageBlobClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);

  return client;
}
