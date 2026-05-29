// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder, env } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../../src/index.js";
import { PlanetaryComputerProClient as ClientClass } from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";

const replaceableVariables: Record<string, string> = {
  PLANETARYCOMPUTER_ENDPOINT: "https://Sanitized.geocatalogs.azure.com",
  PLANETARYCOMPUTER_COLLECTION_ID: "naip",
  PLANETARYCOMPUTER_ITEM_ID: "ga_m_3308421_se_16_060_20211114",
  PLANETARYCOMPUTER_INGESTION_CONTAINER_URI: "https://Sanitized.blob.core.windows.net/container",
  PLANETARYCOMPUTER_INGESTION_CATALOG_URL: "https://Sanitized/catalog.json",
  PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI:
    "https://Sanitized.blob.core.windows.net/container",
  PLANETARYCOMPUTER_INGESTION_SAS_TOKEN: "Sanitized",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    // Don't sanitize collection_id and item_id — these are public data
    "AZSDK3493", // Sanitizes JSON path $..name
    "AZSDK3430", // Sanitizes JSON path $..id
    "AZSDK2030", // Default operation-location header sanitizer — we handle it via generalSanitizers
  ],
  sanitizerOptions: {
    generalSanitizers: [
      // Blob storage URLs (must come BEFORE geocatalog to prevent geocatalog regex from eating blob URLs)
      {
        regex: true,
        target: `https://[a-z0-9]+\\.blob\\.core\\.windows\\.net`,
        value: "https://Sanitized.blob.core.windows.net",
      },
      {
        regex: true,
        target: `https://[^/\\s"]+\\.geocatalog[^/\\s"]*\\.azure[^/\\s"]*\\.net`,
        value: "https://Sanitized.geocatalogs.azure.com",
      },
      {
        regex: true,
        target: `https://[^/\\s"]+\\.geocatalogs\\.azure\\.com`,
        value: "https://Sanitized.geocatalogs.azure.com",
      },
    ],
    uriSanitizers: [
      // Blob storage URLs in query parameters (URL-encoded)
      {
        regex: true,
        target: `https%3A%2F%2F[a-z0-9]+\\.blob\\.core\\.windows\\.net`,
        value: "https%3A%2F%2FSanitized.blob.core.windows.net",
      },
    ],
    removeHeaderSanitizer: {
      headersForRemoval: [
        "x-ms-client-request-id",
        "X-Request-ID",
        "Set-Cookie",
        "Cookie",
        "mise-correlation-id",
      ],
    },
    bodyKeySanitizers: [{ jsonPath: "$..access_token", value: "access_token" }],
  },
};

export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export function createClient(recorder: Recorder): PlanetaryComputerProClient {
  const credential = createTestCredential();
  const endpoint = env.PLANETARYCOMPUTER_ENDPOINT ?? "";
  return new ClientClass(endpoint, credential, recorder.configureClientOptions({}));
}
