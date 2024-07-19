// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ComputeManagementClient } from "../../../src/clientDefinitions";
import createComputeManagementClient from "../../../src";

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
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createTestComputeManagementClient(
  recorder: Recorder,
  credentials: TokenCredential,
  options: ClientOptions = {},
): ComputeManagementClient {
  const client = createComputeManagementClient(
    credentials,
    recorder.configureClientOptions(options),
  );
  return client;
}
