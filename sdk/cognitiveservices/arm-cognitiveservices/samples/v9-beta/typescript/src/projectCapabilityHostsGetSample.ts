// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get project capabilityHost.
 *
 * @summary get project capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/ProjectCapabilityHost/get.json
 */
async function getProjectCapabilityHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectCapabilityHosts.get(
    "test-rg",
    "account-1",
    "project-1",
    "capabilityHostName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProjectCapabilityHost();
}

main().catch(console.error);
