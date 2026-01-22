// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Node.js-specific client factory extensions.
 * These add Node-only authentication modes to the browser-compatible factories.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { TokenCredential } from "@azure/core-auth";
import type { StoragePipelineOptions, DataLakeSASPermissions } from "@azure/storage-file-datalake";
import {
  DataLakeServiceClient,
  DataLakeFileSystemClient,
  DataLakeDirectoryClient,
  DataLakeFileClient,
  newPipeline,
  type Pipeline,
  StorageSharedKeyCredential,
  generateDataLakeSASQueryParameters,
} from "@azure/storage-file-datalake";
import { AnonymousCredential } from "@azure/storage-blob";
import { createTestCredential } from "@azure-tools/test-credential";
import { ensureClientRecording } from "../recorder.js";
import {
  getDfsAccountUrl,
  getDfsAccountName,
  getDfsAccountKey,
} from "../injectables.js";

// Re-export browser-compatible types and utilities
export {
  type TestAccountKind,
  type CreateClientMode as BrowserCreateClientMode,
  pickDfsUrl,
  type CreateDataLakeServiceClientOptions as BrowserCreateDataLakeServiceClientOptions,
  type CreateDataLakeFileSystemClientOptions as BrowserCreateDataLakeFileSystemClientOptions,
  type CreateDataLakeDirectoryClientOptions as BrowserCreateDataLakeDirectoryClientOptions,
  type CreateDataLakeFileClientOptions as BrowserCreateDataLakeFileClientOptions,
} from "../clients.js";

import {
  type TestAccountKind,
  pickDfsUrl,
  createDataLakeServiceClient as createDataLakeServiceClientWithSecureAuth,
  createDataLakeFileSystemClient as createDataLakeFileSystemClientWithSecureAuth,
  createDataLakeDirectoryClient as createDataLakeDirectoryClientWithSecureAuth,
  createDataLakeFileClient as createDataLakeFileClientWithSecureAuth,
} from "../clients.js";

// Node-specific modes include all browser modes plus key-based auth
const createClientModes = [
  "TokenCredential",
  "StorageSharedKeyCredential",
  "Pipeline",
  "Custom",
] as const;

export type CreateClientMode = (typeof createClientModes)[number];

