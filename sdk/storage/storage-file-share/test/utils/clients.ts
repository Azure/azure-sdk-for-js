// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  type AnonymousCredential,
  ShareFileClient,
  ShareDirectoryClient,
  ShareClient,
  ShareServiceClient,
  newPipeline,
  type Pipeline,
  type ShareClientOptions,
  type StorageSharedKeyCredential,
} from "../../src/index.js";
import {
  getAccountFileUrl,
  getSoftDeleteAccountFileUrl,
  getPremiumFileAccountFileUrl,
  getStorageConnectionStringWithSas,
  getSoftDeleteStorageConnectionStringWithSas,
  getPremiumFileStorageConnectionStringWithSas,
} from "./injectables.js";

import { ensureClientRecording } from "./recorder.js";
import type { TokenCredential } from "@azure/core-auth";

export type TestAccountKind = "default" | "softDelete" | "premiumFile";

const createClientModes = ["TokenCredential", "Pipeline", "Custom", "SasConnectionString"] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export function pickFileUrl(kind: TestAccountKind): string {
  switch (kind) {
    case "softDelete":
      return getSoftDeleteAccountFileUrl();
    case "premiumFile":
      return getPremiumFileAccountFileUrl();
    default:
      return getAccountFileUrl();
  }
}

export function pickSasConnectionString(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "softDelete":
      return getSoftDeleteStorageConnectionStringWithSas();
    case "premiumFile":
      return getPremiumFileStorageConnectionStringWithSas();
    default:
      return getStorageConnectionStringWithSas();
  }
}

export interface CreateShareServiceClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: ShareClientOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential | StorageSharedKeyCredential;
}

export async function createShareServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateShareServiceClientOptions, "credential" | "pipeline">,
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "Custom",
  inputs: Omit<CreateShareServiceClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "Pipeline",
  inputs?: Omit<CreateShareServiceClientOptions, "credential">,
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "SasConnectionString",
  inputs?: Omit<CreateShareServiceClientOptions, "credential" | "pipeline">,
): Promise<ShareServiceClient | undefined>;
export async function createShareServiceClient(
  mode: CreateClientMode,
  inputs: CreateShareServiceClientOptions = {},
): Promise<ShareServiceClient | undefined> {
  const { recorder, options, credential, pipeline, account = "default" } = inputs;
  const baseUrl = pickFileUrl(account);
  let client: ShareServiceClient;
  switch (mode) {
    case "TokenCredential":
      client = new ShareServiceClient(baseUrl, createTestCredential(), {
        fileRequestIntent: "backup",
        allowSourceTrailingDot: true,
        allowTrailingDot: true,
        ...options,
      });
      break;
    case "Pipeline":
      client = new ShareServiceClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new ShareServiceClient(baseUrl, credential, options);
      break;
    case "SasConnectionString": {
      const connString = pickSasConnectionString(account);
      if (!connString) {
        return undefined;
      }
      client = ShareServiceClient.fromConnectionString(connString, options);
      break;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}

export interface CreateShareClientOptions {
  shareName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: ShareClientOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential | StorageSharedKeyCredential;
}

export async function createShareClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareClientOptions, "credential" | "pipeline">,
): Promise<ShareClient>;
export async function createShareClient(
  mode: "Custom",
  inputs: Omit<CreateShareClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareClient>;
export async function createShareClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareClientOptions, "credential">,
): Promise<ShareClient>;
export async function createShareClient(
  mode: CreateClientMode,
  inputs: CreateShareClientOptions,
): Promise<ShareClient> {
  const { shareName, options, recorder, credential, pipeline, account = "default" } = inputs;

  const baseUrl = pickFileUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${shareName}`;
  let client: ShareClient;
  switch (mode) {
    case "TokenCredential":
      client = new ShareClient(url, createTestCredential(), {
        fileRequestIntent: "backup",
        allowSourceTrailingDot: true,
        allowTrailingDot: true,
        ...options,
      });
      break;
    case "Pipeline":
      client = new ShareClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new ShareClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);
  return client;
}

export interface CreateShareDirectoryClientOptions {
  shareName: string;
  directoryName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: ShareClientOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential | StorageSharedKeyCredential;
}

export async function createShareDirectoryClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential" | "pipeline">,
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: "Custom",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential">,
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: CreateClientMode,
  inputs: CreateShareDirectoryClientOptions,
): Promise<ShareDirectoryClient> {
  const {
    shareName,
    directoryName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickFileUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${shareName}/${directoryName}`;
  let client: ShareDirectoryClient;
  switch (mode) {
    case "TokenCredential":
      client = new ShareDirectoryClient(url, createTestCredential(), {
        fileRequestIntent: "backup",
        allowSourceTrailingDot: true,
        allowTrailingDot: true,
        ...options,
      });
      break;
    case "Pipeline":
      client = new ShareDirectoryClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new ShareDirectoryClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);
  return client;
}

export interface CreateShareFileClientOptions {
  shareName: string;
  directoryName: string;
  fileName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: ShareClientOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential | StorageSharedKeyCredential;
}

export async function createShareFileClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareFileClientOptions, "credential" | "pipeline">,
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: "Custom",
  inputs: Omit<CreateShareFileClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareFileClientOptions, "credential">,
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: CreateClientMode,
  inputs: CreateShareFileClientOptions,
): Promise<ShareFileClient> {
  const {
    shareName,
    directoryName,
    fileName,
    options,
    recorder,
    credential,
    pipeline,
    account = "default",
  } = inputs;

  const baseUrl = pickFileUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${shareName}/${directoryName}/${fileName}`;
  let client: ShareFileClient;
  switch (mode) {
    case "TokenCredential":
      client = new ShareFileClient(url, createTestCredential(), {
        fileRequestIntent: "backup",
        allowSourceTrailingDot: true,
        allowTrailingDot: true,
        ...options,
      });
      break;
    case "Pipeline":
      client = new ShareFileClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new ShareFileClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);
  return client;
}
