// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { StoragePipelineOptions, Pipeline } from "@azure/storage-blob";
import { StorageSharedKeyCredential, newPipeline } from "@azure/storage-blob";
import type { TokenCredential } from "@azure/core-auth";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import {
  getAccountBlobUrl,
  getAccountName,
  getAccountKey,
  getDfsAccountBlobUrl,
} from "../injectables.js";
import { ensureClientRecording } from "./recorder.js";

export type TestAccountKind = "default" | "dfs";

const createClientModes = ["TokenCredential", "SharedKey", "Pipeline", "Custom"] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export function pickBlobUrl(kind: TestAccountKind): string {
  switch (kind) {
    case "dfs":
      return getDfsAccountBlobUrl();
    default:
      return getAccountBlobUrl();
  }
}

export interface CreateBlobChangeFeedClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | StorageSharedKeyCredential;
}

export async function createBlobChangeFeedClient(
  mode: "TokenCredential",
  inputs?: Omit<CreateBlobChangeFeedClientOptions, "credential" | "pipeline">,
): Promise<BlobChangeFeedClient>;
export async function createBlobChangeFeedClient(
  mode: "SharedKey",
  inputs?: Omit<CreateBlobChangeFeedClientOptions, "credential" | "pipeline">,
): Promise<BlobChangeFeedClient>;
export async function createBlobChangeFeedClient(
  mode: "Custom",
  inputs: Omit<CreateBlobChangeFeedClientOptions, "credential"> & {
    credential: TokenCredential | StorageSharedKeyCredential | undefined;
  },
): Promise<BlobChangeFeedClient>;
export async function createBlobChangeFeedClient(
  mode: "Pipeline",
  inputs?: Omit<CreateBlobChangeFeedClientOptions, "credential">,
): Promise<BlobChangeFeedClient>;
export async function createBlobChangeFeedClient(
  mode: CreateClientMode,
  inputs: CreateBlobChangeFeedClientOptions = {},
): Promise<BlobChangeFeedClient> {
  const { recorder, options, credential, pipeline, account = "default" } = inputs;

  const baseUrl = pickBlobUrl(account);
  let client: BlobChangeFeedClient;

  switch (mode) {
    case "TokenCredential":
      client = new BlobChangeFeedClient(baseUrl, createTestCredential(), options);
      break;
    case "SharedKey": {
      const accountName = getAccountName();
      const accountKey = getAccountKey();
      if (!accountKey) {
        throw new Error("SharedKey mode requires account key to be configured");
      }
      const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
      client = new BlobChangeFeedClient(baseUrl, sharedKeyCredential, options);
      break;
    }
    case "Pipeline":
      client = new BlobChangeFeedClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new BlobChangeFeedClient(baseUrl, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);

  return client;
}
