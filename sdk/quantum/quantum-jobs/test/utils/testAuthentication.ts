// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QuantumJobClient } from "../../src";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { getSanitizers } from "./recorderUtils";
import { Test } from "mocha";

export async function authenticate(testContext: Test | undefined): Promise<any> {
  const recorder = new Recorder(testContext);
  await recorder.start({
    envSetupForPlayback: {
      SUBSCRIPTION_ID: "00000000-0000-0000-0000-000000000000",
      AZURE_RESOURCE_GROUP: "myresourcegroup",
      AZURE_QUANTUM_WORKSPACE_NAME: "myworkspace",
      AZURE_CLIENT_ID: "00000000-0000-0000-0000-000000000000",
      AZURE_CLIENT_SECRET: "clientsecret",
      AZURE_TENANT_ID: "00000000-0000-0000-0000-000000000000",
      AZURE_QUANTUM_WORKSPACE_LOCATION: "eastus",
    },
    removeCentralSanitizers: [
      "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
      "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    ],
  });
  await recorder.addSanitizers(getSanitizers());

  const credential = createTestCredential();

  const client = new QuantumJobClient(
    credential,
    assertEnvironmentVariable("SUBSCRIPTION_ID"),
    assertEnvironmentVariable("AZURE_RESOURCE_GROUP"),
    assertEnvironmentVariable("AZURE_QUANTUM_WORKSPACE_NAME"),
    recorder.configureClientOptions({
      endpoint: `https://${assertEnvironmentVariable("AZURE_QUANTUM_WORKSPACE_LOCATION")}.quantum.azure.com`,
      credentialScopes: "https://quantum.microsoft.com/.default",
    })
  );

  return { recorder, client, credential };
}
