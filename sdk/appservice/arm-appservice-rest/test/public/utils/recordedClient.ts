// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import type { ClientOptions } from "@azure-rest/core-client";
import { createTestCredential } from "@azure-tools/test-credential";
import type { WebSiteManagementClient } from "@azure-rest/arm-appservice";
import WebSiteClient from "@azure-rest/arm-appservice";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
  RESOURCE_GROUP: "resource-group",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
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

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<WebSiteManagementClient> {
  const credential = createTestCredential();
  return WebSiteClient(credential, recorder.configureClientOptions({ ...options }));
}
