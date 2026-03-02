// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shared utilities for sample tests.
 */

import type { Recorder, TestInfo } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isLiveMode } from "@azure-tools/test-recorder";
import {
  createRecorder as baseCreateRecorder,
  testPollingOptions,
} from "../../utils/recordedClient.js";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { EnvVarKeys } from "../../../utils/constants.js";
import path from "node:path";
import { fileURLToPath } from "url";
import {
  BlobServiceClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to assets (example data files)
export const ASSETS_PATH = path.resolve(__dirname, "../../../../samples/assets");

// Test URLs for samples
export const TEST_INVOICE_URL =
  "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";
export const TEST_DOCUMENT_URL =
  "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_docs.pdf";
export const TEST_VIDEO_URL =
  "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4";
export const TEST_AUDIO_URL =
  "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";
export const TEST_IMAGE_URL =
  "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/image/pieChart.jpg";

// Re-export utilities
export { testPollingOptions, isLiveMode };

/**
 * Helper to get a sample file path from assets
 */
export function getSampleFilePath(filename: string): string {
  return path.join(ASSETS_PATH, filename);
}

/**
 * Create a recorder for sample tests
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = await baseCreateRecorder(context);
  // Use CustomDefaultMatcher with excluded headers to allow recordings made with either
  // API key auth (Ocp-Apim-Subscription-Key) or AAD auth (Authorization) to work in playback
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: ["Authorization", "Ocp-Apim-Subscription-Key"],
    ignoredHeaders: ["Content-Length"],
    compareBodies: false,
  });
  return recorder;
}

/**
 * Create a Content Understanding client for sample tests
 */
export function createClient(recorder: Recorder): ContentUnderstandingClient {
  const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
  const key = process.env[EnvVarKeys.KEY];
  return new ContentUnderstandingClient(
    endpoint,
    key ? new AzureKeyCredential(key) : createTestCredential(),
    recorder.configureClientOptions({}),
  );
}

/**
 * Get a SAS URL pointing to a blob container with labeled training data.
 *
 * The test only needs the URL — the CU service reads blobs server-side.
 * Training data is assumed to already exist in the container (upload via
 * the sample or manually beforehand). In playback mode the sanitized URL
 * placeholder from envSetupForPlayback is sufficient since the test proxy
 * replays recorded responses.
 *
 * Must be called before the recorder starts (e.g. in beforeAll), otherwise
 * Azure Storage SDK calls get routed through the test proxy and hang.
 */
export async function resolveTrainingDataSasUrl(): Promise<string | undefined> {
  // Option A: Pre-configured SAS URL
  const sasUrl = process.env[EnvVarKeys.TRAINING_DATA_SAS_URL];
  if (sasUrl) {
    return sasUrl;
  }

  // Option B: Generate User Delegation SAS from storage account + container
  const storageAccount = process.env[EnvVarKeys.TRAINING_DATA_STORAGE_ACCOUNT];
  const container = process.env[EnvVarKeys.TRAINING_DATA_CONTAINER];
  if (storageAccount && container) {
    const credential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net`,
      credential,
    );
    const startsOn = new Date();
    const expiresOn = new Date(startsOn.getTime() + 60 * 60 * 1000); // 1 hour
    const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: container,
        permissions: ContainerSASPermissions.parse("rl"),
        expiresOn,
      },
      userDelegationKey,
      storageAccount,
    ).toString();
    return `https://${storageAccount}.blob.core.windows.net/${container}?${sasToken}`;
  }

  return undefined;
}
