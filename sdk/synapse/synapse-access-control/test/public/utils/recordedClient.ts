// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "./env";

import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { AccessControlClient, AccessControlClientOptionalParams } from "../../../src";
import {
  Recorder,
  RecorderStartOptions,
  env,
} from "@azure-tools/test-recorder";

export function createClient(options?: AccessControlClientOptionalParams): AccessControlClient {
  let credential = createTestCredential();
  return new AccessControlClient(credential, env.ENDPOINT as string, { ...options });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorderStartOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
      ENDPOINT: "https://testaccount.dev.azuresynapse.net"
    },
  };
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderStartOptions);
  return recorder;
}
