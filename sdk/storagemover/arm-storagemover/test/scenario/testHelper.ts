// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { createTestCredential } from "@azure-tools/test-credential";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  type Endpoint,
  type Project,
  type StorageMover,
  StorageMoverClient,
} from "../../src/index.js";

/**
 * Constants from the cross-language scenario-tests playbook.
 *
 * These values match the .NET source-of-truth `StorageMoverManagementTestBase.cs`
 * so test bodies stay 1:1 with the .NET reference suite.
 */
export const TEST_LOCATION = "eastus";
export const STORAGE_ACCOUNT_NAME = "testsmstore24";
export const CONTAINER_NAME = "testsmcontainer";
export const MULTI_CLOUD_CONNECTOR_ID =
  "/subscriptions/b6b34ad8-ca89-4f85-beb7-c2ec13702dac/resourceGroups/E2E-Management-RGsyn/providers/Microsoft.HybridConnectivity/publicCloudConnectors/e2e-sm-rp-connector";
export const AWS_S3_BUCKET_ID =
  "/subscriptions/b6b34ad8-ca89-4f85-beb7-c2ec13702dac/resourceGroups/aws_640698235822/providers/Microsoft.AWSConnector/s3Buckets/e2e-sm-rp-bucket";

/**
 * Subscription ID used in playback mode. Real subscription IDs are sanitized to
 * this value by the test-proxy.
 */
const PLAYBACK_SUBSCRIPTION_ID = "azure_subscription_id";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: PLAYBACK_SUBSCRIPTION_ID,
  AZURE_SUBSCRIPTION_ID: PLAYBACK_SUBSCRIPTION_ID,
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body — resource names are not secrets here
    "AZSDK3430", // .id in the body — resource IDs are not secrets here
  ],
};

/**
 * Polling options used by all LROs to make playback near-instant while keeping
 * default backoff during live runs.
 */
export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

/**
 * Returns the subscription ID in a way that works in both playback and live mode.
 *
 * In playback the recorder substitutes `SUBSCRIPTION_ID` with `azure_subscription_id`
 * before the test body runs; in record/live mode the real env var is used.
 */
export function getSubscriptionId(): string {
  return env.SUBSCRIPTION_ID ?? env.AZURE_SUBSCRIPTION_ID ?? PLAYBACK_SUBSCRIPTION_ID;
}

/**
 * Bootstraps a Recorder, the StorageMoverClient, and the subscription ID used
 * by the rest of the test. Call this from a vitest `beforeEach`.
 *
 * The Recorder is constructed eagerly so callers can always call `.stop()` on
 * it even if `start()` later throws (e.g. when a recording file is missing in
 * playback mode).
 */
export async function setupRecorder(ctx: TestInfo): Promise<{
  recorder: Recorder;
  client: StorageMoverClient;
  subscriptionId: string;
}> {
  const recorder = new Recorder(ctx);
  try {
    await recorder.start(recorderOptions);
  } catch (err) {
    // Best-effort: try to stop the recorder so it doesn't dangle, then rethrow
    // so the test fails with the original (more useful) error.
    try {
      await recorder.stop();
    } catch {
      /* ignore secondary failure */
    }
    throw err;
  }
  const subscriptionId = getSubscriptionId();
  const client = new StorageMoverClient(
    createTestCredential(),
    subscriptionId,
    recorder.configureClientOptions({}),
  );
  return { recorder, client, subscriptionId };
}

/**
 * Generates a deterministic-in-playback name for a child resource.
 *
 * The first call (record/live) stores `${prefix}${randomHex(8)}` against `key`.
 * Subsequent calls — and all playback calls — return the recorded value.
 */
export function nameFor(recorder: Recorder, key: string, prefix: string): string {
  return recorder.variable(key, `${prefix}${randomHex(8)}`);
}

/**
 * Returns an ISO-8601 timestamp `daysFromNow` days from now (`Z` suffix), recorded
 * via the recorder so playback uses the recorded value verbatim. Mirrors the Python
 * port's `variables.setdefault("schedule_start", …)` pattern.
 */
export function isoDate(recorder: Recorder, key: string, daysFromNow: number): string {
  const now = Date.now();
  return recorder.variable(key, new Date(now + daysFromNow * 24 * 60 * 60 * 1000).toISOString());
}

