// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Node-specific client factories that add SharedKeyCredential mode.
 * These extend the cross-platform clients from ../.../../utils/node/clients.js
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { StorageSharedKeyCredential, type AnonymousCredential } from "@azure/storage-common";
import {
  ShareFileClient,
  ShareDirectoryClient,
  ShareClient,
  ShareServiceClient,
  type ShareClientOptions,
} from "@azure/storage-file-share";
import {
  getAccountKey,
  getAccountName,
  getSoftDeleteAccountKey,
  getSoftDeleteAccountName,
  getPremiumFileAccountKey,
  getPremiumFileAccountName,
} from "../injectables.js";

import { ensureClientRecording } from "../recorder.js";
import {
  type TestAccountKind,
  type CreateShareServiceClientOptions,
  type CreateShareClientOptions,
  type CreateShareDirectoryClientOptions,
  type CreateShareFileClientOptions,
  createShareServiceClient as createShareServiceClientWithSecureAuth,
  createShareClient as createShareClientWithSecureAuth,
  createShareDirectoryClient as createShareDirectoryClientWithSecureAuth,
  createShareFileClient as createShareFileClientWithSecureAuth,
  pickFileUrl,
  pickSasConnectionString,
} from "../clients.js";
import type { TokenCredential } from "@azure/core-auth";

// Re-export everything from cross-platform clients
export {
  type TestAccountKind,
  type CreateShareServiceClientOptions,
  type CreateShareClientOptions,
  type CreateShareDirectoryClientOptions,
  type CreateShareFileClientOptions,
  pickFileUrl,
  pickSasConnectionString,
} from "../clients.js";

// Node-specific modes that add SharedKeyCredential and SasConnectionString
const createClientModesNode = [
  "TokenCredential",
  "SharedKeyCredential",
  "SasConnectionString",
  "Pipeline",
  "Custom",
] as const;

export type CreateClientModeNode = (typeof createClientModesNode)[number];

export function pickAccountName(kind: TestAccountKind): string {
  switch (kind) {
    case "softDelete":
      return getSoftDeleteAccountName();
    case "premiumFile":
      return getPremiumFileAccountName();
    default:
      return getAccountName();
  }
}

export function pickAccountKey(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "softDelete":
      return getSoftDeleteAccountKey();
    case "premiumFile":
      return getPremiumFileAccountKey();
    default:
      return getAccountKey();
  }
}

export function getSharedKeyCredential(
  kind: TestAccountKind = "default",
): StorageSharedKeyCredential | undefined {
  const accountName = pickAccountName(kind);
  const accountKey = pickAccountKey(kind);
  if (!accountKey) {
    return undefined;
  }
  return new StorageSharedKeyCredential(accountName, accountKey);
}

// Extended interfaces for Node mode options
export interface CreateShareServiceClientOptionsNode extends CreateShareServiceClientOptions {
  testAccountKind?: TestAccountKind;
  clientOptions?: ShareClientOptions;
}

