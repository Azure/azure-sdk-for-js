// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QuantumJobClient } from "../../src";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { uriSanitizers } from "./recorderUtils";
import { Test } from "mocha";

export async function authenticate(testContext: Test | undefined): Promise<any> {
  const recorder = new Recorder(testContext);
  await recorder.start({
    envSetupForPlayback: {
      SUBSCRIPTION_ID: "677fc922-91d0-4bf6-0000-4274d319a0fa",
      RESOURCE_GROUP: "resourcegroup",
      WORKSPACE_NAME: "workspace",
      AZURE_CLIENT_ID: "ce7bd34e-0000-0000-0000-000000000000",
      AZURE_CLIENT_SECRET: "clientsecret",
      AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888", //dummy
    },
    sanitizerOptions: {
      uriSanitizers,
    },
  });
  const credential = createTestCredential();

  const client = new QuantumJobClient(
    credential,
    assertEnvironmentVariable("SUBSCRIPTION_ID"),
    assertEnvironmentVariable("RESOURCE_GROUP"),
    assertEnvironmentVariable("WORKSPACE_NAME"),
    recorder.configureClientOptions({
      endpoint: "https://westus.quantum.azure.com",
      credentialScopes: "https://quantum.microsoft.com/.default",
    })
  );

  return { recorder, client, credential };
}
