// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import { QuantumJobClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import TestClient from "./testClient";
import { replaceStorageAccountInfo } from "./recorderUtils";

export async function authenticate(that: any): Promise<any> {
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      SUBSCRIPTION_ID: "677fc922-91d0-4bf6-0000-4274d319a0fa",
      RESOURCE_GROUP: "resourcegroup",
      WORKSPACE_NAME: "workspace",
      AZURE_CLIENT_ID: "ce7bd34e-0000-0000-0000-000000000000",
      AZURE_CLIENT_SECRET: "clientsecret",
      AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888" //dummy
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      replaceStorageAccountInfo
    ],
    queryParametersToSkip: ["sr", "sig", "sp"]
  };
  const recorder = record(that, recorderEnvSetup);
  const credential = new DefaultAzureCredential();

  const client = new QuantumJobClient(
    credential,
    env.SUBSCRIPTION_ID,
    env.RESOURCE_GROUP,
    env.WORKSPACE_NAME,
    {
      endpoint: "https://westus.quantum.azure.com",
      credentialScopes: "https://quantum.microsoft.com/.default"
    }
  );
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient };
}