// ShareServiceClient with SharedKeyCredential mode
export async function createShareServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateShareServiceClientOptionsNode, "credential" | "pipeline">,
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "SharedKeyCredential",
  inputs?: Omit<CreateShareServiceClientOptionsNode, "credential" | "pipeline">,
): Promise<ShareServiceClient | undefined>;
export async function createShareServiceClient(
  mode: "SasConnectionString",
  inputs?: Omit<CreateShareServiceClientOptionsNode, "credential" | "pipeline">,
): Promise<ShareServiceClient | undefined>;
export async function createShareServiceClient(
  mode: "Custom",
  inputs: Omit<CreateShareServiceClientOptionsNode, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: CreateClientModeNode,
  inputs?: CreateShareServiceClientOptionsNode,
): Promise<ShareServiceClient | undefined>;
export async function createShareServiceClient(
  mode: CreateClientModeNode,
  inputs: CreateShareServiceClientOptionsNode = {},
): Promise<ShareServiceClient | undefined> {
  const { recorder, options, clientOptions, account = "default" } = inputs;
  // Prefer clientOptions over options for backwards compatibility with existing tests
  const effectiveOptions = clientOptions ?? options;

  switch (mode) {
    case "TokenCredential":
      return createShareServiceClientWithSecureAuth("TokenCredential", {
        recorder,
        options: effectiveOptions,
        account,
      });
    case "Pipeline":
      return createShareServiceClientWithSecureAuth("Pipeline", {
        recorder,
        pipeline: inputs.pipeline,
        account,
        options: effectiveOptions,
      });
    case "Custom":
      return createShareServiceClientWithSecureAuth("Custom", {
        recorder,
        credential: inputs.credential,
        account,
        options: effectiveOptions,
      });
    case "SharedKeyCredential": {
      const baseUrl = pickFileUrl(account);
      const sharedKeyCred = getSharedKeyCredential(account);
      if (!sharedKeyCred) {
        return undefined;
      }
      const client = new ShareServiceClient(baseUrl, sharedKeyCred, effectiveOptions);
      await ensureClientRecording(recorder, client);
      return client;
    }
    case "SasConnectionString": {
      const connString = pickSasConnectionString(account);
      if (!connString) {
        return undefined;
      }
      const client = ShareServiceClient.fromConnectionString(connString, effectiveOptions);
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}

/**
 * Creates a ShareServiceClient with TokenCredential for user delegation key scenarios.
 * This is used for SAS generation tests that need to call getUserDelegationKey.
 */
export async function createTokenServiceClient(recorder: Recorder): Promise<ShareServiceClient> {
  const baseUrl = pickFileUrl("default");
  const client = new ShareServiceClient(baseUrl, createTestCredential());
  await ensureClientRecording(recorder, client);
  return client;
}

// ShareClient with SharedKeyCredential and SasConnectionString modes
export async function createShareClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareClientOptions, "credential" | "pipeline">,
): Promise<ShareClient>;
export async function createShareClient(
  mode: "SharedKeyCredential",
  inputs: Omit<CreateShareClientOptions, "credential" | "pipeline">,
): Promise<ShareClient | undefined>;
export async function createShareClient(
  mode: "SasConnectionString",
  inputs: Omit<CreateShareClientOptions, "credential" | "pipeline">,
): Promise<ShareClient | undefined>;
export async function createShareClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareClientOptions, "credential">,
): Promise<ShareClient>;
export async function createShareClient(
  mode: "Custom",
  inputs: Omit<CreateShareClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareClient>;
export async function createShareClient(
  mode: CreateClientModeNode,
  inputs: CreateShareClientOptions,
): Promise<ShareClient | undefined>;
export async function createShareClient(
  mode: CreateClientModeNode,
  inputs: CreateShareClientOptions,
): Promise<ShareClient | undefined> {
  const { shareName, options, recorder, account = "default" } = inputs;

  switch (mode) {
    case "TokenCredential":
      return createShareClientWithSecureAuth("TokenCredential", {
        shareName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createShareClientWithSecureAuth("Pipeline", {
        shareName,
        recorder,
        pipeline: inputs.pipeline,
        account,
        options,
      });
    case "Custom":
      return createShareClientWithSecureAuth("Custom", {
        shareName,
        recorder,
        credential: inputs.credential,
        account,
        options,
      });
    case "SharedKeyCredential": {
      const baseUrl = pickFileUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${shareName}`;
      const sharedKeyCred = getSharedKeyCredential(account);
      if (!sharedKeyCred) {
        return undefined;
      }
      const client = new ShareClient(url, sharedKeyCred, options);
      await ensureClientRecording(recorder, client);
      return client;
    }
    case "SasConnectionString": {
      const connString = pickSasConnectionString(account);
      if (!connString) {
        return undefined;
      }
      const client = new ShareClient(connString, shareName, options);
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}

// ShareDirectoryClient with SharedKeyCredential mode
export async function createShareDirectoryClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential" | "pipeline">,
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: "SharedKeyCredential",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential" | "pipeline">,
): Promise<ShareDirectoryClient | undefined>;
export async function createShareDirectoryClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential">,
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: "Custom",
  inputs: Omit<CreateShareDirectoryClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareDirectoryClient>;
export async function createShareDirectoryClient(
  mode: CreateClientModeNode,
  inputs: CreateShareDirectoryClientOptions,
): Promise<ShareDirectoryClient | undefined>;
export async function createShareDirectoryClient(
  mode: CreateClientModeNode,
  inputs: CreateShareDirectoryClientOptions,
): Promise<ShareDirectoryClient | undefined> {
  const { shareName, directoryName, options, recorder, account = "default" } = inputs;

  switch (mode) {
    case "TokenCredential":
      return createShareDirectoryClientWithSecureAuth("TokenCredential", {
        shareName,
        directoryName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createShareDirectoryClientWithSecureAuth("Pipeline", {
        shareName,
        directoryName,
        recorder,
        pipeline: inputs.pipeline,
        account,
        options,
      });
    case "Custom":
      return createShareDirectoryClientWithSecureAuth("Custom", {
        shareName,
        directoryName,
        recorder,
        credential: inputs.credential,
        account,
        options,
      });
    case "SharedKeyCredential": {
      const baseUrl = pickFileUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${shareName}/${directoryName}`;
      const sharedKeyCred = getSharedKeyCredential(account);
      if (!sharedKeyCred) {
        return undefined;
      }
      const client = new ShareDirectoryClient(url, sharedKeyCred, options);
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}

// ShareFileClient with SharedKeyCredential mode
export async function createShareFileClient(
  mode: "TokenCredential",
  inputs: Omit<CreateShareFileClientOptions, "credential" | "pipeline">,
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: "SharedKeyCredential",
  inputs: Omit<CreateShareFileClientOptions, "credential" | "pipeline">,
): Promise<ShareFileClient | undefined>;
export async function createShareFileClient(
  mode: "Pipeline",
  inputs: Omit<CreateShareFileClientOptions, "credential">,
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: "Custom",
  inputs: Omit<CreateShareFileClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<ShareFileClient>;
export async function createShareFileClient(
  mode: CreateClientModeNode,
  inputs: CreateShareFileClientOptions,
): Promise<ShareFileClient | undefined>;
export async function createShareFileClient(
  mode: CreateClientModeNode,
  inputs: CreateShareFileClientOptions,
): Promise<ShareFileClient | undefined> {
  const { shareName, directoryName, fileName, options, recorder, account = "default" } = inputs;

  switch (mode) {
    case "TokenCredential":
      return createShareFileClientWithSecureAuth("TokenCredential", {
        shareName,
        directoryName,
        fileName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createShareFileClientWithSecureAuth("Pipeline", {
        shareName,
        directoryName,
        fileName,
        recorder,
        pipeline: inputs.pipeline,
        account,
        options,
      });
    case "Custom":
      return createShareFileClientWithSecureAuth("Custom", {
        shareName,
        directoryName,
        fileName,
        recorder,
        credential: inputs.credential,
        account,
        options,
      });
    case "SharedKeyCredential": {
      const baseUrl = pickFileUrl(account);
      const sep = baseUrl.endsWith("/") ? "" : "/";
      const url = `${baseUrl}${sep}${shareName}/${directoryName}/${fileName}`;
      const sharedKeyCred = getSharedKeyCredential(account);
      if (!sharedKeyCred) {
        return undefined;
      }
      const client = new ShareFileClient(url, sharedKeyCred, options);
      await ensureClientRecording(recorder, client);
      return client;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }
}
