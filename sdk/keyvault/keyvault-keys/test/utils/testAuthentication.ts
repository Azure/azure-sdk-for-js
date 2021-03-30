// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";

// Adding this to the source would change the public API.
type ApiVersions = "7.0" | "7.1" | "7.2";

export async function authenticate(that: Context, version?: string): Promise<any> {
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

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new KeyClient(keyVaultUrl, credential, {
    serviceVersion: version as ApiVersions
  });
  const testClient = new TestClient(client);

  let hsmClient: KeyClient | undefined = undefined;
  if (env.AZURE_MANAGEDHSM_URI) {
    hsmClient = new KeyClient(env.AZURE_MANAGEDHSM_URI, credential);
  }

  return { recorder, client, credential, testClient, hsmClient, keySuffix };
}
