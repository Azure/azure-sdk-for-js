// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  type AnonymousCredential,
  QueueClient,
  QueueServiceClient,
  newPipeline,
  type Pipeline,
  type StoragePipelineOptions,
} from "../../../src/index.js";
import { getAccountQueueUrl } from "../../utils/injectables.js";

import { ensureClientRecording } from "./recorder.js";
import type { TokenCredential } from "@azure/core-auth";

export type TestAccountKind = "default";

const createClientModes = ["TokenCredential", "Pipeline", "Custom"] as const;

export type CreateClientMode = (typeof createClientModes)[number];

export function pickQueueUrl(kind: TestAccountKind): string {
  switch (kind) {
    default:
      return getAccountQueueUrl();
  }
}

export interface CreateQueueClientOptions {
  queueName: string;
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
}

export async function createQueueClient(
  mode: "TokenCredential",
  inputs: Omit<CreateQueueClientOptions, "credential" | "pipeline">,
): Promise<QueueClient>;
export async function createQueueClient(
  mode: "Custom",
  inputs: Omit<CreateQueueClientOptions, "credential"> & {
    credential: TokenCredential | AnonymousCredential | undefined;
  },
): Promise<QueueClient>;
export async function createQueueClient(
  mode: "Pipeline",
  inputs: Omit<CreateQueueClientOptions, "credential">,
): Promise<QueueClient>;
export async function createQueueClient(
  mode: CreateClientMode,
  inputs: CreateQueueClientOptions,
): Promise<QueueClient> {
  const { queueName, options, recorder, credential, pipeline, account = "default" } = inputs;

  const baseUrl = pickQueueUrl(account);
  const sep = baseUrl.endsWith("/") ? "" : "/";
  const url = `${baseUrl}${sep}${queueName}`;
  let client: QueueClient;
  switch (mode) {
    case "TokenCredential":
      client = new QueueClient(url, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new QueueClient(url, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new QueueClient(url, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }

  await ensureClientRecording(recorder, client);

  return client;
}

export interface CreateQueueServiceClientOptions {
  recorder?: Recorder;
  account?: TestAccountKind;
  options?: StoragePipelineOptions;
  pipeline?: Pipeline;
  credential?: TokenCredential | AnonymousCredential;
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
  inputs: CreateQueueServiceClientOptions = {},
): Promise<QueueServiceClient> {
  const { recorder, options, credential, pipeline, account = "default" } = inputs;
  const baseUrl = pickQueueUrl(account);
  let client: QueueServiceClient;
  switch (mode) {
    case "TokenCredential":
      client = new QueueServiceClient(baseUrl, createTestCredential(), options);
      break;
    case "Pipeline":
      client = new QueueServiceClient(baseUrl, pipeline ?? newPipeline(createTestCredential()));
      break;
    case "Custom":
      client = new QueueServiceClient(baseUrl, credential, options);
      break;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
  await ensureClientRecording(recorder, client);
  return client;
}
