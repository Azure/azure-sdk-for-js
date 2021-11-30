// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { DigitalTwinsClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";

export async function authenticate(that: Mocha.Context): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      AZURE_DIGITALTWINS_URL: "https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net"
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
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );
  const AZURE_DIGITALTWINS_URL = env.AZURE_DIGITALTWINS_URL;
  const client = new DigitalTwinsClient(AZURE_DIGITALTWINS_URL, credential);
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, keySuffix };
}
