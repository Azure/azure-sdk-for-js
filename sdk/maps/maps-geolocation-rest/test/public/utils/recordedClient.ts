// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import "./env";
import { ClientOptions } from "@azure-rest/core-client";
import MapsGeolocation, { MapsGeolocationClient } from "../../../src/";
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

export function createClient(options?: ClientOptions): MapsGeolocationClient {
  const credential = createTestCredential();
  const client = MapsGeolocation(credential, env["MAPS_RESOURCE_CLIENT_ID"] as string, options);
  return client;
}
