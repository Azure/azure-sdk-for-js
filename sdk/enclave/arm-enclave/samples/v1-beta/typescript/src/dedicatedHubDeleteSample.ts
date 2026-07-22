// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DedicatedHubResource
 *
 * @summary delete a DedicatedHubResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_Delete.json
 */
async function dedicatedHubDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  await client.dedicatedHub.delete("TestResourceGroup", "TestCommunity", "TestDedicatedHub");
}

async function main(): Promise<void> {
  await dedicatedHubDelete();
}

main().catch(console.error);
