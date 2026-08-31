// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import {
  Recorder,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { DeviceRegistrySoftwareUpdateClient } from "../../../src/index.js";

const fakeEndpoint = "fake.api.adu.microsoft.com";
const fakeManifestUrl =
  "https://fake.blob.core.windows.net/container/manifest.json?sanitized";
const fakePayloadUrl = "https://fake.blob.core.windows.net/container/README.md?sanitized";
const fakeOperationId = "00000000-0000-0000-0000-000000000000";

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    DEVICE_REGISTRY_SOFTWARE_UPDATE_ENDPOINT: fakeEndpoint,
    DEVICE_REGISTRY_SOFTWARE_UPDATE_MANIFEST_URL: fakeManifestUrl,
    DEVICE_REGISTRY_SOFTWARE_UPDATE_PAYLOAD_URL: fakePayloadUrl,
  },
  removeCentralSanitizers: [
    "AZSDK2003", // Preserve Location after applying the explicit LRO sanitizers below.
    "AZSDK2030", // Preserve operation-location after applying the explicit LRO sanitizers below.
    "AZSDK3493", // Update names are part of the public resource identity used by assertions.
    "AZSDK3496", // Preserve resourceLocation after sanitizing its host and operation ids.
    "AZSDK4001", // envSetupForPlayback replaces the endpoint with the required fake host.
  ],
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        value: fakeOperationId,
      },
      {
        regex: true,
        target:
          "(?i)(sig|se|sp|sr|sv|st|spr|srt|ss|skoid|sktid|skt|ske|skv)=[^&\\s\\\"]+",
        value: "$1=sanitized",
      },
    ],
    uriSanitizers: [
      {
        regex: true,
        target:
          "/updates/operations/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        value: `/updates/operations/${fakeOperationId}`,
      },
    ],
    headerSanitizers: [
      { key: "Authorization", value: "Bearer sanitized" },
      {
        key: "operation-location",
        regex: true,
        target:
          "/updates/operations/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        value: `/updates/operations/${fakeOperationId}`,
      },
      {
        key: "Location",
        regex: true,
        target:
          "/updates/operations/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
        value: `/updates/operations/${fakeOperationId}`,
      },
      { key: "etag", value: "sanitized-etag" },
    ],
    bodyKeySanitizers: [
      {
        jsonPath: "$.importUpdateInput[0].importManifest.url",
        value: fakeManifestUrl,
      },
      {
        jsonPath: "$.importUpdateInput[0].files[0].url",
        value: fakePayloadUrl,
      },
      { jsonPath: "$..operationId", value: fakeOperationId },
      { jsonPath: "$..traceId", value: "00000000000000000000000000000000" },
      { jsonPath: "$..etag", value: "sanitized-etag" },
    ],
    removeHeaderSanitizer: {
      headersForRemoval: [
        "traceparent",
        "tracestate",
        "x-ms-correlation-request-id",
        "x-ms-client-request-id",
        "x-ms-request-id",
      ],
    },
  },
};

export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", {
    compareBodies: true,
    excludedHeaders: [
      "Accept-Encoding",
      "Authorization",
      "Content-Length",
      "User-Agent",
      "traceparent",
      "tracestate",
      "x-ms-client-request-id",
      "x-ms-correlation-request-id",
      "x-ms-request-id",
    ],
  });
  return recorder;
}

export function createClient(recorder: Recorder): DeviceRegistrySoftwareUpdateClient {
  return new DeviceRegistrySoftwareUpdateClient(
    assertEnvironmentVariable("DEVICE_REGISTRY_SOFTWARE_UPDATE_ENDPOINT"),
    createTestCredential(),
    recorder.configureClientOptions({}),
  );
}

export function testEnvironmentVariable(name: string): string {
  return env[name] ?? assertEnvironmentVariable(name);
}

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : 5_000,
};
