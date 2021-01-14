// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";

// Adding this to the source would change the public API.
type ApiVersions = "7.0" | "7.1";
export async function authenticate(that: Context, version?: string): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = await new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const keyVaultUrl = env.AZURE_KEYVAULT_URL;
  if (!keyVaultUrl) {
    throw new Error("Missing AZURE_KEYVAULT_URL environment variable.");
  }

  const client = new KeyClient(keyVaultUrl, credential, {
    serviceVersion: version as ApiVersions
  });
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, keySuffix };
}
