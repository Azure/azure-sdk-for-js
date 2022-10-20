// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import "./env";
import { createClientLogger } from "@azure/logger";
import { AzureKeyCredential } from "@azure/core-auth";
import createMapsRouteClient from "../../../src/mapsRouteClient";
import { ClientOptions } from "@azure-rest/core-client";
import { MapsRouteClient } from "../../../src/generated";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
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
  const credential = new AzureKeyCredential(env["MAPS_SUBSCRIPTION_KEY"] ?? "");
  return createMapsRouteClient(credential, options);
}
