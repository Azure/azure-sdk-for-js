// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { ClientSecretCredential, TokenCredential } from "@azure/identity";
import { Recorder, RecorderEnvironmentSetup, env, record } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { MapsRenderClient } from "../../../src/mapsRenderClient";
import { MapsRenderClientOptions } from "../../../src/models/options";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  MAPS_CLIENT_ID: "azure_maps_client_id",
  MAPS_SUBSCRIPTION_KEY: "azure_maps_subscription_key",
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/batch\/{?\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}}?/g, `batch/<batch-id>`),
  ],
  queryParametersToSkip: [],
};

export type AuthMethod = "SubscriptionKey" | "AAD";

export function createClient(
  options?: MapsRenderClientOptions
): MapsRenderClient {
    const credential = new AzureKeyCredential(env.MAPS_SUBSCRIPTION_KEY);
    return new MapsRenderClient(credential, options);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
