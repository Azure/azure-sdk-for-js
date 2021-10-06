// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";
import { fromBase64url, toBase64url } from "./base64url";

const replaceableVariables = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  KEYVAULT_NAME: "keyvault_name",
  KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
  AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
  AZURE_KEYVAULT_ATTESTATION_URI: "https://skr_attestation.azure.net/"
};

export async function authenticate(that: Context, version: string): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables,
    customizationsOnRecordings: [
      (recording: any): any =>
        keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), ""),
      (recording: string): string =>
        recording.replace(
          // Unpack the base64url encoded release policy and replace any instances of the AZURE_KEYVAULT_ATTESTATION_URI env variable.
          /"data":"(eyJ[^"]+)"/g,
          (_match: string, token: string) => {
            let decoded = fromBase64url(token);

            decoded = decoded.replace(
              env.AZURE_KEYVAULT_ATTESTATION_URI,
              replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI
            );

            return `"data":"${toBase64url(decoded)}"`;
          }
        )
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new KeyClient(keyVaultUrl, credential, {
    serviceVersion: version
  });
  const testClient = new TestClient(client);

  let hsmClient: KeyClient | undefined = undefined;
  if (env.AZURE_MANAGEDHSM_URI) {
    hsmClient = new KeyClient(env.AZURE_MANAGEDHSM_URI, credential);
  }

  return { recorder, client, credential, testClient, hsmClient, keySuffix };
}
