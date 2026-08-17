// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import "./env.js";
import {
  BlocklistClient,
  ContentProvenanceClient,
  ContentSafetyClient,
} from "../../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";

const envSetupForPlayback: Record<string, string> = {
  CONTENT_SAFETY_ENDPOINT: "https://endpoint/",
  CONTENT_SAFETY_API_KEY: "fake_key",
  // Blob SAS URIs for provenance detection; the real values carry a SAS token.
  CONTENT_SAFETY_SIGNED_MEDIA_URI:
    "https://fake_storage.blob.core.windows.net/provenance-test/signed.png",
  CONTENT_SAFETY_UNSIGNED_MEDIA_URI:
    "https://fake_storage.blob.core.windows.net/provenance-test/unsigned.png",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  // AZSDK2030 rewrites operation-location to https://example.com, which breaks LRO polling in playback.
  removeCentralSanitizers: ["AZSDK2030"],
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createClient(recorder: Recorder): ContentSafetyClient {
  const endpoint = assertEnvironmentVariable("CONTENT_SAFETY_ENDPOINT");
  const key = assertEnvironmentVariable("CONTENT_SAFETY_API_KEY");
  const credential = new AzureKeyCredential(key);
  return new ContentSafetyClient(endpoint, credential, recorder.configureClientOptions({}));
}

export function createBlocklistClient(recorder: Recorder): BlocklistClient {
  const endpoint = assertEnvironmentVariable("CONTENT_SAFETY_ENDPOINT");
  const key = assertEnvironmentVariable("CONTENT_SAFETY_API_KEY");
  const credential = new AzureKeyCredential(key);
  return new BlocklistClient(endpoint, credential, recorder.configureClientOptions({}));
}

export function createContentProvenanceClient(recorder: Recorder): ContentProvenanceClient {
  const endpoint = assertEnvironmentVariable("CONTENT_SAFETY_ENDPOINT");
  const key = assertEnvironmentVariable("CONTENT_SAFETY_API_KEY");
  const credential = new AzureKeyCredential(key);
  return new ContentProvenanceClient(endpoint, credential, recorder.configureClientOptions({}));
}
