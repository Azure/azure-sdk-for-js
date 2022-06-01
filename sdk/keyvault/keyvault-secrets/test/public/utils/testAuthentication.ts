// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { SecretClient } from "../../../src";
import { RecorderEnvironmentSetup, env, isLiveMode, record } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";
import { getServiceVersion } from "./common";
import { createXhrHttpClient, isNode } from "@azure/test-utils";

export async function authenticate(
  that: Context,
  serviceVersion: ReturnType<typeof getServiceVersion>
): Promise<any> {
  const secretSuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      KEYVAULT_NAME: "keyvault_name",
      KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        secretSuffix === "" ? recording : recording.replace(new RegExp(secretSuffix, "g"), ""),
    ],
    queryParametersToSkip: [],
  };
  const recorder = record(that, recorderEnvSetup);
  const identityHttpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    {
      authorityHost: env.AZURE_AUTHORITY_HOST,
      httpClient: identityHttpClient,
    }
  );

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new SecretClient(keyVaultUrl, credential, { serviceVersion });
  const testClient = new TestClient(client);

  return { recorder, client, testClient, secretSuffix, credential };
}
