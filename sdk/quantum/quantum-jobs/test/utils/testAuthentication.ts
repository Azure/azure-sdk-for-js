// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import { QuantumJobClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import TestClient from "./testClient";

export async function authenticate(that: any): Promise<any> {
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      SUBSCRIPTION_ID: "subscription_id",
      RESOURCE_GROUP: "resource_group",
      WORKSPACE_NAME: "workspace_name",
      AZURE_CLIENT_ID: "client_id",
      AZURE_CLIENT_SECRET: "client_secre",
      AZURE_TENANT_ID: "tenant_id",
      LOCATION: "location"
    },
    customizationsOnRecordings: [
      (recording: any): any =>
        recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`),
      (recording: any): any => recording.replace(/client_id=[^&]*&/g, `client_id=client_id&`),
      (recording: any): any =>
        recording.replace(/client_secret=[^&]*&/g, `client_secret=client_secret&`),
      (recording: any): any => recording.replace(/sig=[^&]*&/g, `sig=sig&`)
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
