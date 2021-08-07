// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";
import { Context } from "mocha";

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
      (
        recording: any
      ): any => // Replace all JWT with a generic string to avoid recorder mismatches
        recording.replace(
          /"data":"(eyJ[^"]+)"/g,
          // releasePolicy is a base64url encoded string that contains the attestation URI, therefore we need to
          // ensure we replace it with a string that will match what will be generated in playback mode.
          // So, the releasePolicy has to be built up in test as well.
          (_match: string, token: string) => {
            // token is base64url encoded string...
            console.log(token);
            const decoded = JSON.parse(atob(token));
            // The authority must match the replacement variable to serialize correctly.
            decoded.anyOf[0].authority = replaceableVariables.AZURE_KEYVAULT_ATTESTATION_URI;
            // We can encoded the token back to base64url
            const encoded = btoa(JSON.stringify(decoded))
              .replace(/\+/g, "-")
              .replace(/\//, "_")
              .split("=")[0];
            return `"data":"${encoded}"`;
          }
        )
      // .replace(/"token":"eyJ[^"]+"/g, '"token":"attestation_token"')
      // .replace(/"target":"eyJ[^"]+"/g, '"target":"attestation_token"')
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
