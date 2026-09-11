// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a NGroups resource.
 *
 * @summary create or update a NGroups resource.
 * x-ms-original-file: 2026-07-01/NGroupsCreateOrUpdate.json
 */
async function nGroupsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.nGroups.createOrUpdate("demo", "demo-ngroup", {
    updateProfile: { updateMode: "Manual" },
    containerGroupProfiles: [],
    elasticProfile: { maintainDesiredCount: true, desiredCount: 1 },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nGroupsCreateOrUpdate();
}

main().catch(console.error);
