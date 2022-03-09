// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";

import {
  ManagedPrivateEndpointsClient,
  ManagedPrivateEndpointsClientOptionalParams
} from "../../../src";
import "./env";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  ENDPOINT: "https://testaccount.dev.azuresynapse.net"
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
      const replaced = recording.replace(
        "testaccount.dev.azuresynapse.net:443",
        "testaccount.dev.azuresynapse.net"
      );
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export function createClient(
  options?: ManagedPrivateEndpointsClientOptionalParams
): ManagedPrivateEndpointsClient {
  let credential: TokenCredential;

  credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  return new ManagedPrivateEndpointsClient(credential, env.ENDPOINT, options);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
