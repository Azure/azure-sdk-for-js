// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestClient } from "./createClient.js";
import type { PlanetaryComputerProClient } from "../../../src/index.js";

const replaceableVariables: Record<string, string> = {
  PLANETARYCOMPUTER_ENDPOINT:
    "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com",
  PLANETARYCOMPUTER_SUBSCRIPTION_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_TENANT_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_CLIENT_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_CLIENT_SECRET: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_COLLECTION_ID: "naip-atl-00000000",
  PLANETARYCOMPUTER_ITEM_ID: "fake-item-id",
  PLANETARYCOMPUTER_INGESTION_CONTAINER_URI:
    "https://SANITIZED.blob.core.windows.net/sample-container",
  PLANETARYCOMPUTER_INGESTION_CATALOG_URL: "https://fake.example.com/catalog.json",
  PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID: "00000000-0000-0000-0000-000000000000",
  PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI:
    "https://SANITIZED.blob.core.windows.net/sample-container",
  PLANETARYCOMPUTER_INGESTION_SAS_TOKEN: "fake-sas-token",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    // Header sanitizers
    headerSanitizers: [
      { key: "Set-Cookie", value: "[set-cookie;]" },
      { key: "Cookie", value: "cookie;" },
      { key: "X-Request-ID", value: "00000000000000000000000000000000" },
      { key: "Date", value: "Mon, 01 Jan 2024 00:00:00 GMT" },
      { key: "Server-Timing", value: "total;dur=0.0" },
      { key: "traceparent", value: "00-00000000000000000000000000000000-0000000000000000-00" },
      { key: "mise-correlation-id", value: "00000000-0000-0000-0000-000000000000" },
      // Sanitize operation-location header for LRO polling
      {
        key: "operation-location",
        regex: true,
        target: "/operations/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/operations/00000000-0000-0000-0000-000000000000",
      },
      // Sanitize Location header for resource creation
      {
        key: "Location",
        regex: true,
        target: "/ingestion-sources/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/ingestion-sources/00000000-0000-0000-0000-000000000000",
      },
      {
        key: "Location",
        regex: true,
        target: "/ingestions/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/ingestions/00000000-0000-0000-0000-000000000000",
      },
    ],
    // Body sanitizers
    bodyKeySanitizers: [
      {
        jsonPath: "$..access_token",
        regex: ".*",
        value: "access_token",
      },
    ],
    bodySanitizers: [
      // Sanitize UUIDs in response bodies (JSON)
      {
        regex: true,
        target: '"id"\\s*:\\s*"[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"',
        value: '"id": "00000000-0000-0000-0000-000000000000"',
      },
      // Sanitize ALL blob storage URLs in response bodies
      {
        regex: true,
        target: "https://[a-z0-9]{3,24}\\.blob\\.core\\.windows\\.net",
        value: "https://SANITIZED.blob.core.windows.net",
      },
      // Sanitize container URLs in JSON fields
      {
        regex: true,
        target: '"containerUrl"\\s*:\\s*"Sanitized"',
        value: '"containerUrl": "https://SANITIZED.blob.core.windows.net/sample-container"',
      },
      {
        regex: true,
        target: '"containerUri"\\s*:\\s*"Sanitized"',
        value: '"containerUri": "https://SANITIZED.blob.core.windows.net/sample-container"',
      },
      // Sanitize collection IDs with random hash suffixes
      // Pattern: naip-atl-bde3e846 -> naip-atl-00000000
      {
        regex: true,
        target: '"naip-atl-[a-f0-9]{8}"',
        value: '"naip-atl-00000000"',
      },
    ],
    // URI sanitizers
    uriSanitizers: [
      // Geocatalog endpoint sanitization
      {
        regex: true,
        target: "https?://[a-zA-Z0-9\\-\\.]+\\.geocatalog\\.[a-zA-Z0-9\\-\\.]+\\.azure\\.com",
        value: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com",
      },
      {
        regex: true,
        target: "https?://[a-zA-Z0-9\\-\\.]+\\.geocatalog\\.azure\\.com",
        value: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com",
      },
      // Storage account URL sanitization with URL-encoded protocol prefix
      {
        regex: true,
        target: "https%3A%2F%2F[a-z0-9]+\\.blob\\.core\\.windows\\.net",
        value: "https%3A%2F%2FSANITIZED.blob.core.windows.net",
      },
      // Storage account URLs in URIs (normal URLs)
      {
        regex: true,
        target: "[a-z0-9]{3,24}\\.blob\\.core\\.windows\\.net(?!/)",
        value: "SANITIZED.blob.core.windows.net",
      },
      // Prevent double-sanitization of already-sanitized storage URLs
      {
        regex: true,
        target: "SANITIZED_[A-Z_]*STORAGE\\.blob\\.core\\.windows\\.net",
        value: "SANITIZED_STORAGE.blob.core.windows.net",
      },
      // Sanitize operation IDs (UUIDs/GUIDs) in URLs
      {
        regex: true,
        target: "/operations/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/operations/00000000-0000-0000-0000-000000000000",
      },
      // Sanitize ingestion source IDs in URLs
      {
        regex: true,
        target: "/ingestion-sources/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/ingestion-sources/00000000-0000-0000-0000-000000000000",
      },
      // Sanitize ingestion IDs in URLs
      {
        regex: true,
        target: "/ingestions/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/ingestions/00000000-0000-0000-0000-000000000000",
      },
      // Sanitize run IDs in URLs
      {
        regex: true,
        target: "/runs/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
        value: "/runs/00000000-0000-0000-0000-000000000000",
      },
      // Sanitize collection IDs with random hash suffixes in URIs
      // Pattern: naip-atl-bde3e846 -> naip-atl-00000000
      {
        regex: true,
        target: "naip-atl-[a-f0-9]{8}",
        value: "naip-atl-00000000",
      },
    ],
    // General sanitizers for credentials
    generalSanitizers: [
      {
        target: process.env.PLANETARYCOMPUTER_SUBSCRIPTION_ID || "skip",
        value: "00000000-0000-0000-0000-000000000000",
      },
      {
        target: process.env.PLANETARYCOMPUTER_TENANT_ID || "skip",
        value: "00000000-0000-0000-0000-000000000000",
      },
      {
        target: process.env.PLANETARYCOMPUTER_CLIENT_ID || "skip",
        value: "00000000-0000-0000-0000-000000000000",
      },
      {
        target: process.env.PLANETARYCOMPUTER_CLIENT_SECRET || "skip",
        value: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // Sanitizes JSON path $..name
    "AZSDK3430", // Sanitizes JSON path $..id
    "AZSDK2003", // Default hostname sanitizer
  ],
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
