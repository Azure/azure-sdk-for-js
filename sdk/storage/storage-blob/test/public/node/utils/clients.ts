// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnonymousCredential,
  AppendBlobClient,
  BlobClient,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  PageBlobClient,
  newPipeline,
  type Pipeline,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import {
  ShareServiceClient,
  StorageSharedKeyCredential as FileStorageSharedKeyCredential,
  type ShareClientOptions,
} from "@azure/storage-file-share";
import type { Recorder } from "@azure-tools/test-recorder";
import {
  getAccountKey,
  getAccountName,
  getAccountSas,
  getDfsAccountSas,
  getDfsAccountName,
  getDfsAccountKey,
  getDfsSoftDeleteAccountSas,
  getDfsSoftDeleteAccountName,
  getDfsSoftDeleteAccountKey,
  getFullAccountSas,
  getFullAccountName,
  getFullAccountKey,
  getPremiumFileAccountSas,
  getPremiumFileAccountName,
  getPremiumFileAccountKey,
  getGrsAccountSas,
  getGrsAccountName,
  getGrsAccountKey,
  getSoftDeleteAccountSas,
  getSoftDeleteAccountName,
  getSoftDeleteAccountKey,
  getDfsStorageConnectionString,
  getDfsSoftDeleteStorageConnectionString,
  getFullStorageConnectionString,
  getPremiumFileStorageConnectionString,
  getGrsStorageConnectionString,
  getStorageConnectionString,
  getSoftDeleteStorageConnectionString,
  getDfsStorageConnectionStringWithSas,
  getDfsSoftDeleteStorageConnectionStringWithSas,
  getFullStorageConnectionStringWithSas,
  getPremiumFileStorageConnectionStringWithSas,
  getGrsStorageConnectionStringWithSas,
  getSoftDeleteStorageConnectionStringWithSas,
  getStorageConnectionStringWithSas,
  getAccountFileUrl,
  getDfsAccountFileUrl,
  getDfsSoftDeleteAccountFileUrl,
  getFullAccountFileUrl,
  getPremiumFileAccountFileUrl,
  getGrsAccountFileUrl,
  getSoftDeleteAccountFileUrl,
  getOrDestAccountFileUrl,
  getOrDestAccountSas,
  getOrDestStorageConnectionString,
  getOrDestStorageConnectionStringWithSas,
  getOrDestAccountName,
  getOrDestAccountKey,
  getGrsAccountSecondaryFileUrl,
} from "../../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";

import {
  type TestAccountKind,
  type CreateBlobClientOptions,
  type CreateBlobServiceClientOptions,
  createBlobClient as createBlobClientWithSecureAuth,
  createBlobServiceClient as createBlobServiceClientWithSecureAuth,
  createAppendBlobClient as createAppendBlobClientWithSecureAuth,
  createBlockBlobClient as createBlockBlobClientWithSecureAuth,
  createContainerClient as createContainerClientWithSecureAuth,
  createPageBlobClient as createPageBlobClientWithSecureAuth,
  pickBlobUrl,
  type CreateContainerClientOptions,
} from "../../utils/clients.js";
import { ensureClientRecording } from "../../utils/recorder.js";
import type { TokenCredential } from "@azure/core-auth";

function pickFileUrl(kind: TestAccountKind): string {
  switch (kind) {
    case "dfs":
      return getDfsAccountFileUrl();
    case "dfsSoftDelete":
      return getDfsSoftDeleteAccountFileUrl();
    case "full":
      return getFullAccountFileUrl();
    case "softDelete":
      return getSoftDeleteAccountFileUrl();
    case "premiumFile":
      return getPremiumFileAccountFileUrl();
    case "grs":
      return getGrsAccountFileUrl();
    case "grsSecondary":
      return getGrsAccountSecondaryFileUrl();
    case "objectReplication":
      return getOrDestAccountFileUrl();
    default:
      return getAccountFileUrl();
  }
}

