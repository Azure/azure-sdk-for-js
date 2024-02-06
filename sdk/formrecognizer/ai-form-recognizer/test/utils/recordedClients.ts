// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";

import { AzureKeyCredential, PollerOptions } from "../../src";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createClientLogger } from "@azure/logger";
import { createTestCredential } from "@azure-tools/test-credential";
import { CommonClientOptions } from "@azure/core-client";
import { PollOperationState } from "@azure/core-lro";

export const logger = createClientLogger("ai-form-recognizer:test");

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  FORM_RECOGNIZER_API_KEY: "api_key",
  FORM_RECOGNIZER_ENDPOINT: "https://endpoint/",
  FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL: "https://storageaccount/trainingdata-v3?sastoken",
  FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL: "https://storageaccount/testingdata?sastoken",
  FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL:
    "https://storageaccount/selectionmark-v3?sastoken",
  FORM_RECOGNIZER_TARGET_RESOURCE_REGION: "westus2",
  // fake resource id
  FORM_RECOGNIZER_TARGET_RESOURCE_ID:
    "/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr",
};

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export const testPollingOptions: PollerOptions<PollOperationState<unknown>> = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
  onProgress: (state) => logger.verbose("Poll state progressed:", state),
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      // endpoints
      {
        target: env["FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL"]?.split("/")[2] || "",
        value: envSetupForPlayback["FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL"].split("/")[2],
      },
      {
        target: env["FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"]?.split("/")[2] || "",
        value: envSetupForPlayback["FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"].split("/")[2],
      },
      {
        target:
          env["FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"]?.split("/")[2] || "",
        value:
          envSetupForPlayback["FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"].split(
            "/"
          )[2],
      },
      // sas tokens
      {
        target: env["FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL"]?.split("?")[1] || "",
        value: envSetupForPlayback["FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL"].split("?")[1],
      },
      {
        target: env["FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"]?.split("?")[1] || "",
        value: envSetupForPlayback["FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"].split("?")[1],
      },
      {
        target:
          env["FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"]?.split("?")[1] || "",
        value:
          envSetupForPlayback["FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"].split(
            "?"
          )[1],
      },
    ],
  },
};

/**
 * Returns an appropriate credential depending on the value of `useAad`.
 */
export function makeCredential(useAad: boolean): TokenCredential | AzureKeyCredential {
  return useAad
    ? createTestCredential()
    : new AzureKeyCredential(assertEnvironmentVariable("FORM_RECOGNIZER_API_KEY"));
}

export async function createRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);
  return recorder;
}

export async function createRecordedClient<T>(
  currentTest: Test | undefined,
  ctor: {
    new (
      endpoint: string,
      credential: TokenCredential | KeyCredential,
      options?: CommonClientOptions
    ): T;
  },
  useApiKey: boolean = false
): Promise<RecordedClient<T>> {
  const recorder = await createRecorder(currentTest);
  return {
    client: new ctor(
      testEnv.FORM_RECOGNIZER_ENDPOINT,
      useApiKey
        ? new AzureKeyCredential(assertEnvironmentVariable("FORM_RECOGNIZER_API_KEY"))
        : createTestCredential(),
      recorder.configureClientOptions({})
    ),
    recorder,
  };
}

export function getRandomNumber(): number {
  return Math.ceil(Math.random() * 1000 + 10000);
}
