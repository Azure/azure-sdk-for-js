// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder } from "@azure-tools/test-recorder";
import "./env";
import type { ClientOptions } from "@azure-rest/core-client";
import type { MapsSearchClient } from "../../../src/";
import MapsSearch from "../../../src/";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: Record<string, string> = {
  MAPS_RESOURCE_CLIENT_ID: "azure_maps_client_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
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

export function createClient(options?: ClientOptions): MapsSearchClient {
  const credential = createTestCredential();
  const client = MapsSearch(credential, env["MAPS_RESOURCE_CLIENT_ID"] as string, options);
  return client;
}
