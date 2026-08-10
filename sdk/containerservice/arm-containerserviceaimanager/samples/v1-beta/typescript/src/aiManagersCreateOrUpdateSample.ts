// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AIManager
 *
 * @summary create a AIManager
 * x-ms-original-file: 2026-05-02-preview/AIManagers_CreateOrUpdate.json
 */
async function createsOrUpdatesAnAIManagerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.createOrUpdate("rg1", "aimanager1", {
    location: "eastus",
    tags: { key1: "value1" },
    identity: { type: "SystemAssigned" },
    properties: { deletePolicy: "Keep" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAnAIManagerResource();
}

main().catch(console.error);
