// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Context } from "mocha";

import {
  env,
  isLiveMode,
  Recorder,
  record,
  RecorderEnvironmentSetup,
} from "@azure-tools/test-recorder";
import {
  PurviewAccount,
  PurviewAccountClient,
  PurviewMetadataPolicies,
  PurviewMetadataPoliciesClient,
} from "../../../src";
import { ClientSecretCredential } from "@azure/identity";
import { isNode, createXhrHttpClient } from "@azure/test-utils";

import "./env";
import { ClientOptions } from "@azure-rest/core-client";

const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
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

export function createAccountClient(
  options?: ClientOptions
): PurviewAccount.Client.PurviewAccountRestClient {
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    { httpClient }
  );
  return PurviewAccountClient(env.ENDPOINT, credential, { httpClient, ...options });
}

export function createMetadataClient(
  options?: ClientOptions
): PurviewMetadataPolicies.Client.PurviewMetadataPoliciesRestClient {
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    { httpClient }
  );
  return PurviewMetadataPoliciesClient(env.ENDPOINT, credential, { httpClient, ...options });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
