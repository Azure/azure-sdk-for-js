// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { env, isPlaybackMode, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { v4 as uuidv4 } from "uuid";

import { KeyVaultAccessControlClient, KeyVaultBackupClient } from "../../src";
import { uniqueString } from "./recorder";

export async function authenticate(that: any): Promise<any> {
  const generatedUUIDs: string[] = [];
  function generateFakeUUID(): string {
    if (isPlaybackMode()) {
      return "b36b00af-89c6-435f-a43d-9a3087015c27";
    }
    const uuid = uuidv4();
    generatedUUIDs.push(uuid);
    return uuid;
  }

  const suffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_MANAGEDHSM_URL: "https://azure_managedhsm.managedhsm.azure.net",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_URI: "https://uri.keyvault.azure.net",
      BLOB_CONTAINER_NAME: "uri",
      BLOB_STORAGE_ACCOUNT_NAME: "blob_storage_account_name",
      BLOB_STORAGE_SAS_TOKEN: "blob_storage_sas_token",
      BLOB_STORAGE_URI: "https://uri.blob.core.windows.net/backup",
      CLIENT_OBJECT_ID: "01ea9a65-813e-4238-8204-bf7328d63fc6"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        suffix === "" ? recording : recording.replace(new RegExp(suffix, "g"), ""),
      (recording: any): any =>
        recording.replace(
          /keyvault_name\.[a-z-]+\.azure[a-z-]*\.net/g,
          `keyvault_name.managedhsm.azure.net`
        ),
      (recording: any): any => {
        for (const uuid of generatedUUIDs) {
          recording = recording.replace(
            new RegExp(uuid, "g"),
            "b36b00af-89c6-435f-a43d-9a3087015c27"
          );
        }
        return recording;
      }
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const keyVaultHsmUrl = env.AZURE_MANAGEDHSM_URL;
  if (!keyVaultHsmUrl) {
    throw new Error("Missing AZURE_MANAGEDHSM_URL environment variable.");
  }

  const accessControlClient = new KeyVaultAccessControlClient(keyVaultHsmUrl, credential);
  const backupClient = new KeyVaultBackupClient(keyVaultHsmUrl, credential);

  return { recorder, accessControlClient, backupClient, suffix, generateFakeUUID };
}
