// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Recorder,
  VitestTestContext,
  assertEnvironmentVariable,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { TokenCredential } from "@azure/core-auth";
import { DeidentificationClient } from "../../../src/clientDefinitions.js";
import createClient from "../../../src/deidentificationClient.js";

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(testContext: VitestTestContext): Promise<Recorder> {
  return new Recorder(testContext);
}

export function getStorageAccountLocation(): string {
  return `https://${assertEnvironmentVariable("STORAGE_ACCOUNT_NAME")}.blob.core.windows.net/${assertEnvironmentVariable("STORAGE_CONTAINER_NAME")}`;
}

export function getTestEnvironment(): string {
  if (typeof process !== "undefined" && process.versions != null && process.versions.node != null) {
    return "node";
  }

  return "browser";
}

export async function createRecordedDeidentificationClient(
  recorder: Recorder,
  credentials: TokenCredential,
): Promise<DeidentificationClient> {
  const endpoint = isPlaybackMode()
    ? "example.com"
    : assertEnvironmentVariable("DEID_SERVICE_ENDPOINT");
  const client = await createClient(endpoint, credentials, recorder.configureClientOptions({}));

  return client;
}