// ============================================================================
// DataLakeServiceClient Factory (Node.js extended)
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
  mode: "StorageSharedKeyCredential",
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

  switch (mode) {
    case "TokenCredential":
      return createDataLakeServiceClientWithSecureAuth(mode, { recorder, account, options });
    case "Pipeline":
      return createDataLakeServiceClientWithSecureAuth(mode, {
        recorder,
        account,
        options,
        pipeline,
      });
    case "Custom":
      return createDataLakeServiceClientWithSecureAuth(mode, {
        recorder,
        account,
        options,
        credential: credential!,
      });
    case "StorageSharedKeyCredential": {
      const baseUrl = pickDfsUrl(account);
      const key = getDfsAccountKey();
      const accountName = getDfsAccountName();
      let client: DataLakeServiceClient;
      if (!key) {
        // Fall back to token credential if no key available
        client = new DataLakeServiceClient(baseUrl, createTestCredential(), options);
      } else {
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, key);
        client = new DataLakeServiceClient(baseUrl, sharedKeyCredential, options);
      }
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

// ============================================================================
// DataLakeFileSystemClient Factory (Node.js extended)
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
  mode: "StorageSharedKeyCredential",
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

  switch (mode) {
    case "TokenCredential":
      return createDataLakeFileSystemClientWithSecureAuth(mode, {
        fileSystemName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createDataLakeFileSystemClientWithSecureAuth(mode, {
        fileSystemName,
        recorder,
        account,
        options,
        pipeline,
      });
    case "Custom":
      return createDataLakeFileSystemClientWithSecureAuth(mode, {
        fileSystemName,
        recorder,
        account,
        options,
        credential: credential!,
      });
    case "StorageSharedKeyCredential": {
      const baseUrl = pickDfsUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${fileSystemName}`;
      const key = getDfsAccountKey();
      const accountName = getDfsAccountName();
      let client: DataLakeFileSystemClient;
      if (!key) {
        client = new DataLakeFileSystemClient(url, createTestCredential(), options);
      } else {
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, key);
        client = new DataLakeFileSystemClient(url, sharedKeyCredential, options);
      }
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

// ============================================================================
// DataLakeDirectoryClient Factory (Node.js extended)
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
  mode: "StorageSharedKeyCredential",
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

  switch (mode) {
    case "TokenCredential":
      return createDataLakeDirectoryClientWithSecureAuth(mode, {
        fileSystemName,
        directoryName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createDataLakeDirectoryClientWithSecureAuth(mode, {
        fileSystemName,
        directoryName,
        recorder,
        account,
        options,
        pipeline,
      });
    case "Custom":
      return createDataLakeDirectoryClientWithSecureAuth(mode, {
        fileSystemName,
        directoryName,
        recorder,
        account,
        options,
        credential: credential!,
      });
    case "StorageSharedKeyCredential": {
      const baseUrl = pickDfsUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${fileSystemName}/${directoryName}`;
      const key = getDfsAccountKey();
      const accountName = getDfsAccountName();
      let client: DataLakeDirectoryClient;
      if (!key) {
        client = new DataLakeDirectoryClient(url, createTestCredential(), options);
      } else {
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, key);
        client = new DataLakeDirectoryClient(url, sharedKeyCredential, options);
      }
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

// ============================================================================
// DataLakeFileClient Factory (Node.js extended)
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
  mode: "StorageSharedKeyCredential",
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

  switch (mode) {
    case "TokenCredential":
      return createDataLakeFileClientWithSecureAuth(mode, {
        fileSystemName,
        fileName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createDataLakeFileClientWithSecureAuth(mode, {
        fileSystemName,
        fileName,
        recorder,
        account,
        options,
        pipeline,
      });
    case "Custom":
      return createDataLakeFileClientWithSecureAuth(mode, {
        fileSystemName,
        fileName,
        recorder,
        account,
        options,
        credential: credential!,
      });
    case "StorageSharedKeyCredential": {
      const baseUrl = pickDfsUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${fileSystemName}/${fileName}`;
      const key = getDfsAccountKey();
      const accountName = getDfsAccountName();
      let client: DataLakeFileClient;
      if (!key) {
        client = new DataLakeFileClient(url, createTestCredential(), options);
      } else {
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, key);
        client = new DataLakeFileClient(url, sharedKeyCredential, options);
      }
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

// ============================================================================
// Node.js-specific helper functions
// ============================================================================

/**
 * Get signature from a SAS URL for sanitization purposes.
 */
export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  const sig = url.searchParams.get("sig");
  return sig ?? "";
}

export interface GetDataLakeFileSystemClientWithSASOptions {
  fileSystemName: string;
  pathName?: string;
  expiresOn: Date;
  permissions: DataLakeSASPermissions;
  options?: StoragePipelineOptions;
}

/**
 * Get a DataLakeFileSystemClient with a generated SAS credential.
 * This generates a SAS token on-the-fly for the specified file system.
 */
export async function getDataLakeFileSystemClientWithSASCredential(
  recorder: Recorder,
  inputs: GetDataLakeFileSystemClientWithSASOptions,
): Promise<DataLakeFileSystemClient> {
  const url = getDfsAccountUrl();
  const accountName = getDfsAccountName();
  const accountKey = getDfsAccountKey();

  if (!accountKey) {
    throw new Error("DFS_ACCOUNT_KEY is not configured - cannot generate SAS");
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  // Generate SAS token for the file system
  const sas = generateDataLakeSASQueryParameters(
    {
      fileSystemName: inputs.fileSystemName,
      pathName: inputs.pathName,
      expiresOn: inputs.expiresOn,
      permissions: inputs.permissions,
    },
    sharedKeyCredential,
  ).toString();

  const sep = url.endsWith("/") ? "" : "/";
  const fileSystemUrl = `${url}${sep}${inputs.fileSystemName}`;
  const urlWithSas = fileSystemUrl.includes("?")
    ? `${fileSystemUrl}&${sas}`
    : `${fileSystemUrl}?${sas}`;
  const pipeline = newPipeline(new AnonymousCredential());
  const client = new DataLakeFileSystemClient(urlWithSas, pipeline);
  await ensureClientRecording(recorder, client);
  return client;
}

/**
 * Convenience alias for creating a service client with token credential.
 */
export async function getDataLakeServiceClientWithDefaultCredential(
  recorder: Recorder,
  options?: StoragePipelineOptions,
): Promise<DataLakeServiceClient> {
  return createDataLakeServiceClient("TokenCredential", { recorder, options });
}
