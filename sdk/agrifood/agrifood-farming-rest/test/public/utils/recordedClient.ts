// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import "./env";

import FarmBeats, { FarmBeatsRestClient } from "../../../src";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isLiveMode,
  record,
} from "@azure-tools/test-recorder";
import { createXhrHttpClient, isNode } from "@azure/test-utils";

import { ClientOptions } from "@azure-rest/core-client";
import { ClientSecretCredential } from "@azure/identity";
import { Context } from "mocha";

const replaceableVariables: { [k: string]: string } = {
  FARMBEATS_ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
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
    },
  ],
  queryParametersToSkip: [],
};

export function createClient(options?: ClientOptions): FarmBeatsRestClient {
  const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    { httpClient }
  );

  return FarmBeats(env.FARMBEATS_ENDPOINT, credential, { ...options, httpClient });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
