// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type TaskContext } from "vitest";
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import "./env";
import type { AzureDeveloperDevCenterClient } from "../../../src/clientDefinitions.js";
import type { ClientOptions } from "@azure-rest/core-client";
import { AzurePowerShellCredential } from "@azure/identity";
import createClient from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  DEFAULT_PROJECT_NAME: "project",
  DEFAULT_POOL_NAME: "pool",
  DEFAULT_DEVBOX_NAME: "devbox",
  DEFAULT_USER_NAME: "me",
  DEFAULT_CATALOG_NAME: "catalog",
  DEFAULT_ENVIRONMENT_TYPE_NAME: "env_type",
  DEFAULT_ENVIRONMENT_DEFINITION_NAME: "env_definition",
  DEFAULT_ENVIRONMENT_NAME: "environment",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: envSetupForPlayback,
  //  https://github.com/Azure/azure-sdk-tools/blob/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy/Common/SanitizerDictionary.cs
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK2030",
  ],
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: TaskContext | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createRecordedClient(
  recorder: Recorder,
  endpoint: string,
  options: ClientOptions = {},
): AzureDeveloperDevCenterClient {
  // We need to use a user-persona, so the clientSecretCredential that createTestCredential uses in live/record modes is not sufficient
  const credential = isPlaybackMode() ? createTestCredential() : new AzurePowerShellCredential();
  return createClient(endpoint, credential, recorder.configureClientOptions(options));
}
