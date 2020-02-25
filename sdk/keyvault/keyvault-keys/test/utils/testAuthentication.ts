import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "../../../keyvault-common/src";
import TestClient from "./testClient";

export async function authenticate(that: any): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      KEYVAULT_NAME: "keyvault_name"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any =>
        keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
    ],
    queryParametersToSkip: []
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = await new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const keyVaultName = env.KEYVAULT_NAME;
  if (!keyVaultName) {
    throw new Error(`KEYVAULT_NAME environment variable not specified.`);
  }

  const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, keySuffix };
}
