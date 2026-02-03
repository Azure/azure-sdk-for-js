// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnonymousCredential,
  QueueClient,
  QueueServiceClient,
  StorageSharedKeyCredential,
} from "../../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import {
  getAccountKey,
  getAccountName,
  getAccountSas,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../injectables.js";
import {
  type TestAccountKind,
  type CreateQueueClientOptions,
  type CreateQueueServiceClientOptions,
  createQueueClient as createQueueClientWithSecureAuth,
  createQueueServiceClient as createQueueServiceClientWithSecureAuth,
  pickQueueUrl,
} from "../clients.js";
import { ensureClientRecording } from "../../utils/recorder.js";

function pickSas(kind: TestAccountKind): string | undefined {
  switch (kind) {
    default:
      return getAccountSas();
  }
}

function pickConnString(kind: TestAccountKind): string | undefined {
  switch (kind) {
    default:
      return getStorageConnectionString();
  }
}

function pickConnStringWithSas(kind: TestAccountKind): string | undefined {
  switch (kind) {
    default:
      return getStorageConnectionStringWithSas();
  }
}

function pickName(kind: TestAccountKind): string {
  switch (kind) {
    default:
      return getAccountName();
  }
}

function pickKey(kind: TestAccountKind): string | undefined {
  switch (kind) {
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

export async function createQueueClient(
  mode: "TokenCredential",
  inputs: Omit<CreateQueueClientOptions, "credential" | "pipeline">,
): Promise<QueueClient>;
export async function createQueueClient(
  mode: "Custom",
  inputs: Omit<CreateQueueClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential;
  },
): Promise<QueueClient>;
export async function createQueueClient(
  mode: "Pipeline",
  inputs: Omit<CreateQueueClientOptions, "credential">,
): Promise<QueueClient>;
export async function createQueueClient(
  mode: CreateClientMode,
  inputs: CreateQueueClientOptions,
): Promise<QueueClient | undefined>;
export async function createQueueClient(
  mode: CreateClientMode,
  inputs: CreateQueueClientOptions,
): Promise<QueueClient | undefined> {
  const { queueName, recorder, credential, pipeline, account = "default", options } = inputs;
  const name = pickName(account);
  const url = pickQueueUrl(account);
  const sep = url.endsWith("/") ? "" : "/";
  const urlWithoutSas = `${url}${sep}${queueName}`;
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);

  let client: QueueClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createQueueClientWithSecureAuth(mode, {
        queueName,
        recorder,
        account,
        options,
      });
    case "Pipeline":
      return createQueueClientWithSecureAuth(mode, {
        queueName,
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      if (!credential) {
        throw new Error("Custom mode requires a credential");
      }
      return createQueueClientWithSecureAuth(mode, {
        queueName,
        recorder,
        credential,
        account,
        options,
      });
    case "AccountConnectionString": {
      if (!cs) return undefined;
      client = new QueueClient(cs, queueName, options);
      break;
    }
    case "SASToken": {
      if (!sas) return undefined;
      client = new QueueClient(`${urlWithoutSas}?${sas}`, new AnonymousCredential(), options);
      break;
    }
    case "AccountKey": {
      if (!key) return undefined;
      client = new QueueClient(urlWithoutSas, new StorageSharedKeyCredential(name, key), options);
      break;
    }
    case "SASConnectionString": {
      if (!sasCs) return undefined;
      client = new QueueClient(sasCs, queueName, options);
      break;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
}

export async function createQueueServiceClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateQueueServiceClientOptions, "credential" | "pipeline">,
): Promise<QueueServiceClient>;
export async function createQueueServiceClient(
  mode: "Custom",
  inputs: Omit<CreateQueueServiceClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<QueueServiceClient>;
export async function createQueueServiceClient(
  mode: "Pipeline",
  inputs?: Omit<CreateQueueServiceClientOptions, "credential">,
): Promise<QueueServiceClient>;
export async function createQueueServiceClient(
  mode: CreateClientMode,
  inputs?: CreateQueueServiceClientOptions,
): Promise<QueueServiceClient | undefined>;
export async function createQueueServiceClient(
  mode: CreateClientMode,
  inputs: CreateQueueServiceClientOptions = {},
): Promise<QueueServiceClient | undefined> {
  const { recorder, credential, pipeline, account = "default", options } = inputs;
  const name = pickName(account);
  const url = pickQueueUrl(account);
  const cs = pickConnString(account);
  const sas = pickSas(account);
  const key = pickKey(account);
  const sasCs = pickConnStringWithSas(account);
  let client: QueueServiceClient | undefined;
  switch (mode) {
    case "TokenCredential":
      return createQueueServiceClientWithSecureAuth(mode, { recorder, account, options });
    case "Pipeline":
      return createQueueServiceClientWithSecureAuth(mode, {
        recorder,
        pipeline,
        account,
        options,
      });
    case "Custom":
      return createQueueServiceClientWithSecureAuth(mode, {
        recorder,
        credential,
        account,
        options,
      });
    case "SASConnectionString": {
      if (!sasCs) return undefined;
      client = QueueServiceClient.fromConnectionString(sasCs, options);
      break;
    }
    case "SASToken": {
      if (!sas) return undefined;
      client = new QueueServiceClient(`${url}?${sas}`, new AnonymousCredential(), options);
      break;
    }
    case "AccountKey": {
      if (!key) return undefined;
      client = new QueueServiceClient(url, new StorageSharedKeyCredential(name, key), options);
      break;
    }
    case "AccountConnectionString": {
      if (!cs) return undefined;
      client = QueueServiceClient.fromConnectionString(cs, options);
      break;
    }
    default:
      throw new Error(`Unknown authentication mode ${mode}`);
  }

  if (client) await ensureClientRecording(recorder, client);

  return client;
}
