// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { QuantumJobClient } from "../../src";
import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { uniqueString } from "./recorderUtils";
import TestClient from "./testClient";

export async function authenticate(that: any): Promise<any> {
  const keySuffix = uniqueString();
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azure_tenant_id",
      SUBSCRIPTION_ID: "subscription_id",
      RESOURCE_GROUP: "resource-group",
      WORKSPACE_NAME: "workspace-name",
      LOCATION: "location",
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

  const client = new QuantumJobClient(
      env.SUBSCRIPTION_ID,
      env.RESOURCE_GROUP,
      env.WORKSPACE_NAME,
      env.LOCATION,
      credential);
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, keySuffix };
}
