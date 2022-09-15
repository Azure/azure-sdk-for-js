// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyClient } from "../../../src";
import { Recorder, env, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { createTestCredential } from "@azure-tools/test-credential";
import { isNode } from "@azure/core-util";

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

  const keyVaultUriName = assertEnvironmentVariable("KEYVAULT_URI").match("https://(.*.net)/")![1];
  const replacedKeyVaultUriName = replaceableVariables.KEYVAULT_URI.match("https://(.*.net)/")![1];

  let attestationUri: string;
  let replacedAttestationUri: string;

  if (isNode) {
    attestationUri = Buffer.from(
      assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_URI"),
      "base64"
    ).toString();
    replacedAttestationUri = Buffer.from(
      replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI,
      "base64"
    ).toString();
  } else {
    attestationUri = btoa(assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_URI"));
    replacedAttestationUri = btoa(replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI);
  }

  await recorder.addSanitizers({
    generalSanitizers: [
      {
        target: keySuffix,
        value: "",
      },
      {
        target: attestationUri,
        value: replacedAttestationUri,
      },
      {
        target: keyVaultUriName,
        value: replacedKeyVaultUriName,
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
