// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential, TokenCredential } from "@azure/identity";
import { Recorder, RecorderEnvironmentSetup, env, record } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { MapsSearchClient } from "../../../src/searchClient";
import { MapsSearchClientOptions } from "../../../src/models/options";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  MAPS_CLIENT_ID: "azure_maps_client_id",
  MAPS_SUBSCRIPTION_KEY: "azure_maps_subscription_key"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export type AuthMethod = "SubscriptionKey" | "AAD";

export function createClient(
  authMethod: AuthMethod,
  options?: MapsSearchClientOptions
): MapsSearchClient {
  let credential: AzureKeyCredential | TokenCredential;
  switch (authMethod) {
    case "SubscriptionKey": {
      credential = new AzureKeyCredential(env.MAPS_SUBSCRIPTION_KEY);
      return new MapsSearchClient(credential, options);
    }
    case "AAD": {
      credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );
      return new MapsSearchClient(credential, env.MAPS_CLIENT_ID, options);
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
