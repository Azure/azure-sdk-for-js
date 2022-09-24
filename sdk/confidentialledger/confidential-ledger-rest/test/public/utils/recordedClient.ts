// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import "./env";

import ConfidentialLedger, { ConfidentialLedgerClient, getLedgerIdentity } from "../../../src";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isLiveMode,
  record,
} from "@azure-tools/test-recorder";
import { createXhrHttpClient, isNode } from "@azure/test-utils";

import { Context } from "mocha";
import { ClientSecretCredential } from "@azure/identity";

const replaceableVariables: { [k: string]: string } = {
  LEDGER_URI: "https://emily-java-sdk-tests.confidential-ledger.azure.com/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  LEDGER_IDENTITY: "FAKE_CERT",
  IDENTITY_SERVICE_URL: "https://identity.confidential-ledger.core.azure.com/",
  USER_ID: "00000000-0000-0000-0000-000000000000",
  // we need this dummy variable since the test environment doesn't have access to local .env files
  LEDGER_NAME: "emily-java-sdk-tests",
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

export async function createClient(): Promise<ConfidentialLedgerClient> {
  const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();

  const clientCredential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const { ledgerIdentityCertificate } = await getLedgerIdentity(
    env.LEDGER_NAME,
    env.IDENTITY_SERVICE_URL ? env.IDENTITY_SERVICE_URL : null
  );

  return ConfidentialLedger(env.LEDGER_URI, ledgerIdentityCertificate, clientCredential, {
    httpClient,
  });
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
