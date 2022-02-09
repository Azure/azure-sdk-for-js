// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import PurviewCatalog, { PurviewCatalogRestClient } from "../../../src";
import { ClientSecretCredential } from "@azure/identity";
import { ClientOptions } from "@azure-rest/core-client";
import { env } from "@azure-tools/test-recorder";
import { createXhrHttpClient, isNode } from "@azure/test-utils";
import * as dotenv from "dotenv";

import { Context } from "mocha";
import { Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

if (isNode) {
  dotenv.config();
}

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

export function createClient(options?: ClientOptions): PurviewCatalogRestClient {
  const httpClient = isNode ? undefined : createXhrHttpClient();
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    { httpClient }
  );
  return PurviewCatalog(env.ENDPOINT, credential, {
    ...options,
    httpClient,
  });
}

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

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
