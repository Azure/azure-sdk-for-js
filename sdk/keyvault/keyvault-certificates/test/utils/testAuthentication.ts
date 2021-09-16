// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { CertificateClient } from "../../src";
import { uniqueString } from "./recorderUtils";
import { env, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import TestClient from "./testClient";
import { Context } from "mocha";

export async function authenticate(that: Context): Promise<any> {
  const suffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      KEYVAULT_NAME: "keyvault_name",
      KEYVAULT_URI: "https://keyvault_name.vault.azure.net/"
    },
    customizationsOnRecordings: [
      (recording: string): string =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: string): string =>
        suffix === "" ? recording : recording.replace(new RegExp(suffix, "g"), ""),
      (recording: string): string => {
        // replace pkcs12 certificate value with base64 encoding of "base64_placeholder"
        return recording.replace(/"value":"MII[^"]+"/g, `"value":"YmFzZTY0X3BsYWNlaG9sZGVy"`);
      }
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = await new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new CertificateClient(keyVaultUrl, credential);
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, suffix, keyVaultUrl };
}