function pickSas(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "dfs":
      return getDfsAccountSas();
    case "dfsSoftDelete":
      return getDfsSoftDeleteAccountSas();
    case "full":
      return getFullAccountSas();
    case "softDelete":
      return getSoftDeleteAccountSas();
    case "premiumFile":
      return getPremiumFileAccountSas();
    case "grs":
      return getGrsAccountSas();
    case "grsSecondary":
      throw new Error("grsSecondary account kind is not supported in SAS token");
    case "objectReplication":
      return getOrDestAccountSas();
    default:
      return getAccountSas();
  }
}

function pickConnString(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "dfs":
      return getDfsStorageConnectionString();
    case "dfsSoftDelete":
      return getDfsSoftDeleteStorageConnectionString();
    case "full":
      return getFullStorageConnectionString();
    case "softDelete":
      return getSoftDeleteStorageConnectionString();
    case "premiumFile":
      return getPremiumFileStorageConnectionString();
    case "grs":
      return getGrsStorageConnectionString();
    case "grsSecondary":
      throw new Error("grsSecondary account kind is not supported in connection string");
    case "objectReplication":
      return getOrDestStorageConnectionString();
    default:
      return getStorageConnectionString();
  }
}

function pickConnStringWithSas(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "dfs":
      return getDfsStorageConnectionStringWithSas();
    case "dfsSoftDelete":
      return getDfsSoftDeleteStorageConnectionStringWithSas();
    case "full":
      return getFullStorageConnectionStringWithSas();
    case "softDelete":
      return getSoftDeleteStorageConnectionStringWithSas();
    case "premiumFile":
      return getPremiumFileStorageConnectionStringWithSas();
    case "grs":
      return getGrsStorageConnectionStringWithSas();
    case "grsSecondary":
      throw new Error("grsSecondary account kind is not supported in connection string");
    case "objectReplication":
      return getOrDestStorageConnectionStringWithSas();
    default:
      return getStorageConnectionStringWithSas();
  }
}

function pickName(kind: TestAccountKind): string {
  switch (kind) {
    case "dfs":
      return getDfsAccountName();
    case "dfsSoftDelete":
      return getDfsSoftDeleteAccountName();
    case "full":
      return getFullAccountName();
    case "softDelete":
      return getSoftDeleteAccountName();
    case "premiumFile":
      return getPremiumFileAccountName();
    case "objectReplication":
      return getOrDestAccountName();
    case "grs":
      return getGrsAccountName();
    case "grsSecondary":
      return getGrsAccountName();
    default:
      return getAccountName();
  }
}

function pickKey(kind: TestAccountKind): string | undefined {
  switch (kind) {
    case "dfs":
      return getDfsAccountKey();
    case "dfsSoftDelete":
      return getDfsSoftDeleteAccountKey();
    case "full":
      return getFullAccountKey();
    case "softDelete":
      return getSoftDeleteAccountKey();
    case "premiumFile":
      return getPremiumFileAccountKey();
    case "objectReplication":
      return getOrDestAccountKey();
    case "grs":
      return getGrsAccountKey();
    case "grsSecondary":
      throw new Error("grsSecondary account kind is not supported in account key");
    default:
      return getAccountKey();
  }
}

const createClientModes = [
  "SASConnectionString",
  "SASToken",
  "AccountKey",
  "AccountConnectionString",
  "TokenCredential",
  "Pipeline",
  "Custom",
] as const;

