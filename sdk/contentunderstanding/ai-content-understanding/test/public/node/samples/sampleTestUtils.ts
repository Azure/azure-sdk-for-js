// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shared utilities for sample tests.
 */

import type { Recorder, TestInfo } from "@azure-tools/test-recorder";
import {
  createRecorder as baseCreateRecorder,
  testPollingOptions,
} from "../../utils/recordedClient.js";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { getEndpoint, getKey, isLiveMode } from "../../../utils/injectables.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import path from "node:path";
import { fileURLToPath } from "url";

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
  const key = getKey();
  return new ContentUnderstandingClient(
    getEndpoint(),
    key ? new AzureKeyCredential(key) : createTestCredential(),
    recorder.configureClientOptions({}),
  );
}
