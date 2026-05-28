// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete project capabilityHost.
 *
 * @summary delete project capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/ProjectCapabilityHost/delete.json
 */
async function deleteProjectCapabilityHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.projectCapabilityHosts.delete(
    "test-rg",
    "account-1",
    "project-1",
    "capabilityHostName",
  );
}

async function main(): Promise<void> {
  await deleteProjectCapabilityHost();
}

main().catch(console.error);
