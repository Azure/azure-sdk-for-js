// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCliCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";
import { isPlaybackMode, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { v4 as uuidv4 } from "uuid";

import { KeyVaultAccessControlClient, KeyVaultBackupClient } from "../../src";
import { getKeyvaultName, getKeyVaultUrl } from "./common";
import { uniqueString } from "./recorder";

export async function authenticate(that: any): Promise<any> {
  function generateFakeUUID(): string {
    return isPlaybackMode() ? "b36b00af-89c6-435f-a43d-9a3087015c27" : uuidv4();
  }

  const secretSuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "01ea9a65-813e-4238-8204-bf7328d63fc6",
      KEYVAULT_NAME: "keyvault_name"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        secretSuffix === "" ? recording : recording.replace(new RegExp(secretSuffix, "g"), ""),
      (recording: any): any =>
        recording.replace(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi,
          "b36b00af-89c6-435f-a43d-9a3087015c27"
        ) // Fake UUID
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = await new AzureCliCredential();

  const keyVaultName = getKeyvaultName();
  const keyVaultUrl = getKeyVaultUrl() || `https://${keyVaultName}.vault.azure.net`;
  const accessControlClient = new KeyVaultAccessControlClient(keyVaultUrl, credential);
  const backupClient = new KeyVaultBackupClient(keyVaultUrl, credential);
  const keyClient = new KeyClient(keyVaultUrl, credential);

  return { recorder, accessControlClient, backupClient, keyClient, secretSuffix, generateFakeUUID };
}
