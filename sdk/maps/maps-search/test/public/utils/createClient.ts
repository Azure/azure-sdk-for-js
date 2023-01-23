// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { MapsSearchClient } from "../../../src/mapsSearchClient";
import { MapsSearchClientOptions } from "../../../src/models/options";
import { createClientLogger } from "@azure/logger";

const envSetupForPlayback: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  MAPS_CLIENT_ID: "azure_maps_client_id",
  MAPS_SUBSCRIPTION_KEY: "azure_maps_subscription_key",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export const testLogger = createClientLogger("search-test");

export function createClient(options?: MapsSearchClientOptions): MapsSearchClient {
  const credential = new AzureKeyCredential(env["MAPS_SUBSCRIPTION_KEY"] ?? "");
  return new MapsSearchClient(credential, options);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);
  return recorder;
}
