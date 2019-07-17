import { EnvironmentCredential } from "@azure/identity"
import { getKeyvaultName } from "./utils.common";
import { KeysClient } from "../../src";
import {
  record,
  setReplaceableVariables,
  setReplacements,
  uniqueString
} from "./recorder";
import TestClient from "./testClient";

export async function authenticate(that: any): Promise<any> {
  // NOTE:
  // setReplaceableVariables and setReplacements are reused just to put their ussage in the open,
  // to avoid having them obscured into a generic utility file. Once the recording tool is centralized
  // we can move these somewhere else!
  setReplaceableVariables({
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azure_tenant_id",
    KEYVAULT_NAME: "keyvault_name"
  });

  const keySuffix = uniqueString();
  setReplacements([
    (recording: any): any =>
      recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
    (recording: any): any =>
      keySuffix === "" ? recording : recording.replace(new RegExp(keySuffix, "g"), "")
  ]);

  const recorder = record(that);
  const credential = await new EnvironmentCredential();

  const keyVaultName = getKeyvaultName();
  const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
  const client = new KeysClient(keyVaultUrl, credential);
  const testClient = new TestClient(client);

  return { recorder, client, testClient, keySuffix };
}
