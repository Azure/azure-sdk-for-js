// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { env, Recorder } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { TranscriptionClient, type TranscriptionClientOptionalParams } from "../../../src/index.js";
import { resolve, join } from "node:path";

const replaceableVariables: Record<string, string> = {
  TRANSCRIPTION_ENDPOINT: "https://eastus.api.cognitive.microsoft.com",
  TRANSCRIPTION_API_KEY: "fake_api_key",
  AZURE_CLIENT_ID: "fake_client_id",
  AZURE_CLIENT_SECRET: "fake_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    headerSanitizers: [
      { key: "Ocp-Apim-Subscription-Key", value: "fake_api_key" },
      { key: "api-key", value: "fake_api_key" },
    ],
  },
};

/**
 * The path to test asset files (audio samples, etc.).
 * Assets are stored in `sdk/transcription/ai-speech-transcription/assets/`.
 */
export const ASSET_PATH = resolve(join(process.cwd(), "assets"));

/**
 * Creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

/**
 * Creates a TranscriptionClient for testing.
 * The client is configured with credentials from the test environment and
 * instrumented for recording/playback.
 */
export function createClient(
  recorder: Recorder,
  options?: TranscriptionClientOptionalParams,
): TranscriptionClient {
  const endpoint = env.TRANSCRIPTION_ENDPOINT ?? "https://eastus.api.cognitive.microsoft.com";
  const apiKey = env.TRANSCRIPTION_API_KEY ?? "fake_api_key";
  const client = new TranscriptionClient(
    endpoint,
    new AzureKeyCredential(apiKey),
    recorder.configureClientOptions(options ?? {}),
  );
  return client;
}
