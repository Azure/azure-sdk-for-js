// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { EdgeActionsManagementClientOptionalParams } from "../../../src/index.js";
import { EdgeActionsManagementClient } from "../../../src/index.js";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
  RESOURCE_GROUP: "myjstest",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret
    "AZSDK3430", // .id in the body is not a secret
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
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

export function createClient(
  recorder: Recorder,
  options?: EdgeActionsManagementClientOptionalParams,
): EdgeActionsManagementClient {
  const credential = createTestCredential();
  const subscriptionId = env.SUBSCRIPTION_ID || "";
  const client = new EdgeActionsManagementClient(
    credential,
    subscriptionId,
    recorder.configureClientOptions(options || {}),
  );
  return client;
}
