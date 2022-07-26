// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger } from "@azure/logger";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { MapsRenderClient } from "../../../src/mapsRenderClient";
import { MapsRenderClientOptions } from "../../../src/models/options";

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

export const testLogger = createClientLogger("render-test");

export type AuthMethod = "SubscriptionKey" | "AAD";

export function createClient(
  options?: MapsRenderClientOptions
): MapsRenderClient {
  const credential = new AzureKeyCredential(env["MAPS_SUBSCRIPTION_KEY"] ?? "");
  return new MapsRenderClient(credential, options);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderOptions);
  // Set up sanitizer (legacy customizationsOnRecordings)
  await recorder.addSanitizers({
    generalSanitizers: [
      {
        regex: true,
         // This is a .NET regular expression that will be compiled by the proxy tool.
         // eslint-disable-next-line
        target: "batch/{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?",
        value: "batch/<batch-id>",
      }
    ],
  });

  return recorder;
}
