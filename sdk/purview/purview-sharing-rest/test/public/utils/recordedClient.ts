// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { env, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import PurviewSharing, { PurviewSharingClient } from "../../../src";
import { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://accountname.purview.azure.com/share",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "00000000-000-000-00000-000000000000",
  STORAGE_ACCOUNT_RESOURCE_ID:
    "/subscriptions/00000000-000-000-00000-000000000000/resourceGroups/ResourceGroupName/providers/Microsoft.Storage/storageAccounts/storageaccountname",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        target: env.ENDPOINT?.toLocaleLowerCase() || "",
        value: envSetupForPlayback.ENDPOINT,
      },
      {
        target: encodeURIComponent(env.STORAGE_ACCOUNT_RESOURCE_ID || ""),
        value: envSetupForPlayback.STORAGE_ACCOUNT_RESOURCE_ID,
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3478", // .accountname in the body is not a secret and is listed below in the beforeEach section
    "AZSDK2030", // .operation-location in the body is not a secret and is listed below in the beforeEach section
  ],
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createClient(recorder: Recorder, options?: ClientOptions): PurviewSharingClient {
  // Use createTestCredential to record AAD traffic so it could work in playback mode
  const credential = createTestCredential();

  // Use recorder.configureClientOptions to add the recording policy in the client options
  const client = PurviewSharing(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ options }),
  );

  return client;
}
