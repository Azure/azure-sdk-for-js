// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TokenCredential } from "@azure/core-auth";
import type { StoragePipelineOptions } from "@azure/storage-file-datalake";
import {
  DataLakeServiceClient,
  DataLakeFileSystemClient,
  DataLakeDirectoryClient,
  DataLakeFileClient,
  newPipeline,
  type Pipeline,
} from "@azure/storage-file-datalake";
import type { AnonymousCredential } from "@azure/storage-blob";
import { createTestCredential } from "@azure-tools/test-credential";
import { ensureClientRecording } from "./recorder.js";
import { getDfsAccountUrl, getDfsSoftDeleteAccountUrl } from "./injectables.js";

export type TestAccountKind = "default" | "softDelete";

const createClientModes = ["TokenCredential", "Pipeline", "Custom"] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export function pickDfsUrl(kind: TestAccountKind): string {
  switch (kind) {
    case "softDelete":
      return getDfsSoftDeleteAccountUrl();
    default:
      return getDfsAccountUrl();
  }
}

// ============================================================================
// DataLakeServiceClient Factory
// ============================================================================

export interface CreateDataLakeServiceClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createDataLakeServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateDataLakeServiceClientOptions, "credential" | "pipeline">,
): Promise<DataLakeServiceClient>;
export async function createDataLakeServiceClient(
  mode: "Custom",
  inputs: Omit<CreateDataLakeServiceClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<DataLakeServiceClient>;
export async function createDataLakeServiceClient(
  mode: "Pipeline",
  inputs?: Omit<CreateDataLakeServiceClientOptions, "credential">,
): Promise<DataLakeServiceClient>;
export async function createDataLakeServiceClient(
  mode: CreateClientMode,
  inputs: CreateDataLakeServiceClientOptions = {},
): Promise<DataLakeServiceClient> {
  const { recorder, options, credential, pipeline, account = "default" } = inputs;
  const baseUrl = pickDfsUrl(account);
  let client: DataLakeServiceClient;
  switch (mode) {
    case "TokenCredential":
      client = new DataLakeServiceClient(baseUrl, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new DataLakeServiceClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new DataLakeServiceClient(baseUrl, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}

// ============================================================================
// DataLakeFileSystemClient Factory
// ============================================================================

export interface CreateDataLakeFileSystemClientOptions {
  fileSystemName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createDataLakeFileSystemClient(
  mode: "TokenCredential",
  inputs: Omit<CreateDataLakeFileSystemClientOptions, "credential" | "pipeline">,
): Promise<DataLakeFileSystemClient>;
export async function createDataLakeFileSystemClient(
  mode: "Custom",
  inputs: Omit<CreateDataLakeFileSystemClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<DataLakeFileSystemClient>;
export async function createDataLakeFileSystemClient(
  mode: "Pipeline",
  inputs: Omit<CreateDataLakeFileSystemClientOptions, "credential">,
): Promise<DataLakeFileSystemClient>;
export async function createDataLakeFileSystemClient(
  mode: CreateClientMode,
  inputs: CreateDataLakeFileSystemClientOptions,
): Promise<DataLakeFileSystemClient> {
  const { fileSystemName, recorder, options, credential, pipeline, account = "default" } = inputs;
  const baseUrl = pickDfsUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${fileSystemName}`;
  let client: DataLakeFileSystemClient;
  switch (mode) {
    case "TokenCredential":
      client = new DataLakeFileSystemClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new DataLakeFileSystemClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new DataLakeFileSystemClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}

// ============================================================================
// DataLakeDirectoryClient Factory
// ============================================================================

export interface CreateDataLakeDirectoryClientOptions {
  fileSystemName: string;
  directoryName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createDataLakeDirectoryClient(
  mode: "TokenCredential",
  inputs: Omit<CreateDataLakeDirectoryClientOptions, "credential" | "pipeline">,
): Promise<DataLakeDirectoryClient>;
export async function createDataLakeDirectoryClient(
  mode: "Custom",
  inputs: Omit<CreateDataLakeDirectoryClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<DataLakeDirectoryClient>;
export async function createDataLakeDirectoryClient(
  mode: "Pipeline",
  inputs: Omit<CreateDataLakeDirectoryClientOptions, "credential">,
): Promise<DataLakeDirectoryClient>;
export async function createDataLakeDirectoryClient(
  mode: CreateClientMode,
  inputs: CreateDataLakeDirectoryClientOptions,
): Promise<DataLakeDirectoryClient> {
  const {
    fileSystemName,
    directoryName,
    recorder,
    options,
    credential,
    pipeline,
    account = "default",
  } = inputs;
  const baseUrl = pickDfsUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${fileSystemName}/${directoryName}`;
  let client: DataLakeDirectoryClient;
  switch (mode) {
    case "TokenCredential":
      client = new DataLakeDirectoryClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new DataLakeDirectoryClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new DataLakeDirectoryClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}

// ============================================================================
// DataLakeFileClient Factory
// ============================================================================

export interface CreateDataLakeFileClientOptions {
  fileSystemName: string;
  fileName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createDataLakeFileClient(
  mode: "TokenCredential",
  inputs: Omit<CreateDataLakeFileClientOptions, "credential" | "pipeline">,
): Promise<DataLakeFileClient>;
export async function createDataLakeFileClient(
  mode: "Custom",
  inputs: Omit<CreateDataLakeFileClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<DataLakeFileClient>;
export async function createDataLakeFileClient(
  mode: "Pipeline",
  inputs: Omit<CreateDataLakeFileClientOptions, "credential">,
): Promise<DataLakeFileClient>;
export async function createDataLakeFileClient(
  mode: CreateClientMode,
  inputs: CreateDataLakeFileClientOptions,
): Promise<DataLakeFileClient> {
  const {
    fileSystemName,
    fileName,
    recorder,
    options,
    credential,
    pipeline,
    account = "default",
  } = inputs;
  const baseUrl = pickDfsUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${fileSystemName}/${fileName}`;
  let client: DataLakeFileClient;
  switch (mode) {
    case "TokenCredential":
      client = new DataLakeFileClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new DataLakeFileClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new DataLakeFileClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}
