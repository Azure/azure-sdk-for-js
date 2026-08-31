// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AIManager
 *
 * @summary update a AIManager
 * x-ms-original-file: 2026-05-02-preview/AIManagers_Update.json
 */
async function updatesAnAIManagerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.update("rg1", "aimanager1", {
    tags: { key1: "value1", key2: "value2" },
    identity: { type: "SystemAssigned" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAnAIManagerResource();
}

main().catch(console.error);
