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
import fs from "node:fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to sample files
export const SAMPLE_FILES_PATH = path.resolve(__dirname, "../../../../sample_files");
export const SAMPLES_DEV_EXAMPLE_DATA_PATH = path.resolve(
  __dirname,
  "../../../../samples-dev/example-data",
);

// Test URLs for samples
export const TEST_INVOICE_URL =
  "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";
export const TEST_VIDEO_URL =
  "https://github.com/Azure-Samples/azure-ai-content-understanding-assets/raw/refs/heads/main/videos/sdk_samples/FlightSimulator.mp4";

// Re-export utilities
export { testPollingOptions, isLiveMode };

/**
 * Helper to get a sample file path
 */
export function getSampleFilePath(filename: string): string {
  // Try samples-dev/example-data first
  const devPath = path.join(SAMPLES_DEV_EXAMPLE_DATA_PATH, filename);
  if (fs.existsSync(devPath)) {
    return devPath;
  }
  // Fall back to sample_files
  return path.join(SAMPLE_FILES_PATH, filename);
}

/**
 * Create a recorder for sample tests
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = await baseCreateRecorder(context);
  await recorder.setMatcher("BodilessMatcher");
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
