// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyClient } from "../../../src";
import { Recorder, env, assertEnvironmentVariable, isLiveMode } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { createTestCredential } from "@azure-tools/test-credential";

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

  await recorder.addSanitizers({
    generalSanitizers: [
      {
        target: keySuffix,
        value: "",
      },
      {
        target: keyVaultUriName,
        value: replacedKeyVaultUriName,
      },
    ],
    bodyKeySanitizers: [
      {
        jsonPath: "$.release_policy.data",
        value: "eyAic2FuaXRpemVkIjogInNhbml0aXplZCIgfQ==", // dummy base64-encoded JSON object
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
      disableChallengeResourceVerification: !isLiveMode(),
    }),
  );
  const testClient = new TestClient(client);

  let hsmClient: KeyClient | undefined = undefined;
  if (env.AZURE_MANAGEDHSM_URI) {
    hsmClient = new KeyClient(
      env.AZURE_MANAGEDHSM_URI,
      credential,
      recorder.configureClientOptions({
        disableChallengeResourceVerification: !isLiveMode(),
      }),
    );
  }

  return { client, credential, testClient, hsmClient, keySuffix };
}
