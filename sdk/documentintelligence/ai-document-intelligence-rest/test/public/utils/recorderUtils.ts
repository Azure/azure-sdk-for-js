// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions, TestInfo, env, isPlaybackMode } from "@azure-tools/test-recorder";

const envSetupForPlayback: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  DOCUMENT_INTELLIGENCE_API_KEY: "api_key",
  DOCUMENT_INTELLIGENCE_ENDPOINT: "https://endpoint/",
  DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL:
    "https://storageaccount/trainingdata-v3?sastoken",
  DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL: "https://storageaccount/testingdata?sastoken",
  DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL:
    "https://storageaccount/selectionmark-v3?sastoken",
  DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_REGION: "westus2",
  // fake resource id
  DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_ID:
    "/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      // endpoints
      {
        target: env["DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL"]?.split("/")[2] || "",
        value:
          envSetupForPlayback["DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL"].split("/")[2],
      },
      {
        target: env["DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL"]?.split("/")[2] || "",
        value: envSetupForPlayback["DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL"].split("/")[2],
      },
      {
        target:
          env["DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"]?.split("/")[2] ||
          "",
        value:
          envSetupForPlayback[
            "DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"
          ].split("/")[2],
      },
      // sas tokens
      {
        target: env["DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL"]?.split("?")[1] || "",
        value:
          envSetupForPlayback["DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL"].split("?")[1],
      },
      {
        target: env["DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL"]?.split("?")[1] || "",
        value: envSetupForPlayback["DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL"].split("?")[1],
      },
      {
        target:
          env["DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"]?.split("?")[1] ||
          "",
        value:
          envSetupForPlayback[
            "DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"
          ].split("?")[1],
      },
    ],
  },
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};
