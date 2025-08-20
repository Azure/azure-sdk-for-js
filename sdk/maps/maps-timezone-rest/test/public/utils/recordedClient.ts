// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { env, Recorder } from "@azure-tools/test-recorder";
import type { MapsTimeZoneClient } from "@azure-rest/maps-timezone";
import MapsTimeZone from "@azure-rest/maps-timezone";
import type { ClientOptions } from "@azure-rest/core-client";
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
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createClient(options?: ClientOptions): MapsTimeZoneClient {
  const credential = createTestCredential();
  const client = MapsTimeZone(credential, env["MAPS_RESOURCE_CLIENT_ID"] as string, options);
  return client;
}
