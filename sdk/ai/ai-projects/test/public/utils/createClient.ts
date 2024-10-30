// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { AIProjectsClient } from "../../../src/index.js";
import { ClientOptions } from "@azure-rest/core-client";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(
  context: VitestTestContext,
): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createProjectsClient(
  recorder?: Recorder,
  options?: ClientOptions,
): AIProjectsClient {
  const credential = createTestCredential();
  const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "";
  return AIProjectsClient.fromConnectionString(connectionString, credential, recorder?.configureClientOptions(options ?? {}));
}
