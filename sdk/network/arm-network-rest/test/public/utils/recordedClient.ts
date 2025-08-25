// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import type { NetworkManagementClient } from "@azure-rest/arm-network";
import type { TokenCredential } from "@azure/core-auth";
import type { ClientOptions } from "@azure-rest/core-client";
import createNetworkManagementClient from "@azure-rest/arm-network";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  SUBSCRIPTION_ID: "azure_subscription_id",
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

export function createTestNetworkManagementClient(
  recorder: Recorder,
  credentials: TokenCredential,
  options: ClientOptions = {},
): NetworkManagementClient {
  const client = createNetworkManagementClient(
    credentials,
    recorder.configureClientOptions(options),
  );
  return client;
}