/** Hex string of `bytes` random bytes — JS analogue of NUnit's `GenerateAssetName` suffix. */
function randomHex(bytes: number): string {
  let s = "";
  for (let i = 0; i < bytes; i++) {
    s += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  }
  return s;
}

/**
 * Creates a resource group via `@azure/arm-resources`. No-op in playback (the
 * test-proxy replays the SDK calls; we don't need a real RG for playback).
 *
 * `rgName` is hardcoded per spec file so it's stable across record and playback
 * runs without needing to be threaded through `recorder.variable` (the matching
 * pattern used by `sdk/batch/arm-batch` and other existing JS mgmt scenario suites).
 */
export async function provisionResourceGroup(
  subscriptionId: string,
  rgName: string,
): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }
  const rgClient = new ResourceManagementClient(createTestCredential(), subscriptionId);
  await rgClient.resourceGroups.createOrUpdate(rgName, { location: TEST_LOCATION });
}

/** Best-effort RG delete; no-op in playback. Logs (does not throw) on failure. */
export async function deleteResourceGroup(subscriptionId: string, rgName: string): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }
  try {
    const rgClient = new ResourceManagementClient(createTestCredential(), subscriptionId);
    await rgClient.resourceGroups.beginDeleteAndWait(rgName);
  } catch (err) {
    // RG cleanup is best-effort: do not fail the test run.
    // eslint-disable-next-line no-console
    console.warn(`Failed to delete resource group ${rgName}: ${(err as Error).message}`);
  }
}

/** Wraps `client.storageMovers.createOrUpdate` with sensible defaults. */
export async function createStorageMover(
  client: StorageMoverClient,
  rgName: string,
  storageMoverName: string,
  description = "scenario-test storage mover",
  tags?: Record<string, string>,
): Promise<StorageMover> {
  return client.storageMovers.createOrUpdate(rgName, storageMoverName, {
    location: TEST_LOCATION,
    tags,
    properties: { description },
  });
}

/** Wraps `client.projects.createOrUpdate` with sensible defaults. */
export async function createProject(
  client: StorageMoverClient,
  rgName: string,
  storageMoverName: string,
  projectName: string,
  description?: string,
): Promise<Project> {
  return client.projects.createOrUpdate(rgName, storageMoverName, projectName, {
    properties: description ? { description } : {},
  });
}

/**
 * Wraps `client.endpoints.createOrUpdate` for an Azure Storage blob container
 * endpoint pointing at the playbook's `STORAGE_ACCOUNT_NAME` placeholder.
 */
export async function createBlobEndpoint(
  client: StorageMoverClient,
  rgName: string,
  storageMoverName: string,
  endpointName: string,
  subscriptionId: string,
  description = "scenario-test blob endpoint",
): Promise<Endpoint> {
  return client.endpoints.createOrUpdate(rgName, storageMoverName, endpointName, {
    properties: {
      endpointType: "AzureStorageBlobContainer",
      storageAccountResourceId: storageAccountResourceIdFor(subscriptionId, rgName),
      blobContainerName: CONTAINER_NAME,
      description,
    },
  });
}

/** Wraps `client.endpoints.createOrUpdate` for an NFS-mount endpoint. */
export async function createNfsEndpoint(
  client: StorageMoverClient,
  rgName: string,
  storageMoverName: string,
  endpointName: string,
  description = "scenario-test NFS endpoint",
): Promise<Endpoint> {
  return client.endpoints.createOrUpdate(rgName, storageMoverName, endpointName, {
    properties: {
      endpointType: "NfsMount",
      host: "10.0.0.1",
      export: "/",
      description,
    },
  });
}

/** Best-effort delete for a Storage Mover. Awaits the LRO. */
export async function deleteStorageMover(
  client: StorageMoverClient,
  rgName: string,
  storageMoverName: string,
): Promise<void> {
  const poller = client.storageMovers.delete(rgName, storageMoverName);
  await poller.pollUntilDone();
}

/** Convenience: builds the full resource ID of a storage account. */
export function storageAccountResourceIdFor(
  subscriptionId: string,
  rgName: string,
  accountName: string = STORAGE_ACCOUNT_NAME,
): string {
  return (
    `/subscriptions/${subscriptionId}/resourceGroups/${rgName}` +
    `/providers/Microsoft.Storage/storageAccounts/${accountName}`
  );
}
