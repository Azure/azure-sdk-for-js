// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyClient } from "../../../src";
import { Recorder, env, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
// import { toBase64url } from "./base64url";
import { createTestCredential } from "@azure-tools/test-credential";
// import { isNode } from "@azure/test-utils";

export const replaceableVariables = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  KEYVAULT_NAME: "keyvault_name",
  KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
  AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
  AZURE_KEYVAULT_ATTESTATION_URI: "https://skr_attestation.azure.net/",
};

export const envSetupForPlayback = {
  envSetupForPlayback: {
    ...replaceableVariables,
  },
};

export async function authenticate(version: string, recorder: Recorder): Promise<any> {
  const keySuffix = uniqueString();

  // let envAttestationUri = assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_URI");
  // let replaceAttestationUri = replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI;

  const KeyVaultUriName = assertEnvironmentVariable("KEYVAULT_URI").match("https://(.*.net)/")![1];
  const ReplacedKeyVaultUriName = replaceableVariables.KEYVAULT_URI.match("https://(.*.net)/")![1];

  await recorder.addSanitizers({
    generalSanitizers: [
      {
        target: keySuffix,
        value: "",
      },
      {
        target: btoa(env.AZURE_KEYVAULT_ATTESTATION_URI!),
        value: btoa(replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI),
      },
      {
        target: env.KEYVAULT_URI!,
        value: replaceableVariables.KEYVAULT_URI,
      },
      {
        target: env.AZURE_MANAGEDHSM_URI!,
        value: replaceableVariables.AZURE_MANAGEDHSM_URI,
      },
      {
        target: env.AZURE_KEYVAULT_ATTESTATION_URI!,
        value: replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI,
      },
      {
        target: KeyVaultUriName,
        value: ReplacedKeyVaultUriName,
      },
    ],
  });

  const credential = createTestCredential();

  const keyVaultUrl = assertEnvironmentVariable("KEYVAULT_URI");
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new KeyClient(
    keyVaultUrl,
    credential,
    recorder.configureClientOptions({
      serviceVersion: version,
    })
  );
  const testClient = new TestClient(client);

  let hsmClient: KeyClient | undefined = undefined;
  if (env.AZURE_MANAGEDHSM_URI) {
    hsmClient = new KeyClient(
      env.AZURE_MANAGEDHSM_URI,
      credential,
      recorder.configureClientOptions({})
    );
  }

  return { client, credential, testClient, hsmClient, keySuffix };
}