export type CreateClientMode = (typeof createClientModes)[number];

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
): Promise<AppendBlobClient | undefined>;
export async function createAppendBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<AppendBlobClient | undefined> {
  const {
    blobName,
    containerName,
    recorder,
    credential,
    pipeline,
    account = "default",
    options,
  } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${containerName}/${blobName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);

  let client: AppendBlobClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createAppendBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createAppendBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      if (!credential) {
        throw new Error("Custom mode requires a credential");
      }
      return createAppendBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        credential,
        account,
        options,
      });
    case "AccountConnectionString": {
      if (!cs) return undefined;
      client = new AppendBlobClient(cs, containerName, blobName, options);
      break;
    }
    case "SASToken": {
      if (!sas) return undefined;
      client = new AppendBlobClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    }
    case "AccountKey": {
      if (!key) return undefined;
      client = new AppendBlobClient(
        urlWithoutSas,
        new StorageSharedKeyCredential(name, key),
        options,
      );
      break;
    }
    case "SASConnectionString": {
      if (!sasCs) return undefined;
      client = new AppendBlobClient(sasCs, containerName, blobName, options);
      break;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
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
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<BlobClient | undefined>;
export async function createBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<BlobClient | undefined> {
  const {
    blobName,
    containerName,
    recorder,
    credential,
    pipeline,
    account = "default",
    options,
  } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${containerName}/${blobName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: BlobClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      return createBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        credential,
        account,
        options,
      });
    case "AccountConnectionString":
      if (!cs) return undefined;
      client = new BlobClient(cs, containerName, blobName, options);
      break;
    case "SASToken":
      if (!sas) return undefined;
      client = new BlobClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    case "AccountKey":
      if (!key) return undefined;
      client = new BlobClient(urlWithoutSas, new StorageSharedKeyCredential(name, key), options);
      break;
    case "SASConnectionString":
      if (!sasCs) return undefined;
      client = new BlobClient(sasCs, containerName, blobName, options);
      break;
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
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
  inputs?: CreateBlobServiceClientOptions,
): Promise<BlobServiceClient | undefined>;
export async function createBlobServiceClient(
  mode: CreateClientMode,
  inputs: CreateBlobServiceClientOptions = {},
): Promise<BlobServiceClient | undefined> {
  const { recorder, credential, pipeline, account = "default", options } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: BlobServiceClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createBlobServiceClientWithSecureAuth(mode, { recorder, account, options });
    case "Pipeline":
      return createBlobServiceClientWithSecureAuth(mode, { recorder, pipeline, account, options });
    case "Custom":
      return createBlobServiceClientWithSecureAuth(mode, {
        recorder,
        credential,
        account,
        options,
      });
    case "SASConnectionString": {
      if (!sasCs) return undefined;
      client = BlobServiceClient.fromConnectionString(sasCs, options);
      break;
    }
    case "SASToken": {
      if (!sas) return undefined;
      client = new BlobServiceClient(`${url}?${sas}`, new AnonymousCredential(), options);
      break;
    }
    case "AccountKey": {
      if (!key) return undefined;
      client = new BlobServiceClient(url, new StorageSharedKeyCredential(name, key), options);
      break;
    }
    case "AccountConnectionString": {
      if (!cs) return undefined;
      client = BlobServiceClient.fromConnectionString(cs, options);
      break;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
}

export interface CreateShareServiceClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: ShareClientOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createShareServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateShareServiceClientOptions, "credential" | "pipeline">,
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "Custom",
  inputs: Omit<CreateShareServiceClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: "Pipeline",
  inputs?: Omit<CreateShareServiceClientOptions, "credential">,
): Promise<ShareServiceClient>;
export async function createShareServiceClient(
  mode: CreateClientMode,
  inputs?: CreateShareServiceClientOptions,
): Promise<ShareServiceClient | undefined>;
export async function createShareServiceClient(
  mode: CreateClientMode,
  inputs: CreateShareServiceClientOptions = {},
): Promise<ShareServiceClient | undefined> {
  const { recorder, credential, pipeline, account = "default", options } = inputs;
  const name = pickName(account);
  const baseUrl = pickFileUrl(account);
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: ShareServiceClient | undefined;
  switch (mode) {
    case "TokenCredential": {
      client = new ShareServiceClient(baseUrl, createTestCredential(), options);
      break;
    }
    case "Pipeline": {
      client = new ShareServiceClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    }
    case "Custom": {
      client = new ShareServiceClient(baseUrl, credential, options);
      break;
    }
    case "SASConnectionString": {
      if (!sasCs) return undefined;
      client = ShareServiceClient.fromConnectionString(sasCs, options);
      break;
    }
    case "SASToken": {
      if (!sas) return undefined;
      client = new ShareServiceClient(`${baseUrl}?${sas}`, new AnonymousCredential(), options);
      break;
    }
    case "AccountKey": {
      if (!key) return undefined;
      client = new ShareServiceClient(
        baseUrl,
        new FileStorageSharedKeyCredential(name, key),
        options,
      );
      break;
    }
    case "AccountConnectionString": {
      if (!cs) return undefined;
      client = ShareServiceClient.fromConnectionString(cs, options);
      break;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

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
): Promise<BlockBlobClient | undefined>;
export async function createBlockBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<BlockBlobClient | undefined> {
  const {
    blobName,
    containerName,
    recorder,
    credential,
    pipeline,
    account = "default",
    options,
  } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${containerName}/${blobName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: BlockBlobClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createBlockBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createBlockBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
        pipeline,
      });
    case "Custom":
      return createBlockBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
        credential,
      });
    case "AccountConnectionString":
      if (!cs) return undefined;
      client = new BlockBlobClient(cs, containerName, blobName, options);
      break;
    case "SASToken":
      if (!sas) return undefined;
      client = new BlockBlobClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    case "AccountKey":
      if (!key) return undefined;
      client = new BlockBlobClient(
        urlWithoutSas,
        new StorageSharedKeyCredential(name, key),
        options,
      );
      break;
    case "SASConnectionString":
      if (!sasCs) return undefined;
      client = new BlockBlobClient(sasCs, containerName, blobName, options);
      break;
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
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
): Promise<ContainerClient | undefined>;
export async function createContainerClient(
  mode: CreateClientMode,
  inputs: CreateContainerClientOptions,
): Promise<ContainerClient | undefined> {
  const { containerName, recorder, credential, pipeline, account = "default", options } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${containerName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: ContainerClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createContainerClientWithSecureAuth(mode, {
        containerName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createContainerClientWithSecureAuth(mode, {
        containerName,
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      return createContainerClientWithSecureAuth(mode, {
        containerName,
        recorder,
        credential,
        account,
        options,
      });
    case "AccountConnectionString":
      if (!cs) return undefined;
      client = new ContainerClient(cs, containerName, options);
      break;
    case "SASToken":
      if (!sas) return undefined;
      client = new ContainerClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    case "AccountKey":
      if (!key) return undefined;
      client = new ContainerClient(
        urlWithoutSas,
        new StorageSharedKeyCredential(name, key),
        options,
      );
      break;
    case "SASConnectionString":
      if (!sasCs) return undefined;
      client = new ContainerClient(sasCs, containerName, options);
      break;
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);
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
): Promise<PageBlobClient | undefined>;
export async function createPageBlobClient(
  mode: CreateClientMode,
  inputs: CreateBlobClientOptions,
): Promise<PageBlobClient | undefined> {
  const {
    blobName,
    containerName,
    recorder,
    credential,
    pipeline,
    account = "default",
    options,
  } = inputs;
  const name = pickName(account);
  const url = pickBlobUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${containerName}/${blobName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: PageBlobClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createPageBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createPageBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      return createPageBlobClientWithSecureAuth(mode, {
        blobName,
        containerName,
        recorder,
        credential,
        account,
        options,
      });
    case "AccountConnectionString":
      if (!cs) return undefined;
      client = new PageBlobClient(cs, containerName, blobName, options);
      break;
    case "SASToken":
      if (!sas) return undefined;
      client = new PageBlobClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    case "AccountKey":
      if (!key) return undefined;
      client = new PageBlobClient(
        urlWithoutSas,
        new StorageSharedKeyCredential(name, key),
        options,
      );
      break;
    case "SASConnectionString":
      if (!sasCs) return undefined;
      client = new PageBlobClient(sasCs, containerName, blobName, options);
      break;
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);
  return client;
}
