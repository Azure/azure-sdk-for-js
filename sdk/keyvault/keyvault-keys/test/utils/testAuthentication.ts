// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, isLiveMode, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";

export async function authenticate(that: Context, version: string): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name",
      KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  // We mostly test against Azure KeyVault; however, we want to test
  // Azure Managed HSM as well, and we want to run all the KV Keys against it.
  // So by checking if the right environment variable exists (it will only exist in one configuration in live mode)
  // we can run live tests against a single Managed HSM and the rest against KeyVault.
  let keyVaultUrl;
  if (isLiveMode()) {
    keyVaultUrl = env.AZURE_MANAGEDHSM_URI || env.KEYVAULT_URI;
  } else {
    keyVaultUrl = env.KEYVAULT_URI;
  }

  if (!keyVaultUrl) {
    throw new Error(
      "Missing either the KEYVAULT_URI or AZURE_MANAGEDHSM_URI environment variable."
    );
  }

  const hsmEnabled = !!env.AZURE_MANAGEDHSM_URI;

  const client = new KeyClient(keyVaultUrl, credential, {
    serviceVersion: version
  });
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, keySuffix, hsmEnabled };
}
