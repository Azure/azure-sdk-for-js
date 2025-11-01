// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestClient } from "./createClient.js";
import type { PlanetaryComputerProClient } from "../../../src/index.js";

const replaceableVariables: Record<string, string> = {
  PLANETARYCOMPUTER_ENDPOINT: "https://fakeendpoint.geocatalogs.azure.com",
  PLANETARYCOMPUTER_COLLECTION_ID: "fake-collection-id",
  PLANETARYCOMPUTER_ITEM_ID: "fake-item-id",
  PLANETARYCOMPUTER_INGESTION_CONTAINER_URI: "https://fakestorage.blob.core.windows.net/container",
  PLANETARYCOMPUTER_INGESTION_CATALOG_URL: "https://fake.example.com/catalog.json",
  PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI:
    "https://fakestorage.blob.core.windows.net/container",
  PLANETARYCOMPUTER_INGESTION_SAS_TOKEN: "fake-sas-token",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

/**
 * Creates a test client with recorder support
 * @param recorder - The test recorder instance
 * @returns A configured PlanetaryComputerProClient
 */
export function createRecordedClient(recorder: Recorder): PlanetaryComputerProClient {
  // Use createTestClient which wraps options with recorder.configureClientOptions
  return createTestClient(recorder);
}
