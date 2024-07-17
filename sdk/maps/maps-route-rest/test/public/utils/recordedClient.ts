// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import "./env";
import { createClientLogger } from "@azure/logger";
import { createTestCredential } from "@azure-tools/test-credential";
import MapsRoute from "../../../src/mapsRoute";
import { ClientOptions } from "@azure-rest/core-client";
import { MapsRouteClient } from "../../../src/generated";

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

export const testLogger = createClientLogger("route-test");

export function createClient(options?: ClientOptions): MapsRouteClient {
  const credential = createTestCredential();
  const client = MapsRoute(
    credential,
    env["MAPS_RESOURCE_CLIENT_ID"] as string,
    options,
  );
  return client;
}
